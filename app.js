/* ─── Data ───────────────────────────────────────── */
const palette = [
    { hex: '#0268B7', name: '主視覺藍', usage: '品牌主色、標題重點、主要按鈕' },
    { hex: '#0079B0', name: '捷運藍', usage: '資訊標示、連結、次要重點' },
    { hex: '#007AB0', name: '亮藍', usage: '表格標題、互動狀態、圖表輔色' },
    { hex: '#14598D', name: '深鋼藍', usage: '深色區塊、頁尾、深底反白文字' },
    { hex: '#25587F', name: '暗藍', usage: '深色背景、資訊圖底色' },
    { hex: '#295989', name: '鋼藍', usage: '內文重點、章節標籤' },
    { hex: '#5C7EB8', name: '柔和藍', usage: '輔助底色、簡報圖表' },
    { hex: '#5ECBC3', name: '薄荷綠', usage: '永續、友善、行動倡議' },
    { hex: '#038288', name: '模板青綠', usage: '簡報模板 01/03 波形主色、科技與動態感' },
    { hex: '#029F67', name: '模板捷運綠', usage: '簡報模板 02 主視覺綠、品牌延展色' },
    { hex: '#83C2A9', name: '柔霧綠', usage: '簡報模板 02 淺色層次、柔和背景' },
    { hex: '#98D4D3', name: '淺青綠', usage: '簡報模板 04 輕量背景、清爽留白' },
    { hex: '#B0DEE7', name: '淡天藍', usage: '簡報模板 04 天空感背景、低彩度輔色' },
    { hex: '#76B1C6', name: '霧藍', usage: '簡報模板 05 藍色區塊、資訊型輔色' },
    { hex: '#A2D8DB', name: '粉霧藍', usage: '簡報模板 05 淺色背景、溫和科技感' },
    { hex: '#BCDFE6', name: '冰藍', usage: '簡報模板 05 高明度底色、簡報留白區' },
    { hex: '#006833', name: '深綠', usage: '正確狀態、永續主題' },
    { hex: '#3CB371', name: '中海綠', usage: '自然、環境、補充圖表' },
    { hex: '#2ECC71', name: '翡翠綠', usage: '成功狀態、正向提示' },
    { hex: '#4CAF50', name: '標準綠', usage: '狀態標籤、表單確認' },
    { hex: '#66BB6A', name: '淺綠', usage: '輕量提示、背景輔色' },
    { hex: '#FC8561', name: '珊瑚橙', usage: '提醒、錯誤示意、強調 CTA' },
    { hex: '#F4F4F4', name: '淺灰', usage: '頁面背景、分隔區塊' },
    { hex: '#727171', name: '中灰', usage: '次要文字、輔助線條' },
    { hex: '#3C3C3C', name: '深灰', usage: '正文、反白區塊底色' }
];

const categoryNames = {
    reds: '紅橙色系',
    greens: '綠色系',
    cyans: '青綠色系',
    blues: '藍色系',
    grays: '中性色系',
    others: '其他色系'
};

const fontOptions = {
    noto: {
        label: '思源黑體 Noto Sans TC',
        stack: 'Noto Sans TC, Microsoft JhengHei, Arial, sans-serif',
        note: '適合內部文件、網頁與跨平台顯示。'
    },
    sho: {
        label: '翔鶴黑體',
        stack: 'Noto Sans TC, Microsoft JhengHei, Arial, sans-serif',
        note: '正式委外設計優先採用；網頁預覽以可用字體回退呈現。'
    }
};

const logoOptions = {
    standard: {
        label: '標準彩色',
        className: 'preview-logo-standard',
        note: '適合淺色或留白充足的版面。'
    },
    reverse: {
        label: '深色底反白',
        className: 'preview-logo-reverse',
        note: '適合深色主視覺與高對比 Hero 區。'
    },
    black: {
        label: '淺色底黑字',
        className: 'preview-logo-black',
        note: '適合淺色底圖或正式資訊型版面。'
    }
};

const templateOptions = {
    cover: {
        label: '封面式',
        eyebrow: 'The New Metro Taipei',
        title: 'Our Lifestyle',
        detail: '適合活動首頁、封面簡報與品牌宣告。'
    },
    agenda: {
        label: '章節概要式',
        eyebrow: '簡報概要',
        title: '01 品牌形象 / 02 服務價值 / 03 城市行銷',
        detail: '適合決策會議、章節導覽與專案提案。'
    },
    metrics: {
        label: '重點數據式',
        eyebrow: 'Key Metrics',
        title: '97% 滿意度 / MKBF 世界級可靠度',
        detail: '適合成果展示、數據報告與營運績效。'
    }
};

/* ─── Color Utilities ────────────────────────────── */
function hexToHsv(hex) {
    const n = hex.replace('#', '');
    const r = parseInt(n.slice(0, 2), 16) / 255;
    const g = parseInt(n.slice(2, 4), 16) / 255;
    const b = parseInt(n.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let h = 0;

    if (delta !== 0) {
        if (max === r) h = ((g - b) / delta) % 6;
        else if (max === g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    return {
        h,
        s: Math.round((max === 0 ? 0 : delta / max) * 100),
        v: Math.round(max * 100)
    };
}

function getColorCategory(color) {
    const { h, s } = hexToHsv(color.hex);
    if (s < 10) return 'grays';
    if (h >= 0 && h < 45) return 'reds';
    if (h >= 60 && h < 160) return 'greens';
    if (h >= 160 && h < 185) return 'cyans';
    if (h >= 185 && h < 260) return 'blues';
    return 'others';
}

function sortPalette(sortType) {
    const colors = [...palette];
    if (sortType === 'hue') return colors.sort((a, b) => hexToHsv(a.hex).h - hexToHsv(b.hex).h);
    if (sortType === 'brightness') return colors.sort((a, b) => hexToHsv(b.hex).v - hexToHsv(a.hex).v);
    if (sortType === 'saturation') return colors.sort((a, b) => hexToHsv(b.hex).s - hexToHsv(a.hex).s);
    return colors;
}

/* ─── Toast Notification ─────────────────────────── */
function showToast(hex, name, success = true) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast${success ? ' success' : ''}`;
    toast.innerHTML = `
        <span class="toast-swatch" style="background:${hex}" aria-hidden="true"></span>
        <span>${success ? '已複製' : '複製失敗'} ${name} <strong>${hex}</strong></span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastOut 0.25s ease forwards';
        setTimeout(() => toast.remove(), 260);
    }, 2000);
}

