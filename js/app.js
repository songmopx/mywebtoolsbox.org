// 应用主类
class NavigationApp {
    constructor() {
        this.currentLang = 'zh';
        this.data = {
            categories: [],
            websites: []
        };
        
        // 预设图标列表
        this.presetIcons = [
            'fas fa-globe',
            'fas fa-tools',
            'fas fa-robot',
            'fas fa-heart',
            'fas fa-star',
            'fas fa-shopping-cart',
            'fas fa-gamepad',
            'fas fa-music',
            'fas fa-camera',
            'fas fa-book'
        ];
        
        // 多语言文本
        this.translations = {
            zh: {
                title: '个人网站导航',
                addWebsite: '添加网站',
                addCategory: '添加分类',
                searchPlaceholder: '搜索网站...',
                websiteName: '网站名称',
                websiteUrl: '网站链接',
                websiteCategory: '选择分类',
                websiteDescription: '描述 (可选)',
                categoryName: '分类名称',
                categoryIcon: '选择图标',
                categoryColor: '颜色',
                iconHint: '点击上方图标选择，或手动输入Font Awesome类名',
                save: '保存',
                cancel: '取消',
                edit: '编辑',
                delete: '删除',
                confirmDelete: '确定要删除吗？',
                noWebsites: '暂无网站',
                visitWebsite: '访问网站',
                resetData: '重置',
                confirmReset: '确定要重置所有数据吗？这将恢复到默认网站列表。',
                exportData: '导出',
                importData: '导入',
                exportSuccess: '数据导出成功！',
                importSuccess: '数据导入成功！',
                importError: '导入失败，请检查文件格式。',
                moveUp: '上移',
                moveDown: '下移',
                categoryDirectory: '分类目录',
                jumpToCategory: '跳转到'
            },
            en: {
                title: 'Personal Navigation',
                addWebsite: 'Add Website',
                addCategory: 'Add Category',
                searchPlaceholder: 'Search websites...',
                websiteName: 'Website Name',
                websiteUrl: 'Website URL',
                websiteCategory: 'Select Category',
                websiteDescription: 'Description (Optional)',
                categoryName: 'Category Name',
                categoryIcon: 'Select Icon',
                categoryColor: 'Color',
                iconHint: 'Click icons above to select, or manually input Font Awesome class',
                save: 'Save',
                cancel: 'Cancel',
                edit: 'Edit',
                delete: 'Delete',
                confirmDelete: 'Are you sure you want to delete?',
                noWebsites: 'No websites',
                visitWebsite: 'Visit Website',
                resetData: 'Reset',
                confirmReset: 'Are you sure you want to reset all data? This will restore the default website list.',
                exportData: 'Export',
                importData: 'Import',
                exportSuccess: 'Data exported successfully!',
                importSuccess: 'Data imported successfully!',
                importError: 'Import failed, please check file format.',
                moveUp: 'Move Up',
                moveDown: 'Move Down',
                categoryDirectory: 'Category Directory',
                jumpToCategory: 'Jump to'
            }
        };
        
        this.init();
    }
    
    // 初始化应用
    init() {
        this.loadData();
        this.bindEvents();
        this.renderSidebar();
        this.renderWebsites();
        this.updateUI();
        
        // 如果没有分类，添加默认分类
        if (this.data.categories.length === 0) {
            this.addDefaultCategories();
        }
        
        // 初始化侧边栏状态
        this.currentCategoryId = null;
        this.showAllWebsites();
    }
    
