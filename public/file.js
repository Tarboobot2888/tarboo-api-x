function initProgressBar() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const doc = document.documentElement;
        const scrolled = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
        bar.style.width = scrolled + '%';
    });
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.innerText = body.classList.contains('light') ? 'وضع ليلي' : 'وضع نهاري';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert('✅ تم نسخ المسار');
}

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
