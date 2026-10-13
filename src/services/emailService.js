import emailjs from '@emailjs/browser'

const config = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateIdForMe: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_FOR_ME,
  templateIdForSender: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_FOR_SENDER,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

export function isEmailConfigured() {
  return Object.values(config).every(Boolean)
}

export async function sendPortfolioEmail({ name, email, message }) {
  if (!isEmailConfigured()) throw new Error('EmailJS não configurado')
  const params = { name, email, message, time: new Date().toLocaleString() }
  const options = { publicKey: config.publicKey, blockHeadless: true }
  await emailjs.send(config.serviceId, config.templateIdForSender, { ...params, title: 'Recebemos sua mensagem!' }, options)
  return emailjs.send(config.serviceId, config.templateIdForMe, { ...params, title: `Nova mensagem do site de: ${name}` }, options)
}
