import io from 'socket.io-client'

// إنشاء اتصال WebSocket
const socket = io(process.env.VUE_APP_SOCKET_URL || 'https://api.tarboo.com', {
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  autoConnect: true,
  query: {
    token: localStorage.getItem('authToken'),
    lang: 'ar'
  }
})

// إدارة أحداث الاتصال
socket.on('connect', () => {
  console.log('متصل بخادم الوقت الحقيقي')
})

socket.on('disconnect', (reason) => {
  console.log('انقطع الاتصال: ', reason)
})

socket.on('connect_error', (error) => {
  console.error('خطأ في الاتصال: ', error)
})

// تصدير وظائف التواصل
export const realtime = {
  // الاشتراك في تحديثات الـ API
  subscribeToAPIUpdates(callback) {
    socket.on('api-update', callback)
  },
  
  // إلغاء الاشتراك من تحديثات الـ API
  unsubscribeFromAPIUpdates(callback) {
    socket.off('api-update', callback)
  },
  
  // الاشتراك في الإشعارات
  subscribeToNotifications(callback) {
    socket.on('notification', callback)
  },
  
  // إرسال رسالة شات
  sendChatMessage(message) {
    socket.emit('chat-message', {
      text: message,
      userId: getCurrentUser().id,
      timestamp: Date.now()
    })
  },
  
  // استلام رسائل الشات
  onChatMessage(callback) {
    socket.on('chat-message', callback)
  },
  
  // إدارة حالة الاتصال
  isConnected() {
    return socket.connected
  },
  
  // إعادة الاتصال يدوياً
  reconnect() {
    socket.connect()
  },
  
  // قطع الاتصال
  disconnect() {
    socket.disconnect()
  }
}

// وظيفة مساعدة للحصول على المستخدم الحالي
function getCurrentUser() {
  // سيتم تنفيذ هذا في نظام المصادقة
  return { id: 'user-123', name: 'مستخدم' }
}
