const services = [
  ['01', 'Aplikace na míru', 'Vývoj webových aplikací', 'Komplexní řešení od rozhraní až po logiku na pozadí a nasazení na server.'],
  ['02', 'Prezentační weby', 'Moderní webové stránky', 'Rychlé responzivní weby zaměřené na důvěru, přehlednost a konverzi.'],
  ['03', 'Péče po spuštění', 'Dlouhodobá správa', 'Údržba, aktualizace obsahu a technická podpora po spuštění projektu. Dle dohody.'],
]

const steps = [
  ['01', 'Domluva', 'Domluvíme se na ceně, termínu a představy o projektu.'],
  ['02', 'Návrh a realizace', 'Vytvořím první koncept, který spolu projedeme a postupně vyladíme k naprosté dokonalosti.'],
  ['03', 'Předání a revize', 'Po dokončení a vaší spokojenosti doladíme poslední detaily a připravíme vše ke spuštění.'],
  ['04', 'Závěr', 'Po provedení platby vám pošlu source code projektu a zároveň pokud ještě nemáte doménu tak se vše zařídí.'],
]

export default function Home({ setPage }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio — {new Date().getFullYear()}</p>
          <h1>Petr Štís</h1>
          <h2>Webový vývojář & student</h2>
          <p>
            Vytvářím a stavím čisté weby i aplikace, které působí profesionálně,
            rychle se načítají a dobře fungují na mobilu i desktopu.
          </p>
          <div className="actions">
            <button onClick={() => setPage('projects')}>Moje práce</button>
            <button className="ghost" onClick={() => setPage('contact')}>
              Napište mi
            </button>
          </div>
          <div className="stats">
            <span><b>React</b> Frontend</span>
            <span><b>Node / Flask</b> Backend</span>
            <span><b>Deploy</b> Server</span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="window">
            <div className="window-top"><span></span><span></span><span></span></div>
            <div className="preview-title">
              <small>Náhled projektu</small>
              <strong>Moderní webové řešení</strong>
            </div>
            <div className="visual-labels">
              <span>Responzivní layout</span>
              <span>Čistý kód</span>
              <span>Rychlé načítání</span>
            </div>
            <div className="preview-grid">
              <span></span><span></span><span></span><span></span>
            </div>
            <div className="code-card">
              <span>const project = &#123;</span>
              <span>  design: 'clean',</span>
              <span>  speed: 'fast',</span>
              <span>&#125;</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <p className="eyebrow">Služby</p>
          <h2>Služby</h2>
          <p>Od prvního návrhu po nasazení a další péči.</p>
        </div>
        <div className="services-grid">
          {services.map(([num, label, title, text]) => (
            <article className="card" key={title}>
              <span className="card-num">{num}</span>
              <p className="caption">{label}</p>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <p className="eyebrow">Proces</p>
          <h2>Plán Práce</h2>
          <p>Jasný postup, průběžná komunikace a prostor pro doladění detailů.</p>
        </div>
        <div className="timeline">
          {steps.map(([num, title, text]) => (
            <article key={num}>
              <span>{num}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
