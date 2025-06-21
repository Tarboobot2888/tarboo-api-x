import { ref } from 'vue'
import { gsap } from 'gsap'
export function useHoverAnimation(options = {}) {
  const card = ref(null)
  const onMouseMove = (e) => {
    if (!card.value) return
    const rect = card.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y / rect.height) - 0.5) * (options.rotation?.x || 3)
    const rotateY = ((x / rect.width) - 0.5) * (options.rotation?.y || -3)
    gsap.to(card.value, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: options.scale || 1.03,
      duration: 0.8,
      ease: 'power2.out'
    })
  }
  const onMouseLeave = () => {
    if (!card.value) return
    gsap.to(card.value, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)'
    })
  }
  return { card, onMouseMove, onMouseLeave }
}
