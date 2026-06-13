export function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f] bg-[#0a0a0a] px-4 md:px-8 pt-14 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="16 7 22 7 22 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-white font-semibold text-lg">Эволюция</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Прозрачные тарифы, личный кабинет и партнёрская программа — инвестируйте с умом и растите вместе с Эволюцией.
            </p>
            <p className="text-gray-600 text-xs leading-relaxed max-w-xs">
              Информация на сайте не является индивидуальной инвестиционной рекомендацией. Инвестиции связаны с риском. Ознакомьтесь с условиями перед принятием решения.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Разделы</h4>
            <nav className="flex flex-col gap-3">
              {["Тарифы", "Как это работает", "Партнёрам", "О проекте", "FAQ", "Контакты"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Контакты</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@эволюция.su" className="text-gray-300 text-sm hover:text-white transition-colors">
                info@эволюция.su
              </a>
              <a href="tel:+78005553535" className="text-gray-300 text-sm hover:text-white transition-colors">
                +7 (800) 555-35-35
              </a>
              <div className="flex items-center gap-3 mt-2">
                <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Вход</a>
                <a href="#" className="text-amber-500 text-sm hover:text-amber-400 transition-colors font-medium">Регистрация</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1f1f1f] pt-6 text-center">
          <p className="text-gray-500 text-sm">© 2026 Эволюция. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
