// ==============================================
// ネコノメソウ検索アプリ — メインスクリプト
// ==============================================

// 各属ツリーの格納先（属JSファイルがここに書き込む）
const GENUS_TREES = {};

// 種情報の格納先（属JSファイルがここに書き込む）
const SPECIES_DATA = {};

// ---- 状態変数 ----
let currentGenus = null;
let currentTree  = null;
let currentNode  = null;
let history      = [];
let nodeHistory  = [];

// ---- 初期化 ----
function init() {
    document.getElementById('back-btn').addEventListener('click',  e => { e.preventDefault(); goBack(); });
    document.getElementById('reset-btn').addEventListener('click', e => { e.preventDefault(); reset(); });
    renderGenusSelection();
}

// ---- 属選択画面 ----
function renderGenusSelection() {
    const grid = document.getElementById('genus-grid');
    grid.innerHTML = '';

    GENERA_DATA.forEach(genus => {
        const card = document.createElement('div');
        card.className = genus.hasKey ? 'genus-card' : 'genus-card genus-card-disabled';

        const badgeHTML = genus.hasKey
            ? '<span class="status-badge status-badge-ready">実装済</span>'
            : '<span class="status-badge">準備中</span>';

        const ctaHTML = genus.hasKey
            ? `<button class="start-search-btn">🔍 タップして検索を開始</button>`
            : `<div class="not-ready-msg">⏳ この属は現在準備中です</div>`;

        card.innerHTML = `
            <div class="card-header">
                <div class="card-header-left">
                    <div class="genus-name">${genus.name}</div>
                    <div class="genus-latin">${genus.latin}</div>
                </div>
                <div class="card-header-right">
                    ${badgeHTML}
                    <span class="expand-indicator">▼</span>
                </div>
            </div>
            <div class="genus-examples">
                <div>${genus.description}</div>
                ${ctaHTML}
            </div>
        `;

        const startBtn = card.querySelector('.start-search-btn');
        if (startBtn) {
            startBtn.addEventListener('click', e => {
                e.stopPropagation();
                selectGenus(genus);
            });
        }

        card.addEventListener('click', () => {
            const isExpanded = card.classList.contains('expanded');
            document.querySelectorAll('.genus-card.expanded').forEach(c => {
                if (c !== card) {
                    c.classList.remove('expanded');
                    c.querySelector('.genus-examples').classList.remove('show');
                }
            });
            if (isExpanded) {
                card.classList.remove('expanded');
                card.querySelector('.genus-examples').classList.remove('show');
            } else {
                card.classList.add('expanded');
                card.querySelector('.genus-examples').classList.add('show');
            }
        });

        grid.appendChild(card);
    });

    document.getElementById('genus-selection').style.display = 'block';
    document.getElementById('search-area').style.display     = 'none';
    document.getElementById('breadcrumb').style.display      = 'none';
    document.getElementById('reset-btn').style.display       = 'none';
}

// ---- 属ツリーJSを動的に読み込んで検索開始 ----
function selectGenus(genus) {
    currentGenus = genus;
    history      = [];
    nodeHistory  = [];

    if (GENUS_TREES[genus.id]) {
        startSearch();
        return;
    }

    const script   = document.createElement('script');
    script.src     = `data/${genus.id}.js`;
    script.onload  = () => startSearch();
    script.onerror = () => alert(`${genus.name}のデータ読み込みに失敗しました。`);
    document.head.appendChild(script);
}

function startSearch() {
    const tree  = GENUS_TREES[currentGenus.id];
    currentNode = tree[tree.start];
    currentTree = tree;

    document.getElementById('genus-selection').style.display = 'none';
    document.getElementById('search-area').style.display     = 'block';
    document.getElementById('breadcrumb').style.display      = 'block';
    document.getElementById('reset-btn').style.display       = 'inline-block';

    updateBreadcrumb();
    render();
}

// ---- パンくず ----
function updateBreadcrumb() {
    const el = document.getElementById('breadcrumb');
    if (currentGenus) {
        let text = `<strong>現在:</strong> ${currentGenus.name}`;
        if (history.length > 0) text += ` → ${history.join(' → ')}`;
        el.innerHTML = text;
    }
}

