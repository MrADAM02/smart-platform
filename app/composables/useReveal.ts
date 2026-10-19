/** Adds .is-visible to .reveal elements as they scroll into view */
export function useReveal() {
  onMounted(() => {
    const els = document.querySelectorAll('.reveal:not(.is-visible)')
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      }
    }, { threshold: 0.12 })
    els.forEach(el => io.observe(el))
    onBeforeUnmount(() => io.disconnect())
  })
}
