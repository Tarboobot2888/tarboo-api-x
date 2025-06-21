import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AOS from 'aos'

// تسجيل مكونات GSAP
gsap.registerPlugin(ScrollTrigger)

// تهيئة نظام الرسوم المتحركة
export const initAnimations = () => {
  // تهيئة AOS للرسوم عند التمرير
  AOS.init({
    duration: 800,
    easing: 'ease-in-out-quad',
    once: true,
    mirror: false,
    offset: 100,
  })

  // رسوم متحركة للبطاقات
  gsap.utils.toArray('.animated-card').forEach(card => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none none',
      }
    })
  })

  // رسوم متحركة للشعار
  const logo = document.querySelector('.logo-animation')
  if (logo) {
    gsap.to(logo, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: 'none',
    })
  }

  // رسوم متحركة للجسيمات
  particlesJS('particles-js', {
    particles: {
      number: { value: 120, density: { enable: true, value_area: 1000 } },
      color: { value: '#4f46e5' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 1.5,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      }
    },
    retina_detect: true
  })
}
