<template>
  <div 
    class="api-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-500 group"
    @mouseenter="startHoverAnimation"
    @mouseleave="stopHoverAnimation"
  >
    <!-- شريط الحالة -->
    <div :class="['py-2 px-4 text-xs font-medium', 
                api.premium ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200']">
      <span class="inline-flex items-center">
        <i v-if="api.premium" class="fas fa-crown mr-1"></i>
        <i v-else class="fas fa-check-circle mr-1"></i>
        {{ api.premium ? 'مميزة' : 'مجانية' }}
      </span>
    </div>
    
    <div class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ api.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">بواسطة {{ api.provider }}</p>
        </div>
        <div class="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
          <i :class="api.icon + ' text-primary-600 dark:text-primary-400 text-xl'"></i>
        </div>
      </div>
      
      <p class="text-gray-600 dark:text-gray-300 mb-6">{{ api.description }}</p>
      
      <div class="flex flex-wrap gap-2 mb-6">
        <span v-for="(tag, index) in api.tags" :key="index" 
              class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs px-3 py-1 rounded-full">
          {{ tag }}
        </span>
      </div>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="flex items-center text-amber-400">
            <i v-for="star in 5" :key="star" 
               :class="star <= api.rating ? 'fas fa-star' : 'far fa-star'"
               class="ml-1"></i>
            <span class="text-gray-600 dark:text-gray-400 text-sm mr-2">{{ api.rating.toFixed(1) }}</span>
          </div>
          <span class="text-gray-500 dark:text-gray-400 text-sm">
            <i class="fas fa-download ml-2"></i> {{ formatDownloads(api.downloads) }}
          </span>
        </div>
        
        <div class="flex gap-2">
          <button @click="copyEndpoint(api.endpoint)" 
                  class="copy-btn w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative">
            <i :class="copied ? 'fas fa-check text-green-500' : 'fas fa-copy text-gray-600 dark:text-gray-400'"></i>
            <span v-if="copied" class="absolute -top-8 -left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              تم النسخ!
            </span>
          </button>
          <button @click="toggleFavorite(api.id)" 
                  class="favorite-btn w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <i :class="isFavorite(api.id) ? 'fas fa-heart text-red-500' : 'far fa-heart text-gray-600 dark:text-gray-400'"></i>
          </button>
        </div>
      </div>
    </div>
    
    <div class="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-900">
      <a :href="api.docsUrl" 
         class="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-800 dark:hover:text-primary-300 inline-flex items-center group">
        عرض التفاصيل والتوثيق
        <i class="fas fa-arrow-left ml-2 transition-transform group-hover:-translate-x-1"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useFavorites } from '@/composables/useFavorites'

export default {
  props: {
    api: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const copied = ref(false)
    const { favorites, toggleFavorite, isFavorite } = useFavorites()
    let hoverAnimation = null

    const formatDownloads = (downloads) => {
      if (downloads >= 1000000) return (downloads / 1000000).toFixed(1) + 'M'
      if (downloads >= 1000) return (downloads / 1000).toFixed(1) + 'K'
      return downloads
    }

    const copyEndpoint = (endpoint) => {
      navigator.clipboard.writeText(endpoint)
      copied.value = true
      setTimeout(() => copied.value = false, 2000)
    }

    const startHoverAnimation = (el) => {
      const card = el.currentTarget
      hoverAnimation = gsap.to(card, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const stopHoverAnimation = (el) => {
      if (hoverAnimation) hoverAnimation.reverse()
    }

    return {
      copied,
      formatDownloads,
      copyEndpoint,
      toggleFavorite,
      isFavorite,
      startHoverAnimation,
      stopHoverAnimation
    }
  }
}
</script>

<style scoped>
.api-card {
  transform: perspective(1000px) rotateX(0) rotateY(0) scale(1);
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.api-card:hover {
  transform: perspective(1000px) rotateX(2deg) rotateY(2deg) scale(1.02);
}

.api-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right, var(--color-primary-400), var(--color-primary-600));
  border-radius: 4px 4px 0 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.api-card:hover::before {
  opacity: 1;
}
</style>
