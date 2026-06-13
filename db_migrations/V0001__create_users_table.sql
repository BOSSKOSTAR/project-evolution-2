CREATE TABLE t_p54687837_project_evolution_2.users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  ref_code VARCHAR(50),
  referred_by VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);