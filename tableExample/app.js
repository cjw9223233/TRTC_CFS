
// 全域變數
let currentData = [];
let originalData = [];
let stickyColumnsEnabled = true;
let sortState = {}; // 儲存每個欄位的排序狀態

// 欄位定義
const columnDefinitions = [
    { key: 'empId', name: '員工ID', type: 'id' },
    { key: 'name', name: '姓名', type: 'text' },
    { key: 'department', name: '部門', type: 'text' },
    { key: 'position', name: '職位', type: 'text' },
    { key: 'email', name: '電子郵件', type: 'email' },
    { key: 'phone', name: '電話', type: 'phone' },
    { key: 'hireDate', name: '入職日期', type: 'date' },
    { key: 'salary', name: '薪資', type: 'currency' },
    { key: 'age', name: '年齡', type: 'number' },
    { key: 'experience', name: '工作經驗', type: 'number' }
];

// 生成更多欄位（總共105個）
for (let i = 11; i <= 105; i++) {
    const fieldTypes = ['績效評分', '專案參與', '培訓時數', '出勤率', '客戶滿意度', '技能評估', '團隊合作', '創新能力', '領導力', '溝通能力'];
    const fieldType = fieldTypes[i % fieldTypes.length];
    columnDefinitions.push({
        key: `field${i}`,
        name: `${fieldType}${Math.floor(i / 10)}`,
        type: 'number'
    });
}

