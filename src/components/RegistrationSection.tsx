import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegistrationSection() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [refCode, setRefCode] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="px-4 md:px-8 py-20 flex items-center justify-center">
      <div className="w-full max-w-md bg-[#141414] border border-[#262626] rounded-2xl p-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="16 7 22 7 22 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-white text-lg font-semibold">Эволюция</span>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-4">✅</div>
            <h3 className="text-white text-xl font-semibold mb-2">Аккаунт создан!</h3>
            <p className="text-gray-400 text-sm">Добро пожаловать в Эволюцию.</p>
          </div>
        ) : (
          <>
            <h2 className="text-white text-2xl font-bold mb-1">Регистрация</h2>
            <p className="text-gray-400 text-sm mb-8">Создайте аккаунт за минуту</p>

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

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base mt-1"
              >
                Создать аккаунт
              </Button>
            </form>

            <p className="text-gray-400 text-sm mt-6">
              Уже есть аккаунт?{" "}
              <a href="#" className="text-amber-500 hover:text-amber-400 font-medium">Войти</a>
            </p>
          </>
        )}
      </div>
    </section>
  )
}
