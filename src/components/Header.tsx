import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function Header() {
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem("evolution_user")

  return (
    <header className="flex items-center justify-between px-8 py-4">
      <button onClick={() => navigate("/")} className="flex items-center gap-2">
        <ФинПотокLogo />
        <span className="text-lg font-semibold text-white">
          Эволюция<sup className="text-xs">™</sup>
        </span>
      </button>

      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Стратегии
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1">
          Инструменты <ChevronDown className="h-4 w-4" />
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Аналитика
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Тарифы
        </a>
        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
          Контакты
        </a>
      </nav>

      <Button
        variant="outline"
        className="rounded-full border-violet-500 text-violet-400 hover:bg-violet-500/10 hover:text-violet-300 bg-transparent"
        onClick={() => navigate(isLoggedIn ? "/cabinet" : "/login")}
      >
        Личный кабинет
      </Button>
    </header>
  )
}

function ФинПотокLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3" fill="#8B5CF6" />
      <circle cx="16" cy="8" r="3" fill="#8B5CF6" opacity="0.6" />
      <circle cx="8" cy="16" r="3" fill="#8B5CF6" opacity="0.6" />
      <circle cx="16" cy="16" r="3" fill="#8B5CF6" opacity="0.4" />
    </svg>
  )
}