    // 添加默认分类
    addDefaultCategories() {
        const defaultCategories = [
            { id: 1, name: '公域平台', nameEn: 'Public Platforms', icon: 'fas fa-globe', color: 'blue' },
            { id: 2, name: 'AI导航', nameEn: 'AI Navigation', icon: 'fas fa-robot', color: 'purple' },
            { id: 3, name: '常用工具站', nameEn: 'Useful Tools', icon: 'fas fa-tools', color: 'indigo' }
        ];
        
        const defaultWebsites = [
            // 公域平台
            { id: 1, name: '抖音', url: 'https://www.douyin.com/', categoryId: 1, description: '短视频社交平台' },
            { id: 2, name: '小红书', url: 'https://www.xiaohongshu.com/explore', categoryId: 1, description: '生活方式社区' },
            { id: 3, name: '知乎', url: 'https://www.zhihu.com/collection/', categoryId: 1, description: '知识问答社区' },
            { id: 4, name: '知识星球', url: 'https://wx.zsxq.com/', categoryId: 1, description: '知识付费社群' },
            { id: 5, name: '长尾关键词查询', url: 'https://www.5118.com/', categoryId: 1, description: 'SEO关键词工具' },

            // AI导航
            { id: 6, name: 'DeepSeek', url: 'https://chat.deepseek.com/', categoryId: 2, description: 'AI对话助手' },
            { id: 7, name: '腾讯元宝', url: 'https://yuanbao.tencent.com/chat/', categoryId: 2, description: '腾讯AI助手' },
            { id: 8, name: 'ChatGPT', url: 'https://chatgpt.com/', categoryId: 2, description: 'OpenAI聊天机器人' },
            { id: 9, name: '豆包', url: 'https://www.doubao.com/chat/', categoryId: 2, description: '字节跳动AI助手' },
            { id: 10, name: 'Claude', url: 'https://claude.ai/new', categoryId: 2, description: 'Anthropic AI助手' },
            { id: 11, name: 'Gemini', url: 'https://aistudio.google.com/prompts/new_chat', categoryId: 2, description: 'Google AI助手' },
            { id: 12, name: 'Lovart', url: 'https://www.lovart.ai/', categoryId: 2, description: 'AI艺术创作工具' },

            // 常用工具站
            { id: 13, name: '飞书文档', url: 'https://feishu.cn', categoryId: 3, description: '协作办公平台' },
            { id: 14, name: 'Cloudflare', url: 'https://dash.cloudflare.com/', categoryId: 3, description: 'CDN和网络安全服务' },
            { id: 15, name: 'Coze', url: 'https://www.coze.cn/', categoryId: 3, description: '字节跳动AI开发平台' },
            { id: 16, name: '每日任务管理', url: 'https://planeveryday.org/', categoryId: 3, description: '任务规划工具' },
            { id: 17, name: 'POE智能体', url: 'https://poe.com/', categoryId: 3, description: 'AI聊天平台' },
            { id: 18, name: 'Google AdSense', url: 'https://adsense.google.com/', categoryId: 3, description: '谷歌广告联盟' },
            { id: 19, name: 'GitHub', url: 'https://github.com/', categoryId: 3, description: '代码托管平台' },
            { id: 20, name: '野卡', url: 'https://yeka.ai', categoryId: 3, description: 'AI工具平台' },
            { id: 21, name: '腾讯文档', url: 'https://docs.qq.com/', categoryId: 3, description: '在线文档协作' }
        ];
        
        this.data.categories = defaultCategories;
        this.data.websites = defaultWebsites;
        this.saveData();
        this.renderSidebar();
        this.renderWebsites();
    }
    
    // 绑定事件
    bindEvents() {
        // 语言切换
        document.getElementById('langToggle').addEventListener('click', () => {
            this.toggleLanguage();
        });
        
        // 添加网站按钮
        document.getElementById('addWebsiteBtn').addEventListener('click', () => {
            this.showWebsiteModal();
        });
        
        // 添加分类按钮
        document.getElementById('addCategoryBtn').addEventListener('click', () => {
            this.showCategoryModal();
        });
        
        // 重置数据按钮
        document.getElementById('resetDataBtn').addEventListener('click', () => {
            this.resetData();
        });
        
        // 导出数据按钮
        document.getElementById('exportDataBtn').addEventListener('click', () => {
            this.exportData();
        });
        
        // 导入数据按钮
        document.getElementById('importDataBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
        
        // 文件选择变化
        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.handleFileImport(e);
        });
        
        // 侧边栏切换按钮
        document.getElementById('sidebarToggle').addEventListener('click', () => {
            this.toggleSidebar();
        });
        
