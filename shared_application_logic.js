// Global Portfolio State
let clickCount = 0;
let isDarkMode = true;

// Default Showcase Projects Array
let defaultProjects = [
    {
        title: 'Binary-to-Decimal Converter',
        tech: 'JavaScript, Math, HTML5',
        desc: 'Interactive tool for real-time base-2 and base-10 number conversions with copy shortcuts.',
        link: 'binary_decimal_converter.html'
    },
    {
        title: 'Interactive Crossword Puzzle',
        tech: 'JavaScript, Algorithms',
        desc: 'Custom matrix-driven technical crossword puzzle with answer verification and hint system.',
        link: 'crossword_generator_interactive_puzzle.html'
    },
    {
        title: 'Java Data Structures Suite',
        tech: 'Java, OOP',
        desc: 'A collection of efficient Java implementations for binary trees, custom hash maps, and sorting algorithms.',
        link: '#'
    }
];

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Current Year Update
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Init Theme Setup
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // Init Counter Buttons
    const counterBtn = document.getElementById('somethingbutton');
    const resetBtn = document.getElementById('reset-button');
    if (counterBtn) counterBtn.addEventListener('click', incrementCounter);
    if (resetBtn) resetBtn.addEventListener('click', resetCounter);

    // Init Crossword if on Crossword Page
    if (document.getElementById('crossword-grid')) {
        initCrosswordGrid();
    }

    // Render Projects if on Projects Page
    if (document.getElementById('projects-grid')) {
        renderProjects();
    }
});

// Theme Switcher Toggle
function toggleTheme() {
    isDarkMode = !isDarkMode;
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');

    if (isDarkMode) {
        html.classList.add('dark');
        if (icon) icon.className = 'fa-solid fa-moon text-brand-500';
    } else {
        html.classList.remove('dark');
        if (icon) icon.className = 'fa-solid fa-sun text-amber-500';
    }
    showToast(`Switched to ${isDarkMode ? 'Dark' : 'Light'} theme`);
}

// Mobile Navigation Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    if (!menu) return;

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        if (icon) icon.className = 'fa-solid fa-xmark text-xl';
    } else {
        menu.classList.add('hidden');
        if (icon) icon.className = 'fa-solid fa-bars text-xl';
    }
}

// Counter Logic for "DON'T CLICK" button
function incrementCounter() {
    clickCount++;
    const label = document.getElementById('count-label');
    const egg = document.getElementById('counter-easter-egg');
    
    if (label) {
        label.textContent = clickCount;
        label.classList.add('scale-125', 'text-brand-accent');
        setTimeout(() => label.classList.remove('scale-125', 'text-brand-accent'), 150);
    }

    if (egg) {
        if (clickCount === 1) egg.textContent = "Hey! I told you NOT to click it!";
        else if (clickCount === 5) egg.textContent = "You really like clicking this button, huh?";
        else if (clickCount === 10) egg.textContent = "Double digits! 🚀 You've unlocked true curiosity!";
        else if (clickCount === 25) egg.textContent = "25 clicks! Go Yanks! ⚾";
        else if (clickCount === 50) egg.textContent = "50 clicks! Counter Master Status Earned! 🏆";
    }
}

function resetCounter() {
    clickCount = 0;
    const label = document.getElementById('count-label');
    const egg = document.getElementById('counter-easter-egg');
    if (label) label.textContent = '0';
    if (egg) egg.textContent = "Counter reset to 0.";
    showToast("Counter reset successfully!");
}

// Binary Converter Logic
function convertBinaryToDecimal() {
    const binInput = document.getElementById('binary-input').value.trim();
    const decInput = document.getElementById('decimal-input');

    if (binInput === '') {
        decInput.value = '';
        return;
    }

    if (/^[01]+$/.test(binInput)) {
        decInput.value = parseInt(binInput, 2);
    } else {
        decInput.value = 'Invalid Binary!';
    }
}

function convertDecimalToBinary() {
    const decInput = document.getElementById('decimal-input').value;
    const binInput = document.getElementById('binary-input');

    if (decInput === '') {
        binInput.value = '';
        return;
    }

    const num = parseInt(decInput, 10);
    if (!isNaN(num) && num >= 0) {
        binInput.value = num.toString(2);
    } else {
        binInput.value = 'Invalid Number!';
    }
}

