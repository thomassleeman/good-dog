import {NextResponse} from 'next/server'
import {Resend} from 'resend'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LIMITS = {
  name: 200,
  email: 320,
  phone: 40,
  message: 5000,
} as const

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  if (!process.env.RESEND_KEY) {
    console.error('Missing RESEND_KEY env var')
    return NextResponse.json({error: 'Email service is not configured.'}, {status: 500})
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({error: 'Invalid request body.'}, {status: 400})
  }

  const body = payload as Record<string, unknown>
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || name.length > LIMITS.name) {
    return NextResponse.json({error: 'Please enter your name.'}, {status: 400})
  }
  if (!email || email.length > LIMITS.email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({error: 'Please enter a valid email address.'}, {status: 400})
  }
  if (phone.length > LIMITS.phone) {
    return NextResponse.json({error: 'Phone number is too long.'}, {status: 400})
  }
  if (!message || message.length > LIMITS.message) {
    return NextResponse.json({error: 'Please enter a message.'}, {status: 400})
  }

  const resend = new Resend(process.env.RESEND_KEY)

  const textBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    '',
    'Message:',
    message,
  ]
    .filter((line) => line !== null)
    .join('\n')

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #1c1917;">
      <h2 style="margin: 0 0 16px;">New contact form submission</h2>
      <p style="margin: 4px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 4px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p style="margin: 4px 0;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
      <p style="margin: 16px 0 4px;"><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
    </div>
  `

  const {data, error} = await resend.emails.send({
    from: 'Good Dog Surrey <messages@gooddogsurrey.co.uk>',
    to: 'louise@gooddogsurrey.co.uk',
    replyTo: email,
    subject: `New contact form submission from ${name}`,
    text: textBody,
    html: htmlBody,
  })

  if (error) {
    console.error('Resend error', error)
    return NextResponse.json({error: 'Failed to send message. Please try again.'}, {status: 500})
  }

  return NextResponse.json({ok: true, id: data?.id ?? null})
}
