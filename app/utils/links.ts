export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`

export const whatsappHref = (number: string | undefined, message: string) =>
  number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : ''