function setBinaryPreset(binVal) {
    const binInput = document.getElementById('binary-input');
    if (binInput) {
        binInput.value = binVal;
        convertBinaryToDecimal();
    }
}

function copyValue(elementId) {
    const el = document.getElementById(elementId);
    if (el && el.value) {
        const tempInput = document.createElement('input');
        tempInput.value = el.value;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast("Copied to clipboard!");
    }
}

// Projects Showcase Dynamic Logic
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = defaultProjects.map((p, idx) => `
        <div class="glass p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-mono bg-brand-500/10 text-brand-500 border border-brand-500/20 font-semibold">${p.tech}</span>
                    <i class="fa-solid fa-code-branch text-slate-500 text-sm"></i>
                </div>
                <h3 class="text-lg font-bold font-heading text-slate-800 dark:text-slate-100">${p.title}</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${p.desc}</p>
            </div>
            
            <div class="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <a href="${p.link}" class="inline-flex items-center gap-1.5 text-xs font-bold text-brand-500 hover:text-brand-400 transition-colors">
                    View Project <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>
            </div>
        </div>
    `).join('');
}

function toggleProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) modal.classList.toggle('hidden');
}

function handleAddNewProject(e) {
    e.preventDefault();
    const title = document.getElementById('proj-title').value;
    const tech = document.getElementById('proj-tech').value;
    const desc = document.getElementById('proj-desc').value;
    const link = document.getElementById('proj-link').value || '#';

    defaultProjects.unshift({ title, tech, desc, link });
    renderProjects();
    toggleProjectModal();
    document.getElementById('add-project-form').reset();
    showToast("New project added to showcase!");
}

// Crossword Logic
function initCrosswordGrid() {
    const gridContainer = document.getElementById('crossword-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';
    const layout = [
        ['J', 'A', 'V', 'A', '#'],
        ['#', '#', 'H', '#', '#'],
        ['B', 'I', 'N', 'A', 'R'],
        ['#', '#', 'M', '#', '#'],
        ['#', '#', 'L', '#', '#']
    ];

    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const cellVal = layout[r][c];
            if (cellVal === '#') {
                const block = document.createElement('div');
                block.className = 'w-10 h-10 sm:w-12 sm:h-12 bg-slate-950 rounded-lg';
                gridContainer.appendChild(block);
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.dataset.answer = cellVal;
                input.className = 'crossword-cell w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 text-white text-center font-bold font-mono text-lg uppercase rounded-lg border border-slate-700 focus:border-brand-500 focus:outline-none';
                gridContainer.appendChild(input);
            }
        }
    }
}

function checkCrosswordAnswers() {
    const cells = document.querySelectorAll('.crossword-cell');
    let correct = 0;
    let total = cells.length;

    cells.forEach(cell => {
        if (cell.value.toUpperCase() === cell.dataset.answer) {
            cell.classList.add('bg-emerald-900/80', 'border-emerald-500');
            cell.classList.remove('bg-slate-800', 'bg-red-900/80');
            correct++;
        } else if (cell.value !== '') {
            cell.classList.add('bg-red-900/80', 'border-red-500');
            cell.classList.remove('bg-slate-800', 'bg-emerald-900/80');
        }
    });

    if (correct === total) {
        showToast("🎉 Perfect! You solved the crossword!");
    } else {
        showToast(`Checked: ${correct}/${total} correct`);
    }
}

function revealCrosswordAnswers() {
    const cells = document.querySelectorAll('.crossword-cell');
    cells.forEach(cell => {
        cell.value = cell.dataset.answer;
        cell.classList.add('bg-emerald-900/80', 'border-emerald-500');
    });
    showToast("Solution revealed!");
}

// Toast Helper Function
function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-medium shadow-2xl border border-slate-700 flex items-center gap-2 animate-fadeIn';
    toast.innerHTML = `<i class="fa-solid fa-circle-info text-brand-500"></i> ${msg}`;
    
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}