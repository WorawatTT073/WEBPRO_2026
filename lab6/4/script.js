const STORAGE_KEY = 'favoriteMovies';

const form = document.getElementById('movieForm');
const titleInput = document.getElementById('titleInput');
const movieListEl = document.getElementById('movieList');
const emptyEl = document.querySelector('.empty');
const clearBtn = document.getElementById('clearBtn');

function loadItems() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function renderItems() {
    const items = loadItems();
    while (movieListEl.firstChild) movieListEl.removeChild(movieListEl.firstChild);

    if (items.length === 0) {
        emptyEl.style.display = 'block';
        return;
    }
    emptyEl.style.display = 'none';

    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'movie-item';
        li.dataset.id = item.id;

        const left = document.createElement('div');
        left.className = 'left';

        const thumb = document.createElement('div');
        thumb.className = 'thumb';
        thumb.textContent = '🎬';

        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = item.title;

        left.appendChild(thumb);
        left.appendChild(title);

        const actions = document.createElement('div');
        actions.className = 'actions';
        const del = document.createElement('button');
        del.className = 'del-btn';
        del.type = 'button';
        del.textContent = 'ลบ';
        del.addEventListener('click', () => removeItem(item.id));
        actions.appendChild(del);

        li.appendChild(left);
        li.appendChild(actions);
        movieListEl.appendChild(li);
    });
}

function addItem(title) {
    const items = loadItems();
    const newItem = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2,6),
        title: title.trim(),
    };
    items.push(newItem);
    saveItems(items);
    renderItems();
}

function removeItem(id) {
    const items = loadItems().filter(i => i.id !== id);
    saveItems(items);
    renderItems();
}

function clearAll() {
    localStorage.removeItem(STORAGE_KEY);
    renderItems();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = titleInput.value || '';
    if (val.trim() === '') return;
    addItem(val);
    titleInput.value = '';
    titleInput.focus();
});

clearBtn.addEventListener('click', () => {
    if (confirm('ลบรายการทั้งหมดใช่หรือไม่?')) clearAll();
});

renderItems();