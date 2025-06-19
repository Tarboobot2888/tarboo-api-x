function initProgressBar() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const doc = document.documentElement;
        const scrolled = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
        bar.style.width = scrolled + '%';
    });
}

function applySavedTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.body.classList.add('light');
    }
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.innerText = document.body.classList.contains('light') ? 'وضع ليلي' : 'وضع نهاري';
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.innerText = body.classList.contains('light') ? 'وضع ليلي' : 'وضع نهاري';
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert('✅ تم نسخ المسار');
}

const translations = {
    ar: {
        home: 'الرئيسية',
        apis: 'الواجهات البرمجية',
        docs: 'التوثيق',
        community: 'المجتمع',
        pricing: 'التسعير',
        start: 'ابدأ الآن',
        searchBtn: 'بحث',
        searchPlaceholder: 'ابحث عن نوع API ...',
        pageTitle: 'TARBOO-API',
        heroTitle: 'منصة TARBOO للواجهات البرمجية',
        heroSubtitle: 'أقوى واجهات برمجية عربية لتطوير تطبيقاتك بسرعة وكفاءة'
    },
    en: {
        home: 'Home',
        apis: 'APIs',
        docs: 'Docs',
        community: 'Community',
        pricing: 'Pricing',
        start: 'Get Started',
        searchBtn: 'Search',
        searchPlaceholder: 'Search API type ...',
        pageTitle: 'TARBOO-API',
        heroTitle: 'TARBOO API Platform',
        heroSubtitle: 'Powerful Arabic APIs to build your apps quickly and efficiently'
    }
};

function applyLanguage(lang) {
    const t = translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (t[key]) el.textContent = t[key];
    });
    const search = document.getElementById('search');
    if (search) search.placeholder = t.searchPlaceholder;
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) searchBtn.innerHTML = `<i class="fas fa-search mr-2"></i> ${t.searchBtn}`;
    const startBtn = document.getElementById('start-btn');
    if (startBtn) startBtn.textContent = t.start;
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.textContent = t.pageTitle;
}

function createParticles() {
    const bg = document.getElementById('particles-bg');
    if (!bg) return;
    const count = 40;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 6 + 4;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (5 + Math.random() * 5) + 's';
        p.style.animationDelay = (Math.random() * 5) + 's';
        bg.appendChild(p);
    }
    document.addEventListener('mousemove', e => {
        const rect = bg.getBoundingClientRect();
        const x = (e.clientX - rect.width / 2) / rect.width * 10;
        bg.querySelectorAll('.particle').forEach(el => {
            el.style.transform = `translateX(${x}px)`;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    createParticles();
    const lang = localStorage.getItem('lang') || document.documentElement.lang || 'ar';
    applyLanguage(lang);
    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
        toggle.innerText = lang === 'ar' ? 'EN' : 'AR';
        toggle.addEventListener('click', () => {
            const newLang = document.documentElement.lang === 'ar' ? 'en' : 'ar';
            applyLanguage(newLang);
            toggle.innerText = newLang === 'ar' ? 'EN' : 'AR';
            localStorage.setItem('lang', newLang);
        });
    }
});

function filterTypes() {
    const query = document.getElementById('search').value.toLowerCase();
    document.querySelectorAll('#type-container a').forEach(el => {
        el.style.display = el.innerText.toLowerCase().includes(query) ? 'block' : 'none';
    });
}

function filterAPIs() {
    const query = document.getElementById('search').value.toLowerCase();
    document.querySelectorAll('.api-box').forEach(box => {
        box.style.display = box.innerText.toLowerCase().includes(query) ? 'block' : 'none';
    });
}
