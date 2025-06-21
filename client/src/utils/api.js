// ذاكرة تخزين مؤقت للبيانات
const apiCache = new Map()

// دالة متقدمة لجلب البيانات مع التخزين المؤقت ومعالجة الأخطاء
export const fetchAPI = async (endpoint, options = {}) => {
  const cacheKey = JSON.stringify({ endpoint, options })
  
  // التحقق من وجود بيانات في الذاكرة المؤقتة
  if (apiCache.has(cacheKey)) {
    return apiCache.get(cacheKey)
  }

  try {
    // إظهار مؤشر التحميل
    showLoader()

    const response = await fetch(`/api/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'ar',
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(`خطأ في الشبكة: ${response.status}`)
    }

    const data = await response.json()
    
    // تخزين البيانات في الذاكرة المؤقتة لمدة 5 دقائق
    apiCache.set(cacheKey, data)
    setTimeout(() => apiCache.delete(cacheKey), 300000)

    return data
  } catch (error) {
    // تسجيل الخطأ في نظام المراقبة
    logError(error)
    showErrorNotification('فشل تحميل البيانات، يرجى المحاولة مرة أخرى')
    return null
  } finally {
    // إخفاء مؤشر التحميل
    hideLoader()
  }
}

// دالة متقدمة للبحث
export const searchAPIs = async (query, filters = {}) => {
  const params = new URLSearchParams({
    q: query,
    ...filters,
    lang: 'ar',
  })

  return fetchAPI(`search?${params.toString()}`)
}