/* ─── Color Card ─────────────────────────────────── */
function createColorCard(color) {
    const hsv = hexToHsv(color.hex);
    const card = document.createElement('article');
    card.className = 'color-card';

    const button = document.createElement('button');
    button.className = 'color-swatch';
    button.type = 'button';
    button.style.backgroundColor = color.hex;
    button.dataset.color = color.hex;
    button.dataset.name = color.name;
    button.setAttribute('aria-label', `複製 ${color.name} ${color.hex}`);
    button.innerHTML = '<span class="copy-message" aria-hidden="true">已複製</span>';

    const info = document.createElement('div');
    info.className = 'color-info';
    info.innerHTML = `
        <h4>${color.name}</h4>
        <p class="color-code">${color.hex}</p>
        <p>${color.usage}</p>
        <dl class="hsv-info">
            <div><dt>H</dt><dd>${hsv.h}°</dd></div>
            <div><dt>S</dt><dd>${hsv.s}%</dd></div>
            <div><dt>V</dt><dd>${hsv.v}%</dd></div>
        </dl>
    `;

    card.append(button, info);
    return card;
}

/* ─── Color Group ────────────────────────────────── */
function createGroup(title, colors, id) {
    const group = document.createElement('section');
    group.className = 'color-group';

    const header = document.createElement('button');
    header.className = 'group-header';
    header.type = 'button';
    header.setAttribute('aria-expanded', 'true');
    header.setAttribute('aria-controls', id);
    header.innerHTML = `<span>${title} <span style="opacity:0.6;font-weight:400">(${colors.length})</span></span><span class="toggle-icon" aria-hidden="true">▼</span>`;

    const grid = document.createElement('div');
    grid.className = 'color-grid';
    grid.id = id;
    colors.forEach(color => grid.appendChild(createColorCard(color)));

    group.append(header, grid);
    return group;
}

/* ─── Render Colors ──────────────────────────────── */
function renderColors(sortType = 'category', filterQuery = '') {
    const display = document.getElementById('color-display');
    const countEl = document.getElementById('color-count');
    display.replaceChildren();

    const query = filterQuery.trim().toLowerCase();
    const filtered = query
        ? palette.filter(c => c.name.toLowerCase().includes(query) || c.hex.toLowerCase().includes(query) || c.usage.toLowerCase().includes(query))
        : palette;

    if (countEl) {
        countEl.textContent = query ? `找到 ${filtered.length} 個顏色` : '';
    }

    if (filtered.length === 0) {
        const msg = document.createElement('p');
        msg.className = 'no-results';
        msg.textContent = `找不到符合「${filterQuery}」的顏色`;
        display.appendChild(msg);
        return;
    }

    if (sortType === 'category' && !query) {
        const groups = palette.reduce((acc, color) => {
            const cat = getColorCategory(color);
            acc[cat] = acc[cat] || [];
            acc[cat].push(color);
            return acc;
        }, {});

        Object.keys(categoryNames).forEach(cat => {
            if (groups[cat]?.length) {
                display.appendChild(createGroup(categoryNames[cat], groups[cat], `palette-${cat}`));
            }
        });
        return;
    }

    if (query) {
        display.appendChild(createGroup(`搜尋結果`, filtered, 'palette-search'));
        return;
    }

    const titles = { hue: '依色相排序', brightness: '依明度排序', saturation: '依彩度排序' };
    const sorted = [...filtered].sort((a, b) => {
        if (sortType === 'hue') return hexToHsv(a.hex).h - hexToHsv(b.hex).h;
        if (sortType === 'brightness') return hexToHsv(b.hex).v - hexToHsv(a.hex).v;
        if (sortType === 'saturation') return hexToHsv(b.hex).s - hexToHsv(a.hex).s;
        return 0;
    });
    display.appendChild(createGroup(titles[sortType], sorted, `palette-${sortType}`));
}

/* ─── Color Selects ──────────────────────────────── */
function getColorByHex(hex) {
    return palette.find(c => c.hex === hex) || palette[0];
}

function populateColorSelect(select, selectedHex) {
    if (!select) return;
    select.replaceChildren();

    palette.forEach(color => {
        const option = document.createElement('option');
        option.value = color.hex;
        option.textContent = `${color.name} ${color.hex}`;
        option.selected = color.hex === selectedHex;
        select.appendChild(option);
    });
}

function updateSelectDot(dotId, hex) {
    const dot = document.getElementById(dotId);
    if (dot) dot.style.background = hex;
}

/* ─── Generator ──────────────────────────────────── */
function getDecisionState(form) {
    const formData = new FormData(form);
    return {
        primary: getColorByHex(formData.get('primaryColor')),
        accent: getColorByHex(formData.get('accentColor')),
        font: fontOptions[formData.get('fontChoice')] || fontOptions.noto,
        logo: logoOptions[formData.get('logoChoice')] || logoOptions.standard,
        template: templateOptions[formData.get('templateChoice')] || templateOptions.cover
    };
}

function createTemplatePreview(template, primary, accent) {
    if (template === templateOptions.agenda) {
        return `
            <div class="preview-slide agenda-preview">
                <p>${template.eyebrow}</p>
                <ol>
                    <li><span>01</span> 品牌形象</li>
                    <li><span>02</span> 服務價值</li>
                    <li><span>03</span> 城市行銷</li>
                </ol>
            </div>
        `;
    }

    if (template === templateOptions.metrics) {
        return `
            <div class="preview-slide metrics-preview">
                <p>${template.eyebrow}</p>
                <div>
                    <strong style="color:${primary.hex}">97%</strong>
                    <span>高滿意度</span>
                </div>
                <div>
                    <strong style="color:${accent.hex}">MKBF</strong>
                    <span>可靠度重點</span>
                </div>
            </div>
        `;
    }

    return `
        <div class="preview-slide cover-preview" style="background:${primary.hex}">
            <p>${template.eyebrow}</p>
            <h4>${template.title}</h4>
            <span>品牌應用提案 / 2026</span>
        </div>
    `;
}

