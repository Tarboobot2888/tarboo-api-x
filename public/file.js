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
