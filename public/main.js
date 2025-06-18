const loader = document.getElementById('loader');
const progress = document.getElementById('progress');
let theme = localStorage.getItem('theme') || 'dark';

function applyTheme() {
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
}

function toggleTheme() {
  theme = theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  applyTheme();
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
applyTheme();

async function loadTypes() {
  try {
    const res = await fetch('/api/list');
    const data = await res.json();
    const container = document.getElementById('type-container');
    const message = document.getElementById('message');
    const types = [...new Set(data.map(api => api.type || 'افتراضي'))];
    if (types.length === 0) {
      message.textContent = 'لم يتم العثور على أنواع APIs.';
      return;
    }
    types.forEach(type => {
      const a = document.createElement('a');
      a.href = `type.html?type=${type}`;
      a.textContent = type.toUpperCase();
      a.className = 'block p-4 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition text-center';
      container.appendChild(a);
    });
  } catch (err) {
    document.getElementById('message').textContent = '❌ حدث خطأ أثناء تحميل البيانات';
  } finally {
    gsap.to(progress, { width: '100%', duration: 0.8, onComplete: () => loader.remove() });
  }
}
loadTypes();

function toggleChat() {
  const chatContainer = document.getElementById('chat-container');
  chatContainer.classList.toggle('hidden');
}

function handleKeyPress(e) {
  if (e.key === 'Enter') sendMessage();
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;
  const container = document.getElementById('chat-messages');
  const userDiv = document.createElement('div');
  userDiv.className = 'user-message bg-purple-600 text-white p-1 rounded self-end mb-1';
  userDiv.textContent = msg;
  container.appendChild(userDiv);
  input.value = '';
  try {
    const response = await fetch(`/api/ai/cai?text=${encodeURIComponent(msg)}`);
    const data = await response.text();
    const botDiv = document.createElement('div');
    botDiv.className = 'bot-message bg-black bg-opacity-50 text-white p-1 rounded self-start mb-1';
    botDiv.textContent = data;
    container.appendChild(botDiv);
  } catch (err) {
    const botDiv = document.createElement('div');
    botDiv.className = 'bot-message bg-black bg-opacity-50 text-white p-1 rounded self-start mb-1';
    botDiv.textContent = '❌ خطأ بالخادم';
    container.appendChild(botDiv);
  }
  container.scrollTop = container.scrollHeight;
}

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();
  document.querySelectorAll('#type-container a').forEach(el => {
    el.classList.toggle('hidden', !el.textContent.toLowerCase().includes(value));
  });
});