        // 搜索输入
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        // 网站表单提交
        document.getElementById('websiteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleWebsiteSubmit();
        });
        
        // 分类表单提交
        document.getElementById('categoryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCategorySubmit();
        });
        
        // 关闭模态框
        document.getElementById('closeWebsiteModal').addEventListener('click', () => {
            this.hideWebsiteModal();
        });
        
        document.getElementById('closeCategoryModal').addEventListener('click', () => {
            this.hideCategoryModal();
        });
        
        document.getElementById('cancelWebsite').addEventListener('click', () => {
            this.hideWebsiteModal();
        });
        
        document.getElementById('cancelCategory').addEventListener('click', () => {
            this.hideCategoryModal();
        });
        
        // 搜索
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        // 点击模态框背景关闭
        document.getElementById('websiteModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideWebsiteModal();
            }
        });
        
        document.getElementById('categoryModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideCategoryModal();
            }
        });
    }
    
    // 切换语言
    toggleLanguage() {
        this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
        document.getElementById('currentLang').textContent = this.currentLang === 'zh' ? '中文' : 'English';
        document.querySelector('html').setAttribute('lang', this.currentLang === 'zh' ? 'zh-CN' : 'en');
        this.updateUI();
        this.renderSidebar();
        this.renderWebsites();
    }
    
    // 更新UI文本
    updateUI() {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (this.translations[this.currentLang][key]) {
                element.textContent = this.translations[this.currentLang][key];
            }
        });
        
        // 更新占位符
        const placeholderElements = document.querySelectorAll('[data-placeholder-key]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-placeholder-key');
            if (this.translations[this.currentLang][key]) {
                element.setAttribute('placeholder', this.translations[this.currentLang][key]);
            }
        });
    }
    
    // 显示网站模态框
    showWebsiteModal(website = null) {
        const modal = document.getElementById('websiteModal');
        const form = document.getElementById('websiteForm');
        const categorySelect = document.getElementById('websiteCategory');
        
        // 填充分类选项
        categorySelect.innerHTML = '';
        this.data.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = this.currentLang === 'zh' ? category.name : category.nameEn;
            categorySelect.appendChild(option);
        });
        
        // 如果是编辑模式，填充表单
        if (website) {
            document.getElementById('websiteName').value = website.name;
            document.getElementById('websiteUrl').value = website.url;
            document.getElementById('websiteCategory').value = website.categoryId;
            document.getElementById('websiteDescription').value = website.description || '';
            form.dataset.editId = website.id;
        } else {
            form.reset();
            delete form.dataset.editId;
        }
        
        modal.classList.add('active');
    }
    
    // 隐藏网站模态框
    hideWebsiteModal() {
        document.getElementById('websiteModal').classList.remove('active');
    }
    
    // 显示分类模态框
    showCategoryModal(category = null) {
        const modal = document.getElementById('categoryModal');
        const form = document.getElementById('categoryForm');
        
        // 渲染图标选择器
        this.renderIconSelector();
        
        // 如果是编辑模式，填充表单
        if (category) {
            document.getElementById('categoryName').value = category.name;
            document.getElementById('categoryIcon').value = category.icon;
            document.getElementById('categoryColor').value = category.color;
            form.dataset.editId = category.id;
            // 高亮选中的图标
            this.highlightSelectedIcon(category.icon);
        } else {
            form.reset();
            delete form.dataset.editId;
            // 默认选择第一个图标
            document.getElementById('categoryIcon').value = this.presetIcons[0];
            this.highlightSelectedIcon(this.presetIcons[0]);
        }
        
        modal.classList.add('active');
    }
    
    // 隐藏分类模态框
    hideCategoryModal() {
        document.getElementById('categoryModal').classList.remove('active');
    }
    
    // 处理网站表单提交
    handleWebsiteSubmit() {
        const form = document.getElementById('websiteForm');
        const formData = new FormData(form);
        
        const website = {
            name: formData.get('name'),
            url: formData.get('url'),
            categoryId: parseInt(formData.get('category')),
            description: formData.get('description')
        };
        
        if (form.dataset.editId) {
            // 编辑现有网站
            website.id = parseInt(form.dataset.editId);
            const index = this.data.websites.findIndex(w => w.id === website.id);
            if (index !== -1) {
                this.data.websites[index] = website;
            }
        } else {
            // 添加新网站
            website.id = Date.now();
            this.data.websites.push(website);
        }
        
        this.saveData();
        this.renderSidebar();
        this.renderWebsites();
        this.hideWebsiteModal();
    }
    
    // 处理分类表单提交
    handleCategorySubmit() {
        const form = document.getElementById('categoryForm');
        const formData = new FormData(form);
        
        const category = {
            name: formData.get('name'),
            nameEn: formData.get('name'), // 简化处理，实际可以添加英文名称字段
            icon: formData.get('icon') || 'fas fa-folder',
            color: formData.get('color')
        };
        
        if (form.dataset.editId) {
            // 编辑现有分类
            category.id = parseInt(form.dataset.editId);
            const index = this.data.categories.findIndex(c => c.id === category.id);
            if (index !== -1) {
                this.data.categories[index] = { ...this.data.categories[index], ...category };
            }
        } else {
            // 添加新分类
            category.id = Date.now();
            this.data.categories.push(category);
        }
        
        this.saveData();
        this.renderSidebar();
        this.renderWebsites();
        this.hideCategoryModal();
    }
    
    // 删除网站
    deleteWebsite(id) {
        if (confirm(this.translations[this.currentLang].confirmDelete)) {
                    this.data.websites = this.data.websites.filter(w => w.id !== id);
        this.saveData();
        this.renderSidebar();
        this.renderWebsites();
        }
    }
    
    // 删除分类
    deleteCategory(id) {
        if (confirm(this.translations[this.currentLang].confirmDelete)) {
            // 删除分类下的所有网站
            this.data.websites = this.data.websites.filter(w => w.categoryId !== id);
            this.data.categories = this.data.categories.filter(c => c.id !== id);
            this.saveData();
            this.renderSidebar();
            this.renderWebsites();
        }
    }

    // 置顶分类
    pinCategory(id) {
        const category = this.data.categories.find(c => c.id === id);
        if (category) {
            category.pinned = true;
            category.pinnedAt = Date.now(); // 记录置顶时间
            this.saveData();
            this.renderSidebar();
        }
    }

    // 取消置顶分类
    unpinCategory(id) {
        const category = this.data.categories.find(c => c.id === id);
        if (category) {
            category.pinned = false;
            delete category.pinnedAt; // 删除置顶时间
            this.saveData();
            this.renderSidebar();
        }
    }
    
    // 搜索处理
    handleSearch(query) {
        if (!query.trim()) {
            this.showAllWebsites();
            return;
        }
        
        const filteredWebsites = this.data.websites.filter(website =>
            website.name.toLowerCase().includes(query.toLowerCase()) ||
            (website.description && website.description.toLowerCase().includes(query.toLowerCase()))
        );
        
        this.renderSearchResults(filteredWebsites);
    }
    
    // 渲染搜索结果
    renderSearchResults(websites) {
        this.currentCategoryId = null;
        this.updatePageTitle(`搜索结果`, `找到 ${websites.length} 个网站`);
        
        const container = document.getElementById('websitesContainer');
        
        if (websites.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-400">${this.translations[this.currentLang].noWebsites}</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = websites.map(website => this.renderWebsiteCard(website)).join('');
        
        // 在DOM更新后检查所有图标
        setTimeout(() => this.checkAndFixBrokenIcons(), 200);
    }
    
    // 渲染分类
    renderCategories() {
        const container = document.getElementById('categoriesContainer');
        
        if (this.data.categories.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-folder-open text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-500">暂无分类，请添加分类</p>
                </div>
            `;
            return;
        }
        
        // 对分类进行排序：置顶的在前，按置顶时间倒序排列，非置顶的按原有顺序
        const sortedCategories = [...this.data.categories].sort((a, b) => {
            if (a.pinned && b.pinned) {
                // 都是置顶的，按置顶时间排序（最新置顶的在前面）
                return (b.pinnedAt || 0) - (a.pinnedAt || 0);
            } else if (a.pinned && !b.pinned) {
                // a是置顶的，b不是，a在前
                return -1;
            } else if (!a.pinned && b.pinned) {
                // b是置顶的，a不是，b在前
                return 1;
            } else {
                // 都不是置顶的，保持原有顺序
                return 0;
            }
        });

        container.innerHTML = sortedCategories.map(category => {
            const websites = this.data.websites.filter(w => w.categoryId === category.id);
            return this.renderCategory(category, websites);
        }).join('');
        
        
        
        // 更新分类导航
        this.updateCategoryNav();
    }
    
    // 渲染单个分类
    renderCategory(category, websites) {
        const colorClasses = {
            purple: 'from-purple-500 to-purple-600',
            blue: 'from-blue-500 to-blue-600',
            green: 'from-green-500 to-green-600',
            red: 'from-red-500 to-red-600',
            yellow: 'from-yellow-500 to-yellow-600',
            pink: 'from-pink-500 to-pink-600',
            indigo: 'from-indigo-500 to-indigo-600',
            gray: 'from-gray-500 to-gray-600'
        };
        
        return `
            <div class="mb-8 category-item" 
                 data-category-id="${category.id}"
                 id="category-${category.id}">
                <div class="flex items-center justify-between mb-4 category-header">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-r ${colorClasses[category.color]} rounded-lg flex items-center justify-center text-white">
                            <i class="${category.icon}"></i>
                        </div>
                        <h2 class="flex items-center space-x-2 text-xl font-semibold text-gray-800">
                            <span>${this.currentLang === 'zh' ? category.name : category.nameEn}</span>
                            ${category.pinned ? '<i class="fas fa-arrow-up text-blue-500 text-sm" title="已置顶"></i>' : ''}
                        </h2>
                        <span class="text-sm text-gray-500">(${websites.length})</span>
                    </div>
                    <div class="flex space-x-2">
                        ${category.pinned ? 
                            `<button onclick="app.unpinCategory(${category.id})" 
                                     class="pin-button p-2 text-blue-500 hover:text-blue-600 transition-colors"
                                     title="取消置顶">
                                <i class="fas fa-arrow-up"></i>
                             </button>` :
                            `<button onclick="app.pinCategory(${category.id})" 
                                     class="pin-button p-2 text-gray-400 hover:text-blue-500 transition-colors"
                                     title="置顶分类">
                                <i class="fas fa-arrow-up"></i>
                             </button>`
                        }
                        <button onclick="app.showCategoryModal(${JSON.stringify(category).replace(/"/g, '&quot;')})" 
                                class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                title="编辑分类">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="app.deleteCategory(${category.id})" 
                                class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="删除分类">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    ${websites.length > 0 
                        ? websites.map(website => this.renderWebsiteCard(website)).join('')
                        : `<div class="col-span-full text-center py-8 text-gray-500">${this.translations[this.currentLang].noWebsites}</div>`
                    }
                </div>
            </div>
        `;
    }
    
    // 生成随机备用图标
    generateFallbackIcon(websiteName, websiteId) {
        // 获取网站名称的首字符
        const firstChar = websiteName.charAt(0).toUpperCase();
        
        // 预定义的渐变色配置
        const gradientColors = [
            ['#667eea', '#764ba2'], // 紫蓝渐变
            ['#f093fb', '#f5576c'], // 粉红渐变
            ['#4facfe', '#00f2fe'], // 蓝色渐变
            ['#43e97b', '#38f9d7'], // 绿蓝渐变
            ['#fa709a', '#fee140'], // 粉黄渐变
            ['#a8edea', '#fed6e3'], // 青粉渐变
            ['#ff9a9e', '#fecfef'], // 粉色渐变
            ['#a18cd1', '#fbc2eb'], // 紫粉渐变
            ['#fad0c4', '#ffd1ff'], // 橙粉渐变
            ['#ffecd2', '#fcb69f'], // 橙色渐变
            ['#ff8a80', '#ea4335'], // 红色渐变
            ['#81c784', '#4caf50'], // 绿色渐变
            ['#64b5f6', '#2196f3'], // 蓝色渐变
            ['#ffb74d', '#ff9800'], // 橙色渐变
            ['#ba68c8', '#9c27b0']  // 紫色渐变
        ];
        
        // 基于网站ID选择一个固定的渐变（确保同一网站的图标颜色一致）
        const gradientIndex = websiteId % gradientColors.length;
        const [startColor, endColor] = gradientColors[gradientIndex];
        
        // 生成SVG图标
        const svgIcon = `data:image/svg+xml,${encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad${websiteId}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:${startColor};stop-opacity:1" />
                        <stop offset="100%" style="stop-color:${endColor};stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="40" height="40" rx="8" fill="url(#grad${websiteId})"/>
                <text x="20" y="28" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="18" font-weight="600" text-anchor="middle" fill="white">${firstChar}</text>
            </svg>
        `)}`;
        
        return svgIcon;
    }

    // 渲染网站卡片
    renderWebsiteCard(website) {
        const category = this.data.categories.find(c => c.id === website.categoryId);
        const categoryName = category ? (this.currentLang === 'zh' ? category.name : category.nameEn) : 'Unknown';
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(website.url).hostname}&sz=32`;
        const fallbackIcon = this.generateFallbackIcon(website.name, website.id);
        
        return `
            <div class="website-card p-6 group">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-4">
                        <div class="relative">
                            <img src="${faviconUrl}" 
                                 alt="${website.name}" 
                                 class="w-10 h-10 rounded-lg favicon-img" 
                                 style="display: block;"
                                 onerror="this.style.display='none'; this.parentNode.querySelector('.fallback-icon').style.display='block';">
                            <img src="${fallbackIcon}" 
                                 alt="${website.name}" 
                                 class="w-10 h-10 rounded-lg fallback-icon" 
                                 style="display: none;">
                        </div>
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-100 text-lg mb-1">${website.name}</h3>
                            <p class="text-sm text-amber-500">${categoryName}</p>
                        </div>
                    </div>
                    
                    <div class="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                        <button onclick="app.showWebsiteModal(${JSON.stringify(website).replace(/"/g, '&quot;')})" 
                                class="p-2 text-gray-400 hover:text-amber-500 hover:bg-slate-700 rounded-lg transition-colors"
                                title="${this.translations[this.currentLang].edit}">
                            <i class="fas fa-edit text-sm"></i>
                        </button>
                        <button onclick="app.deleteWebsite(${website.id})" 
                                class="p-2 text-gray-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                                title="${this.translations[this.currentLang].delete}">
                            <i class="fas fa-trash text-sm"></i>
                        </button>
                    </div>
                </div>
                
                <p class="text-gray-400 text-sm mb-4 line-clamp-2">${website.description || '暂无描述'}</p>
                
                <a href="${website.url}" target="_blank" rel="noopener noreferrer" 
                   class="inline-flex items-center space-x-2 text-amber-500 hover:text-amber-400 font-medium text-sm transition-colors">
                    <span>${this.translations[this.currentLang].visitWebsite}</span>
                    <i class="fas fa-external-link-alt text-xs"></i>
                </a>
            </div>
        `;
    }
    
    // 加载数据
    loadData() {
        const savedData = localStorage.getItem('navigationData');
        if (savedData) {
            this.data = JSON.parse(savedData);
        }
        
        const savedLang = localStorage.getItem('navigationLang');
        if (savedLang) {
            this.currentLang = savedLang;
            document.getElementById('currentLang').textContent = savedLang === 'zh' ? '中文' : 'English';
            document.querySelector('html').setAttribute('lang', savedLang === 'zh' ? 'zh-CN' : 'en');
        }
    }
    
    // 保存数据
    saveData() {
        localStorage.setItem('navigationData', JSON.stringify(this.data));
        localStorage.setItem('navigationLang', this.currentLang);
    }
    
    // 渲染图标选择器
    renderIconSelector() {
        const iconSelector = document.getElementById('iconSelector');
        iconSelector.innerHTML = this.presetIcons.map(icon => `
            <button type="button" 
                    class="icon-btn w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-purple-500 hover:bg-purple-50 transition-colors"
                    data-icon="${icon}"
                    onclick="app.selectIcon('${icon}')">
                <i class="${icon} text-lg text-gray-600"></i>
            </button>
        `).join('');
    }
    
    // 选择图标
    selectIcon(icon) {
        document.getElementById('categoryIcon').value = icon;
        this.highlightSelectedIcon(icon);
    }
    
    // 高亮选中的图标
    highlightSelectedIcon(selectedIcon) {
        // 移除所有高亮
        document.querySelectorAll('.icon-btn').forEach(btn => {
            btn.classList.remove('border-purple-500', 'bg-purple-100');
            btn.classList.add('border-gray-300');
        });
        
        // 高亮选中的图标
        const selectedBtn = document.querySelector(`[data-icon="${selectedIcon}"]`);
        if (selectedBtn) {
            selectedBtn.classList.remove('border-gray-300');
            selectedBtn.classList.add('border-purple-500', 'bg-purple-100');
        }
    }
    
    // 重置数据
    resetData() {
        if (confirm(this.translations[this.currentLang].confirmReset)) {
            // 清除localStorage
            localStorage.removeItem('navigationData');
            localStorage.removeItem('navigationLang');
            
            // 重置应用数据
            this.data = {
                categories: [],
                websites: []
            };
            
            // 重新添加默认数据
            this.addDefaultCategories();
            
            // 重新渲染界面
            this.renderSidebar();
            this.renderWebsites();
            
            // 显示成功消息
            alert('数据已重置为默认设置！');
        }
    }
    
    // 导出数据
    exportData() {
        try {
            // 创建CSV内容
            let csvContent = '\uFEFF分类名称,网站名称,网站URL,描述\n'; // 添加BOM以支持中文
            
            this.data.websites.forEach(website => {
                const category = this.data.categories.find(c => c.id === website.categoryId);
                const categoryName = category ? category.name : '未知分类';
                const description = website.description || '';
                
                // 处理CSV中的特殊字符
                const escapeCsv = (str) => {
                    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                        return '"' + str.replace(/"/g, '""') + '"';
                    }
                    return str;
                };
                
                csvContent += `${escapeCsv(categoryName)},${escapeCsv(website.name)},${escapeCsv(website.url)},${escapeCsv(description)}\n`;
            });
            
            // 创建下载链接
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `网站导航_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            alert(this.translations[this.currentLang].exportSuccess);
        } catch (error) {
            console.error('导出失败:', error);
            alert('导出失败，请稍后重试。');
        }
    }
    
    // 处理文件导入
    handleFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                this.importData(e.target.result);
            } catch (error) {
                console.error('导入失败:', error);
                alert(this.translations[this.currentLang].importError);
            }
        };
        reader.readAsText(file, 'UTF-8');
        
        // 清空文件输入
        event.target.value = '';
    }
    
    // 导入数据
    importData(csvContent) {
        const lines = csvContent.split('\n');
        if (lines.length < 2) {
            throw new Error('文件格式不正确');
        }
        
        // 跳过标题行
        const dataLines = lines.slice(1).filter(line => line.trim());
        
        // 解析CSV
        const newWebsites = [];
        const categoryMap = new Map();
        
        // 首先创建分类映射
        this.data.categories.forEach(cat => {
            categoryMap.set(cat.name, cat.id);
        });
        
        dataLines.forEach((line, index) => {
            try {
                // 简单的CSV解析（处理引号和逗号）
                const values = this.parseCSVLine(line);
                if (values.length < 3) return; // 至少需要分类、名称、URL
                
                const [categoryName, websiteName, websiteUrl, description = ''] = values;
                
                if (!categoryName || !websiteName || !websiteUrl) return;
                
                // 查找或创建分类
                let categoryId = categoryMap.get(categoryName);
                if (!categoryId) {
                    // 创建新分类
                    categoryId = Date.now() + Math.random();
                    const newCategory = {
                        id: categoryId,
                        name: categoryName,
                        nameEn: categoryName,
                        icon: 'fas fa-folder',
                        color: 'blue'
                    };
                    this.data.categories.push(newCategory);
                    categoryMap.set(categoryName, categoryId);
                }
                
                // 创建网站
                const newWebsite = {
                    id: Date.now() + Math.random() + index,
                    name: websiteName,
                    url: websiteUrl,
                    categoryId: categoryId,
                    description: description
                };
                
                newWebsites.push(newWebsite);
            } catch (error) {
                console.warn(`跳过第${index + 2}行，解析失败:`, error);
            }
        });
        
        // 添加新网站到现有数据
        this.data.websites.push(...newWebsites);
        
        // 保存并重新渲染
        this.saveData();
        this.renderSidebar();
        this.renderWebsites();
        
        alert(`${this.translations[this.currentLang].importSuccess} 导入了 ${newWebsites.length} 个网站。`);
    }
    
    // 解析CSV行（处理引号和逗号）
    parseCSVLine(line) {
        const values = [];
        let current = '';
        let inQuotes = false;
        let i = 0;
        
        while (i < line.length) {
            const char = line[i];
            
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    // 转义的引号
                    current += '"';
                    i += 2;
                } else {
                    // 切换引号状态
                    inQuotes = !inQuotes;
                    i++;
                }
            } else if (char === ',' && !inQuotes) {
                // 字段分隔符
                values.push(current.trim());
                current = '';
                i++;
            } else {
                current += char;
                i++;
            }
        }
        
        // 添加最后一个字段
        values.push(current.trim());
        
        return values;
    }
    

        // 切换侧边栏
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        const toggleBtn = document.getElementById('sidebarToggle');
        const toggleIcon = toggleBtn.querySelector('i');
        
        if (window.innerWidth <= 1024) {
            // 移动端：切换侧边栏显示/隐藏
            sidebar.classList.toggle('mobile-open');
        } else {
            // 桌面端：切换侧边栏收缩/展开
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
            
            if (sidebar.classList.contains('collapsed')) {
                toggleIcon.className = 'fas fa-chevron-right';
            } else {
                toggleIcon.className = 'fas fa-chevron-left';
            }
        }
    }
    
    // 渲染侧边栏
    renderSidebar() {
        const sidebarList = document.getElementById('sidebarCategoryList');
        if (!sidebarList) return;
        
        const colorClasses = {
            purple: 'from-purple-500 to-purple-600',
            blue: 'from-blue-500 to-blue-600',
            green: 'from-green-500 to-green-600',
            red: 'from-red-500 to-red-600',
            yellow: 'from-yellow-500 to-yellow-600',
            pink: 'from-pink-500 to-pink-600',
            indigo: 'from-indigo-500 to-indigo-600',
            gray: 'from-gray-500 to-gray-600'
        };
        
        // 获取按置顶时间排序的分类
        const sortedCategories = [...this.data.categories].sort((a, b) => {
            if (a.pinnedAt && b.pinnedAt) {
                return b.pinnedAt - a.pinnedAt;
            }
            if (a.pinnedAt) return -1;
            if (b.pinnedAt) return 1;
            return 0;
        });
        
        // 添加"所有网站"选项
        let html = `
            <div class="sidebar-item ${this.currentCategoryId === null ? 'active' : ''} p-4 cursor-pointer" 
                 onclick="app.showAllWebsites()">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center text-white">
                        <i class="fas fa-globe"></i>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-medium text-gray-100">所有网站</h4>
                        <p class="text-sm text-gray-400">${this.data.websites.length}个网站</p>
                    </div>
                </div>
            </div>
        `;
        
        // 添加分类项
        html += sortedCategories.map(category => {
            const websites = this.data.websites.filter(w => w.categoryId === category.id);
            const isActive = this.currentCategoryId === category.id;
            const isPinned = category.pinnedAt;
            
            return `
                <div class="sidebar-item ${isActive ? 'active' : ''} p-4 cursor-pointer" 
                     onclick="app.showCategoryWebsites(${category.id})">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-gradient-to-r ${colorClasses[category.color]} rounded-lg flex items-center justify-center text-white">
                                <i class="${category.icon}"></i>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-medium text-gray-100 flex items-center space-x-2">
                                    <span>${this.currentLang === 'zh' ? category.name : category.nameEn}</span>
                                    ${isPinned ? '<i class="fas fa-arrow-up text-amber-500 text-xs"></i>' : ''}
                                </h4>
                                <p class="text-sm text-gray-400">${websites.length}个网站</p>
                            </div>
                        </div>
                        <div class="flex space-x-1">
                            <button onclick="event.stopPropagation(); app.${isPinned ? 'unpinCategory' : 'pinCategory'}(${category.id})" 
                                    class="p-2 text-${isPinned ? 'amber-500' : 'gray-400'} hover:bg-slate-700 rounded-lg transition-colors"
                                    title="${isPinned ? '取消置顶' : '置顶'}">
                                <i class="fas fa-arrow-up text-xs"></i>
                            </button>
                            <button onclick="event.stopPropagation(); app.showCategoryModal(${JSON.stringify(category).replace(/"/g, '&quot;')})" 
                                    class="p-2 text-gray-400 hover:bg-slate-700 rounded-lg transition-colors"
                                    title="编辑">
                                <i class="fas fa-edit text-xs"></i>
                            </button>
                            <button onclick="event.stopPropagation(); app.deleteCategory(${category.id})" 
                                    class="p-2 text-gray-400 hover:bg-slate-700 hover:text-red-400 rounded-lg transition-colors"
                                    title="删除">
                                <i class="fas fa-trash text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        sidebarList.innerHTML = html;
    }
    
    // 显示所有网站
    showAllWebsites() {
        this.currentCategoryId = null;
        this.renderSidebar();
        this.renderWebsites();
        this.updatePageTitle('所有网站', '浏览和管理你收藏的网站');
    }
    
    // 显示指定分类的网站
    showCategoryWebsites(categoryId) {
        const category = this.data.categories.find(c => c.id === categoryId);
        if (!category) return;
        
        this.currentCategoryId = categoryId;
        this.renderSidebar();
        this.renderWebsites();
        
        const categoryName = this.currentLang === 'zh' ? category.name : category.nameEn;
        const websites = this.data.websites.filter(w => w.categoryId === categoryId);
        this.updatePageTitle(categoryName, `${websites.length}个网站`);
    }
    
    // 更新页面标题
    updatePageTitle(title, description) {
        const titleElement = document.getElementById('currentCategoryTitle');
        const descriptionElement = document.getElementById('currentCategoryDescription');
        
        if (titleElement) titleElement.textContent = title;
        if (descriptionElement) descriptionElement.textContent = description;
    }
    
    // 渲染网站列表
    renderWebsites() {
        const container = document.getElementById('websitesContainer');
        if (!container) return;
        
        let websites;
        if (this.currentCategoryId === null) {
            websites = this.data.websites;
        } else {
            websites = this.data.websites.filter(w => w.categoryId === this.currentCategoryId);
        }
        
        if (websites.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-globe text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-400">${this.translations[this.currentLang].noWebsites}</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = websites.map(website => this.renderWebsiteCard(website)).join('');
        
        // 在DOM更新后检查所有图标
        setTimeout(() => this.checkAndFixBrokenIcons(), 200);
    }

    // 检查并修复失效的图标
    checkAndFixBrokenIcons() {
        const faviconImages = document.querySelectorAll('.favicon-img');
        faviconImages.forEach(img => {
            // 检查图标是否加载失败或者是1x1像素的占位图
            if ((img.naturalWidth === 0 && img.complete) || 
                (img.naturalWidth <= 16 && img.naturalHeight <= 16 && img.complete)) {
                img.style.display = 'none';
                const fallbackIcon = img.parentNode.querySelector('.fallback-icon');
                if (fallbackIcon) {
                    fallbackIcon.style.display = 'block';
                }
            }
        });
    }
}

// 初始化应用
const app = new NavigationApp(); 