// 生成隨機資料
function generateRandomData(count) {
    const data = [];
    const departments = ['研發部', '銷售部', '行政部', '人事部', '財務部', '市場部', '客服部', '生產部', '品管部', '資訊部'];
    const positions = ['經理', '主任', '專員', '助理', '工程師', '分析師', '顧問', '總監', '副理', '組長'];
    const names = ['王小明', '李美華', '陳大偉', '劉志強', '黃淑芬', '張國華', '林雅婷', '吳建民', '周文凱', '鄭雅雯'];

    for (let i = 1; i <= count; i++) {
        const record = {
            empId: `EMP${String(i).padStart(4, '0')}`,
            name: names[Math.floor(Math.random() * names.length)] + i,
            department: departments[Math.floor(Math.random() * departments.length)],
            position: positions[Math.floor(Math.random() * positions.length)],
            email: `emp${i}@company.com`,
            phone: `09${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
            hireDate: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
            salary: Math.floor(Math.random() * 50000) + 30000,
            age: Math.floor(Math.random() * 30) + 25,
            experience: Math.floor(Math.random() * 10) + 1
        };

        // 生成其他欄位的隨機數據
        for (let j = 11; j <= 105; j++) {
            record[`field${j}`] = Math.floor(Math.random() * 100) + 1;
        }

        data.push(record);
    }

    return data;
}

// 設定固定欄位
function setupStickyColumns(stickyCount) {
    const table = document.getElementById('dataTable');
    const rows = table.querySelectorAll('tr');

    // 清除現有的固定欄位
    table.querySelectorAll('.sticky-column').forEach(cell => {
        cell.classList.remove('sticky-column', 'header');
        cell.style.left = '';
        cell.style.zIndex = '';
        cell.style.top = '';
    });

    if (!stickyColumnsEnabled || stickyCount === 0) return;

    let leftPosition = 0;

    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        leftPosition = 0;

        for (let i = 0; i < Math.min(stickyCount, cells.length); i++) {
            if (cells[i]) {
                cells[i].classList.add('sticky-column');
                cells[i].style.left = leftPosition + 'px';

                if (row.parentNode.tagName === 'THEAD') {
                    // 固定表頭：同時固定垂直和水平位置
                    cells[i].classList.add('header');
                    cells[i].style.top = '0px';
                    cells[i].style.zIndex = 1000 - i; // 最左邊的欄位層級最高
                } else {
                    // 固定資料欄位：只固定水平位置
                    cells[i].style.zIndex = 10 - i;
                }

                leftPosition += cells[i].offsetWidth;
            }
        }
    });

    // 確保非固定的表頭也保持在頂部
    const headerCells = table.querySelectorAll('thead th:not(.sticky-column)');
    headerCells.forEach(cell => {
        cell.style.position = 'sticky';
        cell.style.top = '0px';
        cell.style.zIndex = '100';
    });
}

// 渲染表格
function renderTable(data) {
    const tableHead = document.getElementById('tableHead');
    const tableBody = document.getElementById('tableBody');

    // 渲染表頭
    const headerRow = document.createElement('tr');
    columnDefinitions.forEach((col, index) => {
        const th = document.createElement('th');
        th.setAttribute('data-key', col.key);
        th.setAttribute('data-index', index);

        // 創建排序表頭結構
        const sortHeader = document.createElement('div');
        sortHeader.className = 'sort-header';

        const columnText = document.createElement('span');
        columnText.textContent = col.name;

        const sortIcons = document.createElement('div');
        sortIcons.className = 'sort-icons';
        sortIcons.innerHTML = `
                    <span class="sort-icon up">▲</span>
                    <span class="sort-icon down">▼</span>
                `;

        sortHeader.appendChild(columnText);
        sortHeader.appendChild(sortIcons);
        th.appendChild(sortHeader);

        // 設定排序狀態
        if (sortState[col.key]) {
            sortHeader.classList.add('sorted', sortState[col.key]);
        }

        if (col.type === 'id') {
            th.classList.add('id-column');
        }

        // 添加點擊事件
        th.addEventListener('click', () => sortByColumn(col.key, index));

        headerRow.appendChild(th);
    });
    tableHead.innerHTML = '';
    tableHead.appendChild(headerRow);

    // 渲染表格內容
    tableBody.innerHTML = '';
    data.forEach(record => {
        const row = document.createElement('tr');
        columnDefinitions.forEach(col => {
            const td = document.createElement('td');
            let value = record[col.key];

            // 根據類型格式化數據
            switch (col.type) {
                case 'currency':
                    value = `NT$ ${value.toLocaleString()}`;
                    break;
                case 'number':
                    value = value.toLocaleString();
                    break;
                case 'date':
                    value = new Date(value).toLocaleDateString('zh-TW');
                    break;
                case 'id':
                    td.classList.add('id-column');
                    break;
            }

            td.textContent = value;
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    });

    // 設定固定欄位
    const stickyCount = parseInt(document.getElementById('stickyCount').value);
    setTimeout(() => setupStickyColumns(stickyCount), 100);
}

// 生成表格
function generateTable() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const dataTable = document.getElementById('dataTable');
    const recordCount = parseInt(document.getElementById('recordCount').value);

    // 顯示載入指示器
    loadingIndicator.style.display = 'block';
    dataTable.style.display = 'none';

    // 清除排序狀態
    sortState = {};

    // 模擬載入延遲
    setTimeout(() => {
        originalData = generateRandomData(recordCount);
        currentData = [...originalData];

        renderTable(currentData);
        updateTableInfo();

        loadingIndicator.style.display = 'none';
        dataTable.style.display = 'table';
    }, 1000);
}

// 切換固定欄位
function toggleStickyColumns() {
    stickyColumnsEnabled = !stickyColumnsEnabled;
    const stickyCount = stickyColumnsEnabled ? parseInt(document.getElementById('stickyCount').value) : 0;
    setupStickyColumns(stickyCount);
    updateTableInfo();
}

// 清除固定欄位
function clearStickyColumns() {
    stickyColumnsEnabled = false;
    const table = document.getElementById('dataTable');

    // 清除所有固定欄位樣式
    table.querySelectorAll('.sticky-column').forEach(cell => {
        cell.classList.remove('sticky-column', 'header');
        cell.style.left = '';
        cell.style.zIndex = '';
        cell.style.top = '';
    });

    // 重新設定非固定表頭的 sticky 屬性
    const headerCells = table.querySelectorAll('thead th');
    headerCells.forEach(cell => {
        cell.style.position = 'sticky';
        cell.style.top = '0px';
        cell.style.zIndex = '100';
    });

    updateTableInfo();
}

// 搜尋表格
function searchTable() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    if (searchTerm === '') {
        currentData = [...originalData];
    } else {
        currentData = originalData.filter(record => {
            return Object.values(record).some(value =>
                value.toString().toLowerCase().includes(searchTerm)
            );
        });
    }

    // 保持當前排序狀態
    if (Object.keys(sortState).length > 0) {
        const currentSortKey = Object.keys(sortState)[0];
        const currentSortDirection = sortState[currentSortKey];
        const columnDef = columnDefinitions.find(col => col.key === currentSortKey);

        currentData.sort((a, b) => {
            let aValue = a[currentSortKey];
            let bValue = b[currentSortKey];

            switch (columnDef.type) {
                case 'number':
                case 'currency':
                    aValue = parseFloat(aValue) || 0;
                    bValue = parseFloat(bValue) || 0;
                    break;
                case 'date':
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                    break;
                default:
                    aValue = aValue.toString().toLowerCase();
                    bValue = bValue.toString().toLowerCase();
            }

            let comparison = 0;
            if (aValue > bValue) comparison = 1;
            if (aValue < bValue) comparison = -1;

            return currentSortDirection === 'asc' ? comparison : -comparison;
        });
    }

    renderTable(currentData);
    updateTableInfo();
}

// 排序表格（保留原有功能作為備用）
function sortTable() {
    const sortColumnIndex = parseInt(document.getElementById('sortColumn').value);
    const sortKey = columnDefinitions[sortColumnIndex].key;
    sortByColumn(sortKey, sortColumnIndex);
}

// 按欄位排序
function sortByColumn(columnKey, columnIndex) {
    // 清除其他欄位的排序狀態
    Object.keys(sortState).forEach(key => {
        if (key !== columnKey) {
            delete sortState[key];
        }
    });

    // 切換當前欄位的排序狀態
    if (!sortState[columnKey]) {
        sortState[columnKey] = 'desc'; // 預設降序
    } else if (sortState[columnKey] === 'desc') {
        sortState[columnKey] = 'asc';  // 切換為升序
    } else {
        sortState[columnKey] = 'desc'; // 切換為降序
    }

    const currentSort = sortState[columnKey];
    const columnDef = columnDefinitions.find(col => col.key === columnKey);

    // 執行排序
    currentData.sort((a, b) => {
        let aValue = a[columnKey];
        let bValue = b[columnKey];

        // 根據資料類型進行排序比較
        switch (columnDef.type) {
            case 'number':
            case 'currency':
                aValue = parseFloat(aValue) || 0;
                bValue = parseFloat(bValue) || 0;
                break;
            case 'date':
                aValue = new Date(aValue);
                bValue = new Date(bValue);
                break;
            default:
                aValue = aValue.toString().toLowerCase();
                bValue = bValue.toString().toLowerCase();
        }

        let comparison = 0;
        if (aValue > bValue) comparison = 1;
        if (aValue < bValue) comparison = -1;

        return currentSort === 'asc' ? comparison : -comparison;
    });

    // 重新渲染表格
    renderTable(currentData);

    // 更新排序指示器
    updateSortIndicators();

    // 顯示排序資訊
    showSortNotification(columnDef.name, currentSort);
}

// 更新排序指示器
function updateSortIndicators() {
    const headers = document.querySelectorAll('th .sort-header');
    headers.forEach(header => {
        const th = header.closest('th');
        const columnKey = th.getAttribute('data-key');

        header.classList.remove('sorted', 'asc', 'desc');

        if (sortState[columnKey]) {
            header.classList.add('sorted', sortState[columnKey]);
        }
    });
}

// 顯示排序通知
function showSortNotification(columnName, sortDirection) {
    const notification = document.createElement('div');
    notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(45deg, #667eea, #764ba2);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 10000;
                font-size: 14px;
                font-weight: 500;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            `;

    const sortText = sortDirection === 'asc' ? '升序' : '降序';
    notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span>${sortDirection === 'asc' ? '↑' : '↓'}</span>
                    <span>已按「${columnName}」${sortText}排序</span>
                </div>
            `;

    document.body.appendChild(notification);

    // 顯示動畫
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // 3秒後自動隱藏
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 更新表格資訊
function updateTableInfo() {
    document.getElementById('columnCount').textContent = columnDefinitions.length;
    document.getElementById('rowCount').textContent = currentData.length;
    document.getElementById('stickyInfo').textContent = stickyColumnsEnabled ? document.getElementById('stickyCount').value : '0';
}

// 監聽固定欄位數量變化
document.getElementById('stickyCount').addEventListener('change', function () {
    if (stickyColumnsEnabled) {
        setupStickyColumns(parseInt(this.value));
        updateTableInfo();
    }
});

// 頁面載入時初始化
window.addEventListener('load', function () {
    generateTable();
});

// 視窗大小變化時重新設定固定欄位
window.addEventListener('resize', function () {
    if (stickyColumnsEnabled) {
        const stickyCount = parseInt(document.getElementById('stickyCount').value);
        setTimeout(() => setupStickyColumns(stickyCount), 100);
    }
});

function toggleContent(element) {
    // nextElementSibling 用於選擇緊跟在當前元素之後的下一個兄弟元素（.content-details div）
    const details = element.nextElementSibling;
    const icon = element.querySelector('.toggle-icon');

    details.classList.toggle('active'); // 展開或收起內容
    icon.classList.toggle('active'); // 翻轉箭頭圖標
}

