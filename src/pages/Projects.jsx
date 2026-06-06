import { useState } from 'react'
import eovImage from './assets/EOV.png';
// Obrázky nahraj do public/projects a použij cestu ve tvaru '/projects/nazev-obrazku.png'.
const projects = [
  {
    title: 'Interktivní aplikace pro hru',
    category: 'Webová Aplikace',
    desc: 'Propracovaný web s mnoha animacemi, a funkčním backendem i loginem. Sql pro ukládání dat.',
    tech: ['Flask', 'Html,CSS', 'Python', 'Sql'],
    year: '2026',
    label: 'Aplikace',
    image: eovImage,
  },
]

const filters = ['Vše', 'Weby', 'Aplikace']

export default function Projects({ setPage }) {
  const [filter, setFilter] = useState('Vše')
  const shown = filter === 'Vše' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <section className="page-head">
        <p className="eyebrow">Projekty</p>
        <h1>Momentální Projekty</h1>
        <p>Ukázky webů a aplikací navržené s důrazem na rychlost, přehlednost a čisté provedení, které jsou momentálně online.</p>
      </section>

      <div className="filters">
        {filters.map((item) => (
          <button
            className={filter === item ? 'active' : ''}
            key={item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="grid projects">
        {shown.map((project) => (
          <article className="card project" key={project.title}>
            <div className="project-top">
              <p className="eyebrow">{project.category}</p>
              <span>{project.year}</span>
            </div>
            <div className={project.image ? 'project-shot has-image' : 'project-shot'}>
              {project.image ? (
                <img src={project.image} alt={`Náhled projektu ${project.title}`} />
              ) : (
                <div className="image-placeholder">
                  <span></span>
                </div>
              )}
            </div>
            <p className="caption">{project.label}</p>
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <div className="tags">
              {project.tech.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="links">
              <a href="https://eov.pythonanywhere.com/" target="_blank">
                Živá ukázka
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="banner">
        <div>
          <p className="eyebrow">Nový projekt</p>
          <h2>Líbí se vám moje práce?</h2>
        </div>
        <button onClick={() => setPage('contact')}>Pojďme probrat váš projekt</button>
      </section>
    </>
  )
}
