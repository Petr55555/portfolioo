import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const stacks = {
  Frontend: ['React', 'Next.js', 'JavaScript', 'Tailwind', 'Css', 'HTML', 'Bootstrap'],
  Backend: ['Node.js', 'Express', 'REST APIs', 'Python', 'Flask', 'Sql'],
}

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'stis.petr11@gmail.com'
const minSubmitDelay = 3500
const maxAttempts = 3
const rateLimitWindow = 60 * 60 * 1000

function getAttempts() {
  try {
    return JSON.parse(localStorage.getItem('contact-form-attempts') || '[]')
  } catch {
    return []
  }
}

function saveAttempt() {
  const now = Date.now()
  const attempts = getAttempts().filter((time) => now - time < rateLimitWindow)

  localStorage.setItem('contact-form-attempts', JSON.stringify([...attempts, now]))
}

function isRateLimited() {
  const now = Date.now()

  return getAttempts().filter((time) => now - time < rateLimitWindow).length >= maxAttempts
}

function looksSuspicious(message) {
  const links = message.match(/https?:\/\/|www\.|\.ru|\.xyz|\.top|bit\.ly|t\.me/gi) || []
  const repeatedCharacters = /(.)\1{12,}/.test(message)
  const spamWords = /\b(crypto|casino|loan|seo|viagra|adult|forex)\b/i.test(message)

  return links.length > 2 || repeatedCharacters || spamWords
}

export default function Contact() {
  const formRef = useRef(null)
  const openedAt = useRef(0)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    openedAt.current = Date.now()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()
    const website = String(formData.get('website') || '').trim()
    const elapsed = Date.now() - openedAt.current

    if (website || elapsed < minSubmitDelay) {
      setStatus({ type: 'error', message: 'Zprávu se nepodařilo odeslat.' })
      return
    }

    if (isRateLimited()) {
      setStatus({ type: 'error', message: 'Zkuste to prosím později, formulář má dočasný limit.' })
      return
    }

    if (!name || !email || !message || message.length < 12 || looksSuspicious(message)) {
      setStatus({ type: 'error', message: 'Zkontrolujte prosím zprávu a zkuste ji poslat znovu.' })
      return
    }

    if (!serviceId || !templateId || !publicKey) {
      setStatus({ type: 'error', message: 'Odesílání emailů ještě není nastavené.' })
      return
    }

    setIsSending(true)
    setStatus({ type: 'idle', message: '' })

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name,
          from_email: email,
          message,
          to_email: contactEmail,
          reply_to: email,
        },
        publicKey,
      )

      saveAttempt()
      form.reset()
      openedAt.current = Date.now()
      setStatus({ type: 'success', message: 'Zpráva byla odeslána. Ozvu se co nejdřív.' })
    } catch {
      setStatus({ type: 'error', message: 'Odeslání selhalo. Zkuste to prosím znovu.' })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <section className="page-head">
        <p className="eyebrow">Kontakt</p>
        <h1>Pojďme vytvořit něco skvělého.</h1>
        <p>Máte nápad na projekt? Napište mi pár vět a společně vybereme nejlepší řešení.</p>
      </section>

      <section className="contact">
        <form ref={formRef} onSubmit={handleSubmit}>
          <label>
            Jméno
            <input name="name" placeholder="Vaše jméno" autoComplete="name" maxLength="80" required />
          </label>
          <label>
            Email
            <input name="email" type="email" placeholder="you@example.com" autoComplete="email" maxLength="120" required />
          </label>
          <label>
            Zpráva
            <textarea
              name="message"
              placeholder="Popište mi stručně váš projekt..."
              rows="5"
              minLength="12"
              maxLength="1200"
              required
            />
          </label>
          <label className="form-trap" aria-hidden="true">
            Web
            <input name="website" tabIndex="-1" autoComplete="off" />
          </label>
          <button type="submit" disabled={isSending}>{isSending ? 'Odesílám...' : 'Odeslat zprávu'}</button>
          {status.message && (
            <p className={`form-status ${status.type}`} role="status">
              {status.message}
            </p>
          )}
        </form>

        <aside>
          <p className="eyebrow">Stack</p>
          <h2>Technologie</h2>
          {Object.entries(stacks).map(([group, items]) => (
            <div className="stack" key={group}>
              <h3>{group}</h3>
              <div className="tags">
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </aside>
      </section>
    </>
  )
}
