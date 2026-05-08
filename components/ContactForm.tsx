'use client'

import {useState, type FormEvent} from 'react'
import {toast} from 'sonner'

const LIMITS = {
  name: 200,
  email: 320,
  phone: 40,
  message: 5000,
}

const inputClasses =
  'w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:border-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-600/20 transition-colors'

const labelClasses = 'block text-sm font-semibold text-stone-800 mb-2'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, phone, message}),
      })

      const data = (await response.json().catch(() => ({}))) as {error?: string}

      if (!response.ok) {
        toast.error(data.error || 'Something went wrong. Please try again.')
        return
      }

      toast.success("Message sent — we'll be in touch soon.")
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
    } catch {
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 md:py-24 px-4 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate={false}>
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={LIMITS.name}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={LIMITS.email}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className={labelClasses}>
            Phone <span className="font-normal text-stone-500">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            maxLength={LIMITS.phone}
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClasses}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClasses}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            maxLength={LIMITS.message}
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClasses} resize-y`}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center w-full sm:w-[200px] h-[45px] rounded-lg font-semibold text-base bg-stone-600 text-white hover:bg-stone-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending…' : 'Send message'}
          </button>
        </div>
      </form>
    </section>
  )
}