// ---- 質問・選択肢を描画 ----
function render() {
    const questionEl = document.getElementById('question-area');
    const optionsEl  = document.getElementById('options-area');
    const resultEl   = document.getElementById('result-area');

    updateBreadcrumb();
    document.getElementById('back-btn').style.display = history.length > 0 ? 'block' : 'none';
    optionsEl.style.display = 'flex';
    resultEl.innerHTML      = '';

    const hintHTML = currentNode.hint
        ? `<div class="question-hint">${currentNode.hint}</div>`
        : '';
    questionEl.innerHTML = `<div class="question">${hintHTML}${currentNode.question}</div>`;
    optionsEl.innerHTML  = '';

    currentNode.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';

        const candidates = collectSpecies(option);
        let html = option.text;
        if (candidates.length > 0) {
            html += `<div class="candidates"><span class="candidates-label">候補:</span> ${candidates.join('、')}</div>`;
        }
        btn.innerHTML = html;

        btn.addEventListener('click', e => {
            e.preventDefault();
            selectOption(option, option.text.replace(/<[^>]*>/g, ''));
        });

        optionsEl.appendChild(btn);
    });
}

// ---- 候補種収集 ----
function collectSpecies(option, visited = new Set()) {
    const species = [];
    if (option.result) {
        species.push(option.result);
    } else if (option.next && currentTree[option.next] && !visited.has(option.next)) {
        visited.add(option.next);
        currentTree[option.next].options.forEach(opt => species.push(...collectSpecies(opt, visited)));
    }
    return species;
}

// ---- 選択肢を選ぶ ----
function selectOption(option, displayText) {
    if (option.result) {
        showResult(option.result, displayText);
    } else if (option.next && currentTree) {
        nodeHistory.push(currentNode);
        history.push(displayText.substring(0, 30) + (displayText.length > 30 ? '...' : ''));
        currentNode = currentTree[option.next];
        render();
    }
}

// ---- 結果表示 ----
function showResult(speciesName, lastChoice) {
    document.getElementById('options-area').style.display = 'none';
    document.getElementById('back-btn').style.display     = 'block';

    // 種情報を検索
    const info = SPECIES_DATA[currentGenus.id]
        ? SPECIES_DATA[currentGenus.id][speciesName]
        : null;

    let distHTML = '';
    if (info) {
        const DIST_LABELS = [
            { key: 'hok', label: '北海道' },
            { key: 'hon', label: '本州' },
            { key: 'shi', label: '四国' },
            { key: 'kyu', label: '九州' }
        ];
        const badges = DIST_LABELS
            .filter(d => info.dist[d.key] !== 'n')
            .map(d => `<span class="dist-badge-${info.dist[d.key]}">${d.label}</span>`)
            .join('');

        const overseasHTML = info.overseas
            ? `<div class="dist-overseas">🌏 ${info.overseas}</div>`
            : '';

        distHTML = `
            <div class="dist-block">
                <div class="dist-title">📍 国内分布</div>
                <div class="dist-badges">${badges}</div>
                <div class="dist-detail">${info.distDetail}</div>
                ${overseasHTML}
            </div>`;
    }

    const metaHTML = info ? `
        <div class="result-meta">
            <span class="result-page-badge">📖 ${info.page}</span>
            <span class="result-section-badge">${info.section}</span>
        </div>` : '';

    const latinHTML = info
        ? `<div class="result-latin">${info.latin}</div>`
        : '';

    document.getElementById('result-area').innerHTML = `
        <div class="result">
            <h2>🎯 ${speciesName}</h2>
            ${latinHTML}
            ${metaHTML}
            ${distHTML}
        </div>
    `;
}

// ---- 戻る ----
function goBack() {
    if (nodeHistory.length === 0) { reset(); return; }
    history.pop();
    currentNode = nodeHistory.pop();
    document.getElementById('options-area').style.display = 'flex';
    document.getElementById('result-area').innerHTML = '';
    render();
}

// ---- 属選択に戻る ----
function reset() {
    currentGenus = null;
    currentTree  = null;
    currentNode  = null;
    history      = [];
    nodeHistory  = [];
    renderGenusSelection();
}

// ---- 起動 ----
init();

// ---- Service Worker 登録（PWAオフライン対応）----
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg  => console.log('SW registered:', reg.scope))
            .catch(err => console.warn('SW registration failed:', err));
    });
}
