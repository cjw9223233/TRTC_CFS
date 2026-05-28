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

function hexToHsv(hex) {
    const normalizedHex = hex.replace('#', '');
    const r = parseInt(normalizedHex.slice(0, 2), 16) / 255;
    const g = parseInt(normalizedHex.slice(2, 4), 16) / 255;
    const b = parseInt(normalizedHex.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let h = 0;

    if (delta !== 0) {
        if (max === r) h = ((g - b) / delta) % 6;
        if (max === g) h = (b - r) / delta + 2;
        if (max === b) h = (r - g) / delta + 4;
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

    if (s < 20) return 'grays';
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

function createColorCard(color) {
    const hsv = hexToHsv(color.hex);
    const card = document.createElement('article');
    card.className = 'color-card';

    const button = document.createElement('button');
    button.className = 'color-swatch';
    button.type = 'button';
    button.style.backgroundColor = color.hex;
    button.dataset.color = color.hex;
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

function createGroup(title, colors, id) {
    const group = document.createElement('section');
    group.className = 'color-group';

    const header = document.createElement('button');
    header.className = 'group-header';
    header.type = 'button';
    header.setAttribute('aria-expanded', 'true');
    header.setAttribute('aria-controls', id);
    header.innerHTML = `<span>${title} (${colors.length})</span><span class="toggle-icon" aria-hidden="true">▼</span>`;

    const grid = document.createElement('div');
    grid.className = 'color-grid';
    grid.id = id;
    colors.forEach(color => grid.appendChild(createColorCard(color)));

    group.append(header, grid);
    return group;
}

function renderColors(sortType = 'category') {
    const display = document.getElementById('color-display');
    display.replaceChildren();

    if (sortType === 'category') {
        const groups = palette.reduce((acc, color) => {
            const category = getColorCategory(color);
            acc[category] = acc[category] || [];
            acc[category].push(color);
            return acc;
        }, {});

        Object.keys(categoryNames).forEach(category => {
            if (groups[category]?.length) {
                display.appendChild(createGroup(categoryNames[category], groups[category], `palette-${category}`));
            }
        });
        return;
    }

    const titles = {
        hue: '依色相排序',
        brightness: '依明度排序',
        saturation: '依彩度排序'
    };
    display.appendChild(createGroup(titles[sortType], sortPalette(sortType), `palette-${sortType}`));
}

function getColorByHex(hex) {
    return palette.find(color => color.hex === hex) || palette[0];
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
                        <div><strong>${state.primary.name}</strong><small>${state.primary.hex} / ${state.primary.usage}</small></div>
                    </div>
                    <div class="decision-swatches">
                        <span style="background:${state.accent.hex}"></span>
                        <div><strong>${state.accent.name}</strong><small>${state.accent.hex} / ${state.accent.usage}</small></div>
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

    populateColorSelect(document.getElementById('primaryColor'), '#0268B7');
    populateColorSelect(document.getElementById('accentColor'), '#5ECBC3');
    renderGeneratedPreview(getDecisionState(form));

    form.addEventListener('submit', event => {
        event.preventDefault();
        renderGeneratedPreview(getDecisionState(form));
        document.getElementById('generated-preview').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

async function copyColor(hex, swatch) {
    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(hex);
        } else {
            const input = document.createElement('textarea');
            input.value = hex;
            input.setAttribute('readonly', '');
            input.style.position = 'fixed';
            input.style.opacity = '0';
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            input.remove();
        }

        const message = swatch.querySelector('.copy-message');
        message.textContent = '已複製';
        message.classList.add('show');
        setTimeout(() => message.classList.remove('show'), 1200);
    } catch {
        const message = swatch.querySelector('.copy-message');
        message.textContent = '複製失敗';
        message.classList.add('show');
        setTimeout(() => message.classList.remove('show'), 1200);
    }
}

function bindEvents() {
    document.querySelectorAll('.sort-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderColors(button.dataset.sort);
        });
    });

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
        if (swatch) copyColor(swatch.dataset.color, swatch);
    });

    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 300);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderColors('category');
    initDecisionGenerator();
    bindEvents();
});
