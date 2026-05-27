// 原始顏色列表
const colors = [
    '#0268b7', '#f4f4f4', '#5ECBC3', '#25587F', '#5c7eb8',
    '#0079b0', '#727171', '#295989', '#006833', '#007AB0',
    '#FC8561', '#14598D', '#3C3C3C', '#66BB6A', '#4CAF50',
    '#2ECC71', '#3CB371'
];

// 移除重複的顏色（使用 Set 保留唯一值）
const uniqueColors = [...new Set(colors)];

/**
 * 將十六進位色碼轉換成 HSV 格式
 */
function hexToHsv(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

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

    const s = max === 0 ? 0 : delta / max;
    const v = max;

    return {
        h: h,
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

/**
 * 根據色碼取得顏色名稱（自訂對應表）
 */
function getColorName(hex) {
    const colorNames = {
        '#0268B7': '深藍',
        '#F4F4F4': '淺灰',
        '#5ECBC3': '薄荷綠',
        '#25587F': '暗藍',
        '#5C7EB8': '柔和藍',
        '#0079B0': '中藍',
        '#727171': '中灰',
        '#295989': '鋼藍',
        '#006833': '深綠',
        '#007AB0': '天藍',
        '#FC8561': '珊瑚橙',
        '#14598D': '深鋼藍',
        '#3C3C3C': '深灰',
        '#3CB371': '中海綠',
        '#2ECC71': '翡翠綠',
        '#4CAF50': '材料設計綠',
        '#66BB6A': '淺綠色',
    };
    return colorNames[hex.toUpperCase()] || '未知顏色';
}

/**
 * 根據 HSV 的色相/彩度分類為色系
 */
function getColorCategory(hex) {
    const hsv = hexToHsv(hex);
    const h = hsv.h;
    const s = hsv.s;
    const v = hsv.v;

    // 彩度過低視為灰色
    if (s < 20) return 'grays';

    // 根據色相角度分類色系
    if (h >= 0 && h < 30) return 'reds';
    if (h >= 30 && h < 60) return 'oranges';
    if (h >= 60 && h < 120) return 'greens';
    if (h >= 120 && h < 180) return 'cyans';
    if (h >= 180 && h < 240) return 'blues';
    if (h >= 240 && h < 300) return 'purples';
    if (h >= 300 && h < 360) return 'magentas';

    return 'others'; // 無法分類者
}

/**
 * 將分類代號轉換為中文名稱
 */
function getCategoryName(category) {
    const names = {
        'reds': '紅色系',
        'oranges': '橙色系',
        'greens': '綠色系',
        'cyans': '青色系',
        'blues': '藍色系',
        'purples': '紫色系',
        'magentas': '洋紅系',
        'grays': '灰色系',
        'others': '其他色系'
    };
    return names[category] || '未分類';
}

/**
 * 根據顏色建立顯示卡片的 HTML（注意：此處 template string 應包在 backtick ` 內）
 */
function createColorCard(hex) {
    const hsv = hexToHsv(hex);
    const name = getColorName(hex);

    return `
        <div class="color-card">
            <div class="color-block" style="background-color: ${hex}" onclick="copyToClipboard('${hex}', this)">
                <div class="copy-message">已複製!</div>
            </div>
            <div class="color-info">
                <div class="color-code">${hex.toUpperCase()}</div>
                <div class="color-name">${name}</div>
                <div class="hsv-info">
                    <div class="hsv-item"><div>H</div><div>${hsv.h}°</div></div>
                    <div class="hsv-item"><div>S</div><div>${hsv.s}%</div></div>
                    <div class="hsv-item"><div>V</div><div>${hsv.v}%</div></div>
                </div>
            </div>
        </div>
    `;
}

/**
 * 顏色排序與顯示邏輯
 */
function sortColors(sortType) {
    // 更新按鈕樣式
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const display = document.getElementById('color-display');

    if (sortType === 'category') {
        // 分類顯示
        const categorized = {};
        uniqueColors.forEach(color => {
            const category = getColorCategory(color);
            if (!categorized[category]) categorized[category] = [];
            categorized[category].push(color);
        });

        let html = '';
        Object.keys(categorized).sort().forEach(category => {
            if (categorized[category].length > 0) {
                html += `
                    <div class="color-group">
                        <div class="group-header" onclick="toggleGroup('${category}')">
                            <div class="group-title">${getCategoryName(category)} (${categorized[category].length})</div>
                            <div class="toggle-icon">▼</div>
                        </div>
                        <div class="color-grid" id="${category}">
                            ${categorized[category].map(color => createColorCard(color)).join('')}
                        </div>
                    </div>
                `;
            }
        });
        display.innerHTML = html;
    } else {
        // 單一排序（色相/明度/彩度）
        let sortedColors = [...uniqueColors];
        let title = '';

        if (sortType === 'hue') {
            sortedColors.sort((a, b) => hexToHsv(a).h - hexToHsv(b).h);
            title = '按色相排序 (Hue)';
        } else if (sortType === 'brightness') {
            sortedColors.sort((a, b) => hexToHsv(b).v - hexToHsv(a).v);
            title = '按明度排序 (Brightness)';
        } else if (sortType === 'saturation') {
            sortedColors.sort((a, b) => hexToHsv(b).s - hexToHsv(a).s);
            title = '按彩度排序 (Saturation)';
        }

        const html = `
            <div class="color-group">
                <div class="group-header" onclick="toggleGroup('sorted')">
                    <div class="group-title">${title} (${sortedColors.length})</div>
                    <div class="toggle-icon">▼</div>
                </div>
                <div class="color-grid" id="sorted">
                    ${sortedColors.map(color => createColorCard(color)).join('')}
                </div>
            </div>
        `;
        display.innerHTML = html;
    }
}

/**
 * 展開或收合顏色群組
 */
function toggleGroup(groupId) {
    const grid = document.getElementById(groupId);
    const header = grid.previousElementSibling;

    grid.classList.toggle('collapsed');
    header.classList.toggle('collapsed');
}

/**
 * 點擊色塊後複製 HEX 代碼至剪貼簿，顯示提示訊息
 */
function copyToClipboard(color, element) {
    navigator.clipboard.writeText(color).then(() => {
        const message = element.querySelector('.copy-message');
        message.classList.add('show');
        setTimeout(() => {
            message.classList.remove('show');
        }, 1500);
    }).catch(() => {
        // 例外處理：無法複製時也提示
        const message = element.querySelector('.copy-message');
        message.textContent = '點擊複製';
        message.classList.add('show');
        setTimeout(() => {
            message.classList.remove('show');
            message.textContent = '已複製!';
        }, 1500);
    });
}

/**
 * 初始化顯示：頁面載入後預設用「分類方式」顯示顏色
 */
document.addEventListener('DOMContentLoaded', function () {
    sortColors('category');
});

/**
 * 顯示「回到頂部」按鈕與滾動事件
 */
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');

    // 滾動超過一定距離後顯示按鈕
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // 點擊按鈕時平滑滾動回頂部
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
