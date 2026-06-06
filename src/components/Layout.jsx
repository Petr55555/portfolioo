const nav = [
  { id: 'home', label: 'Domů', caption: 'Úvod' },
  { id: 'projects', label: 'Projekty', caption: 'Ukázky' },
  { id: 'contact', label: 'Kontakt', caption: 'Spolupráce' },
]

export default function Layout({ children, page, setPage }) {
  function confirmCall(event) {
    const wantsToCall = window.confirm('Opravdu chcete zavolat na číslo +420 792 317 662?')

    if (!wantsToCall) {
      event.preventDefault()
    }
  }

  return (
    <>
      <div className="background-motion" aria-hidden="true">
        <div className="squares">
          {Array.from({ length: 10 }, (_, index) => (
            <span className="square" key={index}></span>
          ))}
        </div>
      </div>
      <header className="topbar">
        <button className="brand" onClick={() => setPage('home')}>
          <span>PS</span>
          Petr Štís
        </button>
        <nav aria-label="Hlavní navigace">
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  className={page === item.id ? 'active' : ''}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault()
                    setPage(item.id)
                  }}
                >
                  <span>{item.label}</span>
                  <small>{item.caption}</small>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="nav-mail" href="mailto:stis.petr11@gmail.com">
          Napsat
        </a>
      </header>
      <main>{children}</main>
      <footer>
        <p>© {new Date().getFullYear()} Petr Štís. Všechna práva vyhrazena.</p>
        <div>
          <a href="mailto:stis.petr11@gmail.com">stis.petr11@gmail.com</a>
          <a href="tel:+420792317662" onClick={confirmCall}>+420 792 317 662</a>
        </div>
      </footer>
    </>
  )
}