function renderGeneratedPreview(state) {
    const preview = document.getElementById('generated-preview');
    if (!preview) return;

    preview.innerHTML = `
        <article class="decision-output" style="--preview-primary:${state.primary.hex}; --preview-accent:${state.accent.hex}; font-family:${state.font.stack}">
            <div class="preview-hero">
                <div>
                    <p class="eyebrow">Generated Brand Direction</p>
                    <h3>台北捷運品牌應用預覽</h3>
                    <p>依目前選擇組合產生，可用於初步比較視覺方向與簡報決策。</p>
                </div>
                <div class="preview-logo ${state.logo.className}">
                    台北捷運<br><span>Taipei Metro</span>
                </div>
            </div>
            <div class="preview-summary-grid">
                <section>
                    <h4>色卡決策</h4>
                    <div class="decision-swatches">
                        <span style="background:${state.primary.hex}"></span>
                        <div><strong>${state.primary.name}</strong><small>${state.primary.hex} · ${state.primary.usage}</small></div>
                    </div>
                    <div class="decision-swatches">
                        <span style="background:${state.accent.hex}"></span>
                        <div><strong>${state.accent.name}</strong><small>${state.accent.hex} · ${state.accent.usage}</small></div>
                    </div>
                </section>
                <section>
                    <h4>字體與 Logo</h4>
                    <p><strong>${state.font.label}</strong></p>
                    <p>${state.font.note}</p>
                    <p><strong>${state.logo.label}</strong>：${state.logo.note}</p>
                </section>
                <section>
                    <h4>簡報模板</h4>
                    <p><strong>${state.template.label}</strong></p>
                    <p>${state.template.detail}</p>
                </section>
            </div>
            ${createTemplatePreview(state.template, state.primary, state.accent)}
        </article>
    `;
}

