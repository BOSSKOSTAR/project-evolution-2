"""Авторизация пользователей: регистрация и вход"""
import json
import os
import hashlib
import secrets

SCHEMA = "t_p54687837_project_evolution_2"

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token",
}

def get_conn():
    import psycopg2
    return psycopg2.connect(os.environ["DATABASE_URL"])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token() -> str:
    return secrets.token_hex(32)

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    action = body.get("action")

    conn = get_conn()
    cur = conn.cursor()

    if action == "register":
        email = body.get("email", "").strip().lower()
        password = body.get("password", "")
        referred_by = body.get("ref_code", "").strip() or None

        if not email or not password:
            return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "Email и пароль обязательны"})}

        if len(password) < 6:
            return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "Пароль минимум 6 символов"})}

        ref_code = secrets.token_hex(4).upper()
        password_hash = hash_password(password)

        try:
            cur.execute(
                f"INSERT INTO {SCHEMA}.users (email, password_hash, ref_code, referred_by) VALUES (%s, %s, %s, %s) RETURNING id",
                (email, password_hash, ref_code, referred_by)
            )
            user_id = cur.fetchone()[0]
            conn.commit()
        except Exception as e:
            conn.rollback()
            if "unique" in str(e).lower():
                return {"statusCode": 409, "headers": CORS_HEADERS, "body": json.dumps({"error": "Email уже зарегистрирован"})}
            raise

        token = generate_token()
        cur.close()
        conn.close()

        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps({"success": True, "token": token, "user_id": user_id, "email": email, "ref_code": ref_code})
        }

    elif action == "login":
        email = body.get("email", "").strip().lower()
        password = body.get("password", "")

        if not email or not password:
            return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "Email и пароль обязательны"})}

        password_hash = hash_password(password)
        cur.execute(
            f"SELECT id, email, ref_code FROM {SCHEMA}.users WHERE email = %s AND password_hash = %s",
            (email, password_hash)
        )
        row = cur.fetchone()
        cur.close()
        conn.close()

        if not row:
            return {"statusCode": 401, "headers": CORS_HEADERS, "body": json.dumps({"error": "Неверный email или пароль"})}

        token = generate_token()
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps({"success": True, "token": token, "user_id": row[0], "email": row[1], "ref_code": row[2]})
        }

    return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "Неизвестное действие"})}
