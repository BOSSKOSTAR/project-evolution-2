import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

interface User {
  email: string
  token: string
  user_id: number
  ref_code: string
}

export default function Cabinet() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("evolution_user")
    if (!saved) {
      navigate("/login")
      return
    }
    setUser(JSON.parse(saved))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("evolution_user")
    navigate("/login")
  }

  if (!user) return null

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="16 7 22 7 22 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-white font-semibold group-hover:text-amber-400 transition-colors">Эволюция</span>
          </button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="rounded-full border-[#2e2e3e] text-gray-400 hover:text-white bg-transparent text-sm"
          >
            Выйти
          </Button>
        </div>

        <div className="bg-[#141414] border border-[#262626] rounded-2xl p-8 mb-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">Личный кабинет</h1>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#1e1e2e] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">ID аккаунта</p>
              <p className="text-white font-semibold text-lg">#{user.user_id}</p>
            </div>
            <div className="bg-[#1e1e2e] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Реферальный код</p>
              <p className="text-amber-500 font-bold text-lg tracking-widest">{user.ref_code}</p>
            </div>
            <div className="bg-[#1e1e2e] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Статус</p>
              <span className="inline-block bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">Активен</span>
            </div>
            <div className="bg-[#1e1e2e] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Баланс</p>
              <p className="text-white font-semibold text-lg">0 ₽</p>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#262626] rounded-2xl p-8">
          <h2 className="text-white font-semibold mb-4">Мои инвестиции</h2>
          <div className="text-center py-10 text-gray-500 text-sm">
            У вас пока нет активных инвестиций.<br />
            <button
              onClick={() => navigate("/")}
              className="text-amber-500 hover:text-amber-400 mt-2 inline-block"
            >
              Выбрать тариф →
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