function initDecisionGenerator() {
    const form = document.getElementById('brand-generator-form');
    if (!form) return;

    const primarySelect = document.getElementById('primaryColor');
    const accentSelect = document.getElementById('accentColor');

    populateColorSelect(primarySelect, '#0268B7');
    populateColorSelect(accentSelect, '#5ECBC3');

    updateSelectDot('primary-dot', '#0268B7');
    updateSelectDot('accent-dot', '#5ECBC3');

    renderGeneratedPreview(getDecisionState(form));

    // Live preview on any change
    form.addEventListener('change', () => {
        const state = getDecisionState(form);
        updateSelectDot('primary-dot', state.primary.hex);
        updateSelectDot('accent-dot', state.accent.hex);
        renderGeneratedPreview(state);
    });

    // Submit button still works (smooth scroll to preview)
    form.addEventListener('submit', event => {
        event.preventDefault();
        const state = getDecisionState(form);
        renderGeneratedPreview(state);
        document.getElementById('generated-preview').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

/* ─── Copy Color ─────────────────────────────────── */
async function copyColor(hex, name, swatch) {
    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(hex);
        } else {
            const ta = document.createElement('textarea');
            ta.value = hex;
            ta.style.cssText = 'position:fixed;opacity:0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
        }
        showToast(hex, name, true);
    } catch {
        showToast(hex, name, false);
    }
}

/* ─── Scroll Reveal ──────────────────────────────── */
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${i * 0.04}s`;
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    els.forEach(el => io.observe(el));
}

/* ─── Reading Progress Bar ───────────────────────── */
function initProgressBar() {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;

    function update() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
        bar.style.width = `${pct}%`;
        bar.setAttribute('aria-valuenow', pct);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
}

/* ─── Sticky Nav Active State ────────────────────── */
function initStickyNav() {
    const nav = document.querySelector('.sticky-nav');
    if (!nav) return;

    const links = nav.querySelectorAll('.nav-links a[data-section]');
    const sections = [...links].map(a => document.getElementById(a.dataset.section)).filter(Boolean);

    function update() {
        // Scrolled shadow
        nav.classList.toggle('scrolled', window.scrollY > 60);

        // Active link
        let current = null;
        const navH = nav.offsetHeight;

        sections.forEach(sec => {
            const top = sec.getBoundingClientRect().top - navH - 16;
            if (top <= 0) current = sec.id;
        });

        links.forEach(link => {
            link.classList.toggle('active', link.dataset.section === current);
        });
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
}

/* ─── Color Search ───────────────────────────────── */
function initColorSearch() {
    const searchInput = document.getElementById('color-search');
    if (!searchInput) return;

    let activeSortType = 'category';
    let searchTimeout;

    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            renderColors(activeSortType, searchInput.value);
        }, 180);
    });

    // Expose sort type for search integration
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            activeSortType = btn.dataset.sort;
        });
    });

    return {
        getSortType: () => activeSortType,
        getQuery: () => searchInput.value
    };
}

/* ─── Event Binding ──────────────────────────────── */
function bindEvents() {
    const searchCtrl = initColorSearch();

    // Sort buttons
    document.querySelectorAll('.sort-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            renderColors(button.dataset.sort, searchCtrl?.getQuery() || '');
        });
    });

    // Color copy & group collapse
    document.getElementById('color-display').addEventListener('click', event => {
        const header = event.target.closest('.group-header');
        if (header) {
            const grid = document.getElementById(header.getAttribute('aria-controls'));
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', String(!isExpanded));
            header.classList.toggle('collapsed', isExpanded);
            grid.classList.toggle('collapsed', isExpanded);
            return;
        }

        const swatch = event.target.closest('.color-swatch');
        if (swatch) copyColor(swatch.dataset.color, swatch.dataset.name, swatch);
    });

    // Keyboard: Enter on color swatch
    document.getElementById('color-display').addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            const swatch = event.target.closest('.color-swatch');
            if (swatch) copyColor(swatch.dataset.color, swatch.dataset.name, swatch);
        }
    });

    // Back to top
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ─── Init (see bottom of file) ─────────────────── */

/* ═══════════════════════════════════════════════════
   LAYOUT GENERATOR — pure JS, no API
   ═══════════════════════════════════════════════════ */

/* ─── Seed content data ──────────────────────────── */
const SEEDS = {
  ops: {
    label: '捷運行控中心',
    url: 'ops.trtc.internal',
    system: '列車運行監控系統 OCC',
    navItems: ['系統總覽','列車動態','班次管理','事件處置','通訊調度','系統設定'],
    kpis: [
      { label: '班次準點率', value: '98.7%', delta: '+0.3%', trend: 'up', color: '#006833' },
      { label: '目前行駛列車', value: '142', delta: '正常', trend: 'ok', color: '#0268B7' },
      { label: '今日客運人次', value: '2,184,670', delta: '+4.2%', trend: 'up', color: '#038288' },
      { label: '異常事件', value: '3', delta: '處理中', trend: 'warn', color: '#FC8561' },
    ],
    tasks: [
      { id:'T-0421', title:'板南線 BL12 轉轍器異常回報', priority:'high', status:'處理中', assignee:'陳志明', due:'14:30' },
      { id:'T-0420', title:'文湖線 BR18 空調系統定期保養', priority:'med', status:'排程中', assignee:'林美惠', due:'17:00' },
      { id:'T-0419', title:'淡水信義線 R22 號誌燈更換', priority:'low', status:'待確認', assignee:'王大偉', due:'明日' },
      { id:'T-0418', title:'中和新蘆線 O11 站電力巡查', priority:'med', status:'完成', assignee:'張家豪', due:'完成' },
      { id:'T-0417', title:'松山新店線 G09 廣播系統測試', priority:'low', status:'完成', assignee:'劉依婷', due:'完成' },
    ],
    alerts: [
      { type:'warn', time:'13:42', msg:'板南線 BL12 轉轍器回應延遲 >3s，已通報維修組' },
      { type:'info', time:'13:15', msg:'系統排程備份完成，版本 v4.12.3 → v4.12.4' },
      { type:'ok',   time:'12:58', msg:'文湖線全線班距恢復正常，事件 #0418 結案' },
    ],
    actions: ['新增事件報告','調整班次時刻','廣播系統測試','聯繫維修組','匯出行控日誌','緊急停車程序'],
    chartLabel: '今日各線準點率 (%)',
    chartData: [{ label:'板南', v: 99.1 },{ label:'淡水', v: 98.4 },{ label:'中和', v: 97.8 },{ label:'文湖', v: 98.9 },{ label:'松山', v: 98.5 },{ label:'新北投', v: 99.3 }],
    footerSys: 'OCC-MIS v4.12.4',
    footerContact: 'ops-support@trtc.gov.tw',
  },
  station: {
    label: '車站服務台',
    url: 'station.trtc.taipei',
    system: '車站旅客服務管理系統',
    navItems: ['服務台首頁','旅客協助','失物招領','設施狀況','班次查詢','每日報表'],
    kpis: [
      { label: '今日服務件數', value: '218', delta: '+12 今日', trend: 'up', color: '#0268B7' },
      { label: '平均等候時間', value: '2.4 分', delta: '-0.6 分', trend: 'up', color: '#006833' },
      { label: '失物件數', value: '7', delta: '待認領 5', trend: 'warn', color: '#FC8561' },
      { label: '設施異常', value: '1', delta: '電扶梯', trend: 'warn', color: '#FC8561' },
    ],
    tasks: [
      { id:'S-0892', title:'旅客協助：輪椅接送至月台 → 3 號出口', priority:'high', status:'進行中', assignee:'黃淑芬', due:'即刻' },
      { id:'S-0891', title:'失物招領：黑色雨傘，A2 閘口發現', priority:'low', status:'待認領', assignee:'系統', due:'-' },
      { id:'S-0890', title:'南側電扶梯 E2 異常停止，通報維修', priority:'high', status:'維修中', assignee:'技術組', due:'15:00' },
      { id:'S-0889', title:'外籍旅客路線諮詢 (英語)', priority:'low', status:'完成', assignee:'陳美玲', due:'完成' },
      { id:'S-0888', title:'無障礙廁所清潔通報', priority:'med', status:'完成', assignee:'清潔組', due:'完成' },
    ],
    alerts: [
      { type:'warn', time:'14:02', msg:'南側電扶梯 E2 緊急停止，維修組已抵達現場' },
      { type:'info', time:'13:30', msg:'今日下午尖峰預估客流量較昨日增加 18%' },
      { type:'ok',   time:'12:45', msg:'失物 S-0885 認領完成，旅客已簽收' },
    ],
    actions: ['新增服務記錄','登記失物','通報設施異常','叫無障礙協助','列印班次時刻','交班備忘錄'],
    chartLabel: '本週每日服務件數',
    chartData: [{ label:'一', v: 185 },{ label:'二', v: 204 },{ label:'三', v: 197 },{ label:'四', v: 218 },{ label:'五', v: 0 },{ label:'六', v: 0 }],
    footerSys: 'SVC-MIS v2.8.1',
    footerContact: 'station-support@trtc.gov.tw',
  },
  maintenance: {
    label: '維修排程系統',
    url: 'maint.trtc.internal',
    system: '設備維修管理系統 CMMS',
    navItems: ['維修首頁','工單管理','設備清冊','備料管理','排班表','績效報表'],
    kpis: [
      { label: '本月開立工單', value: '347', delta: '+23 本週', trend: 'up', color: '#0268B7' },
      { label: '完成率', value: '91.4%', delta: '+2.1%', trend: 'up', color: '#006833' },
      { label: '逾期工單', value: '11', delta: '-3 本週', trend: 'up', color: '#FC8561' },
      { label: '設備在線率', value: '99.1%', delta: '正常', trend: 'ok', color: '#038288' },
    ],
    tasks: [
      { id:'W-2241', title:'文湖線 BR04 車廂冷氣組年度保養', priority:'high', status:'進行中', assignee:'林技師', due:'16:00' },
      { id:'W-2240', title:'板南線 BL19 月台門感應器校正', priority:'high', status:'待派工', assignee:'未指派', due:'今日' },
      { id:'W-2239', title:'新店站高壓室年度絕緣測試', priority:'med', status:'排程中', assignee:'電力組', due:'下週一' },
      { id:'W-2238', title:'淡水線 R28 道岔定期潤滑作業', priority:'low', status:'完成', assignee:'軌道組', due:'完成' },
      { id:'W-2237', title:'中山站電梯 L3 門扇更換', priority:'med', status:'完成', assignee:'機電組', due:'完成' },
    ],
    alerts: [
      { type:'warn', time:'13:55', msg:'W-2240 板南線 BL19 月台門感應器尚未派工，請盡速處理' },
      { type:'info', time:'13:00', msg:'本月備料請購 P-4421 已核准，預計明日到貨' },
      { type:'ok',   time:'11:30', msg:'文湖線 BR11 冷媒回收作業完成，工單 W-2233 結案' },
    ],
    actions: ['新增工單','派工作業','申請備料','查詢設備歷程','列印作業程序','工時回報'],
    chartLabel: '本月工單完成趨勢',
    chartData: [{ label:'W1', v: 78 },{ label:'W2', v: 91 },{ label:'W3', v: 85 },{ label:'W4', v: 93 }],
    footerSys: 'CMMS v6.3.0',
    footerContact: 'maint-support@trtc.gov.tw',
  },
  passenger: {
    label: '旅客資訊系統',
    url: 'pis.metro.taipei',
    system: '旅客即時資訊顯示系統 PIS',
    navItems: ['資訊首頁','班次公告','路線地圖','票價查詢','站點設施','無障礙資訊'],
    kpis: [
      { label: '今日到站班次', value: '3,842', delta: '正常運行', trend: 'ok', color: '#0268B7' },
      { label: '即時人流（全線）', value: '89,240', delta: '中等', trend: 'ok', color: '#038288' },
      { label: '延誤公告', value: '0', delta: '全線正常', trend: 'ok', color: '#006833' },
      { label: '資訊看板在線', value: '1,847', delta: '/ 1,852 台', trend: 'ok', color: '#5C7EB8' },
    ],
    tasks: [
      { id:'P-0311', title:'板南線西門站顯示看板 D3 離線排查', priority:'high', status:'處理中', assignee:'資訊組', due:'15:30' },
      { id:'P-0310', title:'更新中和新蘆線 O05 站票價資訊', priority:'med', status:'待審核', assignee:'營運組', due:'今日' },
      { id:'P-0309', title:'新增端午連假加開班次公告', priority:'med', status:'排程中', assignee:'公關組', due:'明日' },
      { id:'P-0308', title:'淡水站多語公告英日語校對', priority:'low', status:'完成', assignee:'國際組', due:'完成' },
      { id:'P-0307', title:'全線 PIS 韌體更新 v3.4.1', priority:'low', status:'完成', assignee:'資訊組', due:'完成' },
    ],
    alerts: [
      { type:'warn', time:'13:48', msg:'西門站看板 D3 連線中斷 >10 分鐘，資訊組前往處理' },
      { type:'info', time:'13:00', msg:'週末加班車資訊已排程於 18:00 自動上架' },
      { type:'ok',   time:'12:20', msg:'全線 PIS 韌體更新完成，無異常回報' },
    ],
    actions: ['發布公告','更新班次資訊','管理看板分組','票價試算工具','無障礙路線查詢','旅遊套票管理'],
    chartLabel: '今日各時段入站人次（千人）',
    chartData: [{ label:'06', v: 12 },{ label:'08', v: 68 },{ label:'10', v: 45 },{ label:'12', v: 38 },{ label:'14', v: 31 },{ label:'17', v: 72 },{ label:'19', v: 55 },{ label:'21', v: 22 }],
    footerSys: 'PIS v3.4.1',
    footerContact: 'pis-support@trtc.gov.tw',
  },
  admin: {
    label: '行政管理後台',
    url: 'admin.trtc.gov.tw',
    system: '台北捷運行政管理資訊系統',
    navItems: ['管理首頁','人事管理','採購申請','公文流程','會議室預約','系統權限'],
    kpis: [
      { label: '本月採購申請', value: '42', delta: '待審核 8', trend: 'warn', color: '#FC8561' },
      { label: '公文待辦', value: '17', delta: '逾期 2', trend: 'warn', color: '#FC8561' },
      { label: '本週新進人員', value: '3', delta: '報到完成', trend: 'ok', color: '#006833' },
      { label: '會議室預約率', value: '78%', delta: '今日', trend: 'ok', color: '#0268B7' },
    ],
    tasks: [
      { id:'A-0671', title:'Q2 維修設備採購申請 — 待主管核簽', priority:'high', status:'待核簽', assignee:'林副理', due:'今日' },
      { id:'A-0670', title:'新進員工 3 人系統帳號開通', priority:'med', status:'進行中', assignee:'IT 組', due:'17:00' },
      { id:'A-0669', title:'年度考績評核說明會議室預約確認', priority:'low', status:'待確認', assignee:'人事組', due:'明日' },
      { id:'A-0668', title:'6 月份薪資造冊作業', priority:'high', status:'進行中', assignee:'財務組', due:'06/15' },
      { id:'A-0667', title:'資安例行掃描報告彙整', priority:'low', status:'完成', assignee:'資訊組', due:'完成' },
    ],
    alerts: [
      { type:'warn', time:'14:05', msg:'採購申請 A-0671 已逾待核期限 2 日，請主管儘速處理' },
      { type:'info', time:'13:20', msg:'系統排程備份已完成，下次備份排定明日 03:00' },
      { type:'ok',   time:'11:00', msg:'資安掃描完成，無重大風險項目，報告已存檔' },
    ],
    actions: ['新增採購申請','發送公文','預約會議室','開通系統帳號','請假申請','匯出人事報表'],
    chartLabel: '本月各類申請件數',
    chartData: [{ label:'採購', v: 42 },{ label:'公文', v: 31 },{ label:'請假', v: 88 },{ label:'會議', v: 54 },{ label:'加班', v: 23 }],
    footerSys: 'AMIS v5.1.2',
    footerContact: 'admin-support@trtc.gov.tw',
  },
};

/* ─── SVG Bar Chart builder ──────────────────────── */
function buildBarChart(data, label, primaryColor) {
  const W = 540, H = 160, PL = 36, PR = 12, PT = 12, PB = 32;
  const innerW = W - PL - PR;
  const innerH = H - PT - PB;
  const max = Math.max(...data.map(d => d.v)) * 1.15 || 1;
  const barW = Math.min(36, (innerW / data.length) * 0.6);
  const gap = innerW / data.length;

  const bars = data.map((d, i) => {
    const bh = (d.v / max) * innerH;
    const x = PL + gap * i + gap / 2 - barW / 2;
    const y = PT + innerH - bh;
    return `
      <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW}" height="${bh.toFixed(1)}"
            rx="3" fill="${primaryColor}" opacity="0.85"/>
      <text x="${(x + barW/2).toFixed(1)}" y="${(H - PB + 14).toFixed(1)}"
            text-anchor="middle" font-size="10" fill="#727171">${d.label}</text>
      <text x="${(x + barW/2).toFixed(1)}" y="${(y - 4).toFixed(1)}"
            text-anchor="middle" font-size="9" fill="${primaryColor}" font-weight="700">${d.v}</text>`;
  }).join('');

  return `<figure style="margin:0">
    <figcaption style="font-size:12px;color:#727171;font-weight:700;margin-bottom:6px">${label}</figcaption>
    <svg viewBox="0 0 ${W} ${H}" width="100%" style="overflow:visible" role="img" aria-label="${label}">
      <line x1="${PL}" y1="${PT}" x2="${PL}" y2="${PT+innerH}" stroke="#D9E2E7" stroke-width="1"/>
      <line x1="${PL}" y1="${PT+innerH}" x2="${W-PR}" y2="${PT+innerH}" stroke="#D9E2E7" stroke-width="1"/>
      ${bars}
    </svg>
  </figure>`;
}

/* ─── Module builders ────────────────────────────── */
function buildNav(seed, layout, primary) {
  const items = seed.navItems.map((n, i) =>
    `<a href="#" style="padding:8px 14px;border-radius:6px;font-size:13px;font-weight:700;
      color:${i===0 ? '#fff' : 'rgba(255,255,255,0.72)'};
      background:${i===0 ? 'rgba(255,255,255,0.15)' : 'transparent'};
      text-decoration:none;white-space:nowrap;transition:background .15s"
      onmouseover="this.style.background='rgba(255,255,255,0.12)'"
      onmouseout="this.style.background='${i===0 ? 'rgba(255,255,255,0.15)' : 'transparent'}'">${n}</a>`
  ).join('');

  if (layout === 'sidebar') {
    return `<nav style="width:220px;min-height:100vh;background:${primary};display:flex;flex-direction:column;gap:4px;padding:20px 12px;flex-shrink:0">
      <div style="color:#fff;font-weight:900;font-size:15px;margin-bottom:20px;padding:0 8px;letter-spacing:-.01em">
        台北捷運<br><span style="font-size:11px;opacity:.7;font-weight:500">${seed.system}</span>
      </div>
      ${seed.navItems.map((n, i) => `
        <a href="#" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;
          font-size:13px;font-weight:${i===0?'900':'700'};
          color:${i===0?'#fff':'rgba(255,255,255,.72)'};
          background:${i===0?'rgba(255,255,255,.15)':'transparent'};text-decoration:none;
          transition:background .15s">${n}</a>`).join('')}
    </nav>`;
  }

  return `<header style="background:${primary};padding:0 24px;display:flex;align-items:center;gap:16px;height:52px;flex-shrink:0;position:sticky;top:0;z-index:10">
    <div style="color:#fff;font-weight:900;font-size:14px;white-space:nowrap;margin-right:8px">台北捷運</div>
    <nav style="display:flex;align-items:center;gap:4px;overflow-x:auto;flex:1">${items}</nav>
    <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
      <div style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px">🔔</div>
      <div style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:900">林</div>
    </div>
  </header>`;
}

function buildDashboard(seed, primary, accent) {
  const priorityColor = { high:'#FC8561', med:'#FEBC2E', low:'#5ECBC3' };
  const trendIcon = { up:'↑', ok:'●', warn:'▲' };

  const kpiCards = seed.kpis.map(k => `
    <div style="padding:18px 20px;border:1px solid #D9E2E7;border-radius:10px;background:#fff;box-shadow:0 2px 8px rgba(20,89,141,.06)">
      <div style="font-size:11px;color:#727171;font-weight:700;margin-bottom:8px;letter-spacing:.04em;text-transform:uppercase">${k.label}</div>
      <div style="font-size:28px;font-weight:900;color:${k.color};line-height:1">${k.value}</div>
      <div style="margin-top:8px;font-size:12px;color:${k.trend==='warn'?'#FC8561':'#006833'};font-weight:700">
        ${trendIcon[k.trend]} ${k.delta}
      </div>
    </div>`).join('');

  return `<section style="margin-bottom:20px">
    <h2 style="margin:0 0 14px;font-size:15px;font-weight:900;color:#14598D">儀表板</h2>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px">${kpiCards}</div>
    <div style="padding:18px 20px;border:1px solid #D9E2E7;border-radius:10px;background:#fff;box-shadow:0 2px 8px rgba(20,89,141,.06)">
      ${buildBarChart(seed.chartData, seed.chartLabel, primary)}
    </div>
  </section>`;
}

function buildTasks(seed, accent) {
  const pc = { high:'#FC8561', med:'#FEBC2E', low:'#5ECBC3' };
  const pl = { high:'高', med:'中', low:'低' };
  const sc = { '處理中':'#0268B7', '進行中':'#0268B7', '排程中':'#727171', '待確認':'#FEBC2E', '待認領':'#FEBC2E', '待派工':'#FC8561', '待核簽':'#FC8561', '待審核':'#FEBC2E', '維修中':'#FC8561', '完成':'#006833' };

  const taskRows = seed.tasks.map(t => `
    <tr style="border-bottom:1px solid #F4F4F4">
      <td style="padding:11px 12px;font-size:12px;color:#727171;font-family:monospace;white-space:nowrap">${t.id}</td>
      <td style="padding:11px 12px;font-size:13px;font-weight:500;color:#3C3C3C">${t.title}</td>
      <td style="padding:11px 12px">
        <span style="display:inline-block;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:700;background:${pc[t.priority]}22;color:${pc[t.priority]}">${pl[t.priority]}</span>
      </td>
      <td style="padding:11px 12px">
        <span style="display:inline-block;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:700;background:${(sc[t.status]||'#727171')}18;color:${sc[t.status]||'#727171'}">${t.status}</span>
      </td>
      <td style="padding:11px 12px;font-size:12px;color:#727171">${t.assignee}</td>
      <td style="padding:11px 12px;font-size:12px;color:#727171;white-space:nowrap">${t.due}</td>
    </tr>`).join('');

  const alertIcons = { warn:'⚠', info:'ℹ', ok:'✓' };
  const alertColors = { warn:'#FC8561', info:'#0268B7', ok:'#006833' };
  const alertBg = { warn:'#FFF3EE', info:'#EEF4FB', ok:'#EEFBF4' };

  const alertItems = seed.alerts.map(a => `
    <div style="display:flex;align-items:flex-start;gap:10px;padding:10px 14px;border-radius:8px;background:${alertBg[a.type]};margin-bottom:8px">
      <span style="font-size:14px;color:${alertColors[a.type]};flex-shrink:0;margin-top:1px">${alertIcons[a.type]}</span>
      <div>
        <span style="font-size:11px;color:#727171;font-weight:700">${a.time}</span>
        <p style="margin:2px 0 0;font-size:13px;color:#3C3C3C;line-height:1.4">${a.msg}</p>
      </div>
    </div>`).join('');

  return `<section style="margin-bottom:20px;display:grid;grid-template-columns:1fr 300px;gap:16px;align-items:start">
    <div style="border:1px solid #D9E2E7;border-radius:10px;background:#fff;box-shadow:0 2px 8px rgba(20,89,141,.06);overflow:hidden">
      <div style="padding:14px 16px;border-bottom:1px solid #D9E2E7;display:flex;justify-content:space-between;align-items:center">
        <h2 style="margin:0;font-size:15px;font-weight:900;color:#14598D">任務清單</h2>
        <span style="font-size:12px;color:#727171">${seed.tasks.length} 筆</span>
      </div>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;min-width:540px">
          <thead><tr style="background:#F7FAFB;border-bottom:1px solid #D9E2E7">
            <th style="padding:9px 12px;text-align:left;font-size:11px;font-weight:700;color:#727171;white-space:nowrap">工單編號</th>
            <th style="padding:9px 12px;text-align:left;font-size:11px;font-weight:700;color:#727171">任務說明</th>
            <th style="padding:9px 12px;text-align:left;font-size:11px;font-weight:700;color:#727171">優先</th>
            <th style="padding:9px 12px;text-align:left;font-size:11px;font-weight:700;color:#727171">狀態</th>
            <th style="padding:9px 12px;text-align:left;font-size:11px;font-weight:700;color:#727171">負責人</th>
            <th style="padding:9px 12px;text-align:left;font-size:11px;font-weight:700;color:#727171">截止</th>
          </tr></thead>
          <tbody>${taskRows}</tbody>
        </table>
      </div>
    </div>
    <div style="border:1px solid #D9E2E7;border-radius:10px;background:#fff;box-shadow:0 2px 8px rgba(20,89,141,.06)">
      <div style="padding:14px 16px;border-bottom:1px solid #D9E2E7">
        <h2 style="margin:0;font-size:15px;font-weight:900;color:#14598D">系統通知</h2>
      </div>
      <div style="padding:14px">${alertItems}</div>
    </div>
  </section>`;
}

function buildActions(seed, primary, accent) {
  const icons = ['📋','📡','🔧','📞','📊','🚨','📁','🗓','🔍','📤'];
  const cards = seed.actions.map((a, i) => `
    <button style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px 12px;
      border:1.5px solid #D9E2E7;border-radius:10px;background:#fff;cursor:pointer;
      font-family:inherit;font-size:13px;font-weight:700;color:#14598D;text-align:center;
      transition:border-color .15s,box-shadow .15s;width:100%"
      onmouseover="this.style.borderColor='${accent}';this.style.boxShadow='0 4px 12px rgba(20,89,141,.12)'"
      onmouseout="this.style.borderColor='#D9E2E7';this.style.boxShadow='none'">
      <span style="font-size:22px">${icons[i % icons.length]}</span>
      ${a}
    </button>`).join('');

  return `<section style="margin-bottom:20px">
    <h2 style="margin:0 0 14px;font-size:15px;font-weight:900;color:#14598D">快速操作</h2>
    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px">${cards}</div>
  </section>`;
}

function buildFooter(seed, primary) {
  const now = new Date();
  const ts = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  return `<footer style="margin-top:8px;padding:16px 24px;border-top:1px solid #D9E2E7;background:#F7FAFB;border-radius:0 0 10px 10px">
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px">
      <div style="display:flex;gap:20px;flex-wrap:wrap">
        <span style="font-size:12px;color:#727171">系統版本：<strong style="color:#3C3C3C">${seed.footerSys}</strong></span>
        <span style="font-size:12px;color:#727171">最後同步：<strong style="color:#3C3C3C">${ts}</strong></span>
        <span style="font-size:12px;color:#727171">系統管理員：<a href="mailto:${seed.footerContact}" style="color:${primary};text-decoration:none;font-weight:700">${seed.footerContact}</a></span>
      </div>
      <span style="font-size:11px;color:#727171">© 台北大眾捷運股份有限公司 · 僅供內部使用</span>
    </div>
  </footer>`;
}

/* ─── Layout assemblers ──────────────────────────── */
const ACCENT_PAIRS = [
  { primary: '#0268B7', accent: '#5ECBC3' },
  { primary: '#14598D', accent: '#038288' },
  { primary: '#25587F', accent: '#029F67' },
  { primary: '#038288', accent: '#0268B7' },
  { primary: '#295989', accent: '#5ECBC3' },
];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function buildSidebarLayout(seed, modules, primary, accent) {
  const parts = [];
  if (modules.has('dashboard')) parts.push(buildDashboard(seed, primary, accent));
  if (modules.has('tasks'))     parts.push(buildTasks(seed, accent));
  if (modules.has('actions'))   parts.push(buildActions(seed, primary, accent));
  if (modules.has('footer'))    parts.push(buildFooter(seed, primary));

  const nav = modules.has('nav') ? buildNav(seed, 'sidebar', primary) : '';

  return `<!DOCTYPE html><html lang="zh-Hant-TW"><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif;background:#EEF3F7;color:#3C3C3C;min-height:100vh;display:flex}</style>
  </head><body>
    ${nav}
    <div style="flex:1;overflow:auto">
      ${modules.has('nav') ? `<div style="padding:12px 24px 0;display:flex;align-items:center;gap:8px">
        <span style="font-size:12px;color:#727171">首頁</span><span style="font-size:12px;color:#727171">/</span>
        <span style="font-size:12px;color:#0268B7;font-weight:700">${seed.navItems[0]}</span>
      </div>` : ''}
      <main style="padding:16px 24px 24px">${parts.join('')}</main>
    </div>
  </body></html>`;
}

function buildTopNavLayout(seed, modules, primary, accent) {
  const parts = [];
  if (modules.has('dashboard')) parts.push(buildDashboard(seed, primary, accent));
  if (modules.has('tasks'))     parts.push(buildTasks(seed, accent));
  if (modules.has('actions'))   parts.push(buildActions(seed, primary, accent));
  if (modules.has('footer'))    parts.push(buildFooter(seed, primary));

  const nav = modules.has('nav') ? buildNav(seed, 'topnav', primary) : '';

  return `<!DOCTYPE html><html lang="zh-Hant-TW"><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif;background:#EEF3F7;color:#3C3C3C;min-height:100vh}</style>
  </head><body>
    ${nav}
    <main style="padding:20px 28px 28px;max-width:1280px;margin:0 auto">${parts.join('')}</main>
  </body></html>`;
}

function buildSplitLayout(seed, modules, primary, accent) {
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  // Left panel: nav + quick actions; Right panel: dashboard + tasks
  const leftNav = modules.has('nav') ? `
    <nav style="padding:16px 12px;border-bottom:1px solid rgba(255,255,255,.12);margin-bottom:12px">
      <div style="color:#fff;font-weight:900;font-size:14px;padding:0 8px;margin-bottom:16px">台北捷運<br><span style="font-size:10px;opacity:.7;font-weight:500">${seed.system}</span></div>
      ${seed.navItems.map((n,i) => `<a href="#" style="display:block;padding:9px 12px;border-radius:7px;font-size:13px;font-weight:700;color:${i===0?'#fff':'rgba(255,255,255,.7)'};background:${i===0?'rgba(255,255,255,.14)':'transparent'};text-decoration:none;margin-bottom:2px">${n}</a>`).join('')}
    </nav>` : '';

  const leftActions = modules.has('actions') ? `
    <div style="padding:14px 12px">
      <p style="font-size:11px;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:10px;letter-spacing:.06em;text-transform:uppercase">快速操作</p>
      ${seed.actions.map(a => `<button style="display:block;width:100%;text-align:left;padding:8px 12px;border-radius:7px;border:none;background:rgba(255,255,255,.08);color:rgba(255,255,255,.85);font-size:12px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:6px;transition:background .15s" onmouseover="this.style.background='rgba(255,255,255,.16)'" onmouseout="this.style.background='rgba(255,255,255,.08)'">${a}</button>`).join('')}
    </div>` : '';

  const rightParts = [];
  if (modules.has('dashboard')) rightParts.push(buildDashboard(seed, primary, accent));
  if (modules.has('tasks'))     rightParts.push(buildTasks(seed, accent));
  if (modules.has('footer'))    rightParts.push(buildFooter(seed, primary));

  const statusBar = modules.has('nav') ? `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 20px;background:${primary};border-bottom:1px solid rgba(255,255,255,.1)">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:8px;height:8px;border-radius:50%;background:#5ECBC3;animation:pulse 2s infinite"></div>
        <span style="font-size:12px;color:rgba(255,255,255,.8);font-weight:700">${seed.system}</span>
      </div>
      <div style="display:flex;align-items:center;gap:14px">
        <span style="font-size:12px;color:rgba(255,255,255,.6)">🔔 通知</span>
        <span style="font-size:12px;color:rgba(255,255,255,.6)">系統時間 ${ts}</span>
        <div style="width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:900">林</div>
      </div>
    </div>` : '';

  return `<!DOCTYPE html><html lang="zh-Hant-TW"><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif;background:#EEF3F7;color:#3C3C3C;min-height:100vh;display:flex;flex-direction:column}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}</style>
  </head><body>
    ${statusBar}
    <div style="display:flex;flex:1;overflow:hidden">
      <aside style="width:210px;background:${primary};display:flex;flex-direction:column;overflow-y:auto;flex-shrink:0">${leftNav}${leftActions}</aside>
      <main style="flex:1;overflow-y:auto;padding:20px 24px 24px">${rightParts.join('')}</main>
    </div>
  </body></html>`;
}

/* ─── Generator Controller ───────────────────────── */
function initLayoutGenerator() {
  const genBtn   = document.getElementById('lgen-generate-btn');
  const copyBtn  = document.getElementById('lgen-copy-btn');
  const badge    = document.getElementById('lgen-badge');
  const frame    = document.getElementById('lgen-frame');
  const empty    = document.getElementById('lgen-empty');
  const browser  = document.getElementById('lgen-browser');
  const urlEl    = document.getElementById('lgen-browser-url');

  if (!genBtn) return;

  let activeSeed = 'ops';
  let activeLayouts = new Set(['sidebar','topnav','split']);
  let currentHTML = '';

  // Seed selection
  document.getElementById('lgen-seeds').addEventListener('click', e => {
    const btn = e.target.closest('[data-seed]');
    if (!btn) return;
    document.querySelectorAll('[data-seed]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeSeed = btn.dataset.seed;
  });

  // Layout multi-toggle
  document.getElementById('lgen-layouts').addEventListener('click', e => {
    const btn = e.target.closest('[data-layout]');
    if (!btn) return;
    const lay = btn.dataset.layout;
    if (activeLayouts.has(lay)) {
      if (activeLayouts.size <= 1) return; // keep at least one
      activeLayouts.delete(lay);
      btn.classList.remove('active');
    } else {
      activeLayouts.add(lay);
      btn.classList.add('active');
    }
  });

  // Generate
  genBtn.addEventListener('click', () => {
    const seed = SEEDS[activeSeed];
    const layoutArr = [...activeLayouts];
    const layout = pick(layoutArr);
    const { primary, accent } = pick(ACCENT_PAIRS);

    // Active modules
    const modules = new Set(
      [...document.querySelectorAll('#lgen-modules input:checked')].map(i => i.value)
    );
    if (modules.size === 0) modules.add('dashboard'); // safety

    let html = '';
    if (layout === 'sidebar')  html = buildSidebarLayout(seed, modules, primary, accent);
    if (layout === 'topnav')   html = buildTopNavLayout(seed, modules, primary, accent);
    if (layout === 'split')    html = buildSplitLayout(seed, modules, primary, accent);

    currentHTML = html;
    frame.srcdoc = html;

    empty.style.display = 'none';
    browser.style.display = 'flex';
    browser.style.flexDirection = 'column';
    urlEl.textContent = seed.url;

    copyBtn.style.display = '';
    badge.style.display = '';
    badge.textContent = `${seed.label} · ${layout === 'sidebar' ? '側邊欄式' : layout === 'topnav' ? '頂部導覽式' : '分割面板式'}`;

    showToast(primary, `版型已產生：${seed.label}`, true);
  });

  // Copy HTML
  copyBtn.addEventListener('click', async () => {
    if (!currentHTML) return;
    try {
      await navigator.clipboard.writeText(currentHTML);
      copyBtn.textContent = '✓ 已複製';
      setTimeout(() => { copyBtn.textContent = '複製 HTML'; }, 2000);
    } catch { /* silent */ }
  });
}

/* ─── Bootstrap ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderColors('category');
  initDecisionGenerator();
  bindEvents();
  initScrollReveal();
  initProgressBar();
  initStickyNav();
  initLayoutGenerator();   // ← new
});