<template>
  <div class="fixed bottom-6 right-6 z-[100]">
    <button @click="toggleChat" class="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 shadow-xl flex items-center justify-center text-white hover:scale-105 transition-transform duration-300 group">
      <div class="relative">
        <i class="fas fa-robot text-2xl"></i>
        <span v-if="unreadCount > 0" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
          {{ unreadCount }}
        </span>
      </div>
    </button>

    <transition 
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-10"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transform transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isOpen" class="absolute bottom-24 right-0 w-96 h-[600px] bg-white dark:bg-gray-800 shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
        <!-- رأس الشات بوت -->
        <div class="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-6 py-4 flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <i class="fas fa-robot text-white"></i>
            </div>
            <div>
              <h3 class="font-bold">مساعد تاربّو الذكي</h3>
              <p class="text-xs opacity-80" :class="{ 'text-green-400': isOnline, 'text-yellow-400': !isOnline }">
                {{ isOnline ? 'متصل الآن' : 'جاري الاتصال...' }}
              </p>
            </div>
          </div>
          <div class="flex gap-2">
            <button @click="toggleSettings" class="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white">
              <i class="fas fa-cog"></i>
            </button>
            <button @click="closeChat" class="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <!-- جسم المحادثة -->
        <div ref="messagesContainer" class="flex-grow overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          <div v-for="(message, index) in messages" :key="index" 
               :class="['message mb-6', message.sender]">
            <div :class="['rounded-2xl p-4 max-w-[85%] shadow-sm', 
                        message.sender === 'received' ? 'bg-white dark:bg-gray-800' : 'bg-primary-100 dark:bg-primary-900']">
              <p class="text-gray-800 dark:text-gray-200">{{ message.text }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">{{ formatTime(message.timestamp) }}</p>
            </div>
          </div>
          
          <div v-if="isTyping" class="message received mb-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 max-w-[50%] shadow-sm">
              <div class="flex space-x-2">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- إدخال الرسالة -->
        <div class="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <div class="flex gap-3">
            <div class="flex-grow relative">
              <textarea 
                ref="messageInput"
                v-model="messageText"
                @keydown.enter.exact.prevent="sendMessage"
                placeholder="اكتب رسالتك..."
                class="w-full py-3 px-4 pr-12 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 resize-none"
                rows="1"
              ></textarea>
              <button @click="sendMessage" class="absolute bottom-3 left-3 text-gray-500 hover:text-primary-600">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
            <button @click="toggleAttachment" class="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
              <i class="fas fa-paperclip"></i>
            </button>
          </div>
          
          <!-- الاقتراحات السريعة -->
          <div class="mt-3 flex overflow-x-auto pb-2 scrollbar-hide">
            <button 
              v-for="(suggestion, index) in quickSuggestions" 
              :key="index"
              @click="selectSuggestion(suggestion)"
              class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-2 rounded-lg text-sm mr-2"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isOnline: true,
      unreadCount: 3,
      messages: [
        {
          text: 'مرحباً! أنا مساعد تاربّو، كيف يمكنني مساعدتك اليوم؟',
          sender: 'received',
          timestamp: new Date()
        }
      ],
      messageText: '',
      isTyping: false,
      quickSuggestions: [
        'كيف أستخدم واجهة X؟',
        'أمثلة على التعليمات البرمجية',
        'ما هي واجهات السحابة؟',
        'كيفية التوثيق'
      ]
    }
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen
      if (this.isOpen) this.unreadCount = 0
    },
    closeChat() {
      this.isOpen = false
    },
    sendMessage() {
      if (this.messageText.trim() === '') return
      
      // إضافة رسالة المستخدم
      this.messages.push({
        text: this.messageText,
        sender: 'sent',
        timestamp: new Date()
      })
      
      const userMessage = this.messageText
      this.messageText = ''
      
      // محاكاة الكتابة
      this.isTyping = true
      
      // محاكاة الرد الآلي بعد تأخير
      setTimeout(() => {
        this.isTyping = false
        this.generateResponse(userMessage)
      }, 1500)
      
      // التمرير إلى الأسفل
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    generateResponse(userMessage) {
      // هنا سيتم دمج ذكاء حقيقي في الإنتاج
      const responses = {
        'مرحبا': ['مرحباً بك! كيف يمكنني مساعدتك اليوم؟', 'أهلاً وسهلاً! ما الذي تبحث عنه؟'],
        'مساعدة': ['أنا هنا لمساعدتك. هل يمكنك وصف مشكلتك بمزيد من التفاصيل؟', 'بالطبع! ما نوع المساعدة التي تحتاجها؟'],
        'شكرا': ['العفو! هل هناك شيء آخر يمكنني مساعدتك به؟', 'سعيد بمساعدتك!'],
        'default': ['شكراً على سؤالك! سأحاول مساعدتك في أقرب وقت ممكن.', 'هل يمكنك توضيح سؤالك أكثر؟']
      }
      
      let response = responses.default[0]
      
      for (const [keyword, replies] of Object.entries(responses)) {
        if (userMessage.toLowerCase().includes(keyword)) {
          response = replies[Math.floor(Math.random() * replies.length)]
          break
        }
      }
      
      this.messages.push({
        text: response,
        sender: 'received',
        timestamp: new Date()
      })
      
      this.scrollToBottom()
    },
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.messagesContainer) {
          this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight
        }
      })
    },
    selectSuggestion(suggestion) {
      this.messageText = suggestion
      this.$nextTick(() => {
        this.$refs.messageInput.focus()
      })
    },
    formatTime(date) {
      return new Intl.DateTimeFormat('ar-EG', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)
    }
  }
}
</script>

<style scoped>
.message.sent {
  @apply flex justify-end;
}
.message.received {
  @apply flex justify-start;
}
</style>
