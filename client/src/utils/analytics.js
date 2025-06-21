// تتبع الأحداث المهمة
export const trackEvent = (eventName, properties = {}) => {
  // إرسال البيانات إلى Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, {
      ...properties,
      app_name: 'TARBOO_API',
      app_version: process.env.VUE_APP_VERSION,
      language: 'ar'
    })
  }
  
  // إرسال البيانات إلى نظام التحليلات الداخلي
  fetch('/api/analytics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      event: eventName,
      properties,
      user_agent: navigator.userAgent,
      screen: `${screen.width}x${screen.height}`,
      timestamp: new Date().toISOString()
    })
  }).catch(error => {
    console.error('فشل إرسال التحليلات:', error)
  })
}

// تتبع الأحداث الشائعة
export const AnalyticsEvents = {
  PAGE_VIEW: 'page_view',
  API_SEARCH: 'api_search',
  API_VIEW: 'api_view',
  API_COPY: 'api_copy',
  API_FAVORITE: 'api_favorite',
  CHAT_START: 'chat_start',
  CHAT_MESSAGE: 'chat_message',
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
  ERROR_OCCURRED: 'error_occurred'
}

// تهيئة نظام التحليلات
export const initAnalytics = () => {
  // تتبع عرض الصفحة
  trackEvent(AnalyticsEvents.PAGE_VIEW, {
    page_title: document.title,
    page_path: window.location.pathname,
    page_location: window.location.href
  })
  
  // تتبع الأخطاء
  window.addEventListener('error', (event) => {
    trackEvent(AnalyticsEvents.ERROR_OCCURRED, {
      error_message: event.message,
      error_stack: event.error?.stack,
      error_file: event.filename,
      error_line: event.lineno,
      error_col: event.colno
    })
  })
  
  // تتبع أداء التحميل
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        trackEvent('performance_metric', {
          metric_name: entry.name,
          metric_value: entry.duration,
          entry_type: entry.entryType
        })
      }
    })
    
    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input'] })
  }
}
