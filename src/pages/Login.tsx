import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import func2url from "../../backend/func2url.json"

const AUTH_URL = func2url.auth
type Mode = "login" | "register"

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [refCode, setRefCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: mode, email, password, ref_code: refCode }),
      })
      const raw = await res.json()
      const data = typeof raw === "string" ? JSON.parse(raw) : raw

      if (!res.ok || data.error) {
        setError(data.error || "Произошла ошибка")
      } else {
        localStorage.setItem("evolution_user", JSON.stringify(data))
        navigate("/cabinet")
      }
    } catch {
      setError("Ошибка сети. Попробуйте ещё раз.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#141414] border border-[#262626] rounded-2xl p-10 flex flex-col items-center">
        <button onClick={() => navigate("/")} className="flex items-center gap-3 mb-6 group">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="16 7 22 7 22 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-white text-lg font-semibold group-hover:text-amber-400 transition-colors">Эволюция</span>
        </button>

        <h2 className="text-white text-2xl font-bold mb-1">
          {mode === "login" ? "Вход" : "Регистрация"}
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          {mode === "login" ? "Войдите в личный кабинет" : "Создайте аккаунт за минуту"}
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-white text-sm font-medium">Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#1e1e2e] border-[#2e2e3e] text-white placeholder:text-gray-500 rounded-xl h-12"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-white text-sm font-medium">Пароль</Label>
            <Input
              type="password"
              placeholder="Минимум 6 символов"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-[#1e1e2e] border-[#2e2e3e] text-white placeholder:text-gray-500 rounded-xl h-12"
            />
          </div>

          {mode === "register" && (
            <div className="flex flex-col gap-2">
              <Label className="text-white text-sm font-medium">Реферальный код (необязательно)</Label>
              <Input
                type="text"
                placeholder="ABCD1234"
                value={refCode}
                onChange={(e) => setRefCode(e.target.value)}
                className="bg-[#1e1e2e] border-[#2e2e3e] text-white placeholder:text-gray-500 rounded-xl h-12"
              />
            </div>
          )}

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base mt-1"
          >
            {loading ? "Загрузка..." : mode === "login" ? "Войти" : "Создать аккаунт"}
          </Button>
        </form>

        <p className="text-gray-400 text-sm mt-6">
          {mode === "login" ? "Нет аккаунта? " : "Уже есть аккаунт? "}
          <button
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError("") }}
            className="text-amber-500 hover:text-amber-400 font-medium"
          >
            {mode === "login" ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>
      </div>
    </main>
  )
}
