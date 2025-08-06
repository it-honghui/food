const app = getApp()

Page({
  data: {
    foodList: [],
    filteredFoodList: [],
    searchText: '',
    currentCategory: 'all',
    showAddModal: false,
    showEditModal: false,
    newFoodName: '',
    editFoodName: '',
    editFoodIndex: -1,
    selectedCategoryIndex: 0,
    categoryOptions: ['中餐', '西餐', '日料', '甜点'],
    currentTheme: {
      primary: '#FF69B4',
      secondary: '#FFB6C1',
      tertiary: '#FFC0CB',
      background: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 50%, #FFE4E1 100%)'
    },
    categories: {
      chinese: ['麻辣烫', '火锅', '烤肉', '水饺', '馄饨', '包子', '面条', '粥', '汤', '烤鱼', '小龙虾', '烧烤', '串串香', '冒菜', '酸菜鱼', '宫保鸡丁', '麻婆豆腐', '回锅肉', '鱼香肉丝', '糖醋里脊', '红烧肉', '白切鸡', '口水鸡', '辣子鸡', '黄焖鸡', '大盘鸡', '烤鸭', '烧鹅', '叉烧', '蒸蛋', '煎蛋', '炒蛋', '蛋炒饭', '蛋包饭', '蛋挞', '豆浆'],
      western: ['披萨', '汉堡', '炸鸡', '沙拉', '三明治', '意面', '牛排', '意大利面', '意式烩饭', '提拉米苏', '意式冰淇淋', '咖啡', '红酒', '奶酪', '火腿', '橄榄'],
      japanese: ['寿司', '刺身', '天妇罗', '拉面', '乌冬面', '荞麦面', '味噌汤', '纳豆', '梅子', '抹茶'],
      dessert: ['蛋糕', '面包', '饼干', '巧克力', '冰淇淋', '奶茶', '果汁', '酸奶', '牛奶', '茶', '水果', '蔬菜', '坚果', '薯片', '爆米花', '糖果']
    }
  },

  onLoad() {
    this.initFoodList()
    this.initTheme()
  },

  // 初始化主题
  initTheme() {
    // 从全局获取主题，如果没有则使用默认主题
    const globalTheme = app.globalData.currentTheme
    if (globalTheme) {
      this.setData({
        currentTheme: globalTheme
      })
    }
  },

  // 初始化食物列表
  initFoodList() {
    const foodList = app.globalData.foodList
    const foodWithEmoji = foodList.map(food => {
      return {
        name: food,
        emoji: this.getFoodEmoji(food)
      }
    })
    
    this.setData({
      foodList: foodWithEmoji,
      filteredFoodList: foodWithEmoji
    })
  },

  // 根据食物名称获取对应的emoji
  getFoodEmoji(foodName) {
    const emojiMap = {
      '麻辣烫': '🍲', '火锅': '🍲', '烤肉': '🍖', '寿司': '🍣', '披萨': '🍕', '汉堡': '🍔', '炸鸡': '🍗',
      '拉面': '🍜', '炒饭': '🍚', '盖浇饭': '🍛', '水饺': '🥟', '馄饨': '🥟', '包子': '🥟', '面条': '🍜',
      '粥': '🥣', '汤': '🍲', '沙拉': '🥗', '三明治': '🥪', '意面': '🍝', '牛排': '🥩', '烤鱼': '🐟',
      '小龙虾': '🦞', '烧烤': '🍖', '串串香': '🍢', '冒菜': '🍲', '酸菜鱼': '🐟', '宫保鸡丁': '🍗',
      '麻婆豆腐': '🧈', '回锅肉': '🥩', '鱼香肉丝': '🥩', '糖醋里脊': '🥩', '红烧肉': '🥩', '白切鸡': '🍗',
      '口水鸡': '🍗', '辣子鸡': '🍗', '黄焖鸡': '🍗', '大盘鸡': '🍗', '烤鸭': '🦆', '烧鹅': '🦆', '叉烧': '🥩',
      '蒸蛋': '🥚', '煎蛋': '🍳', '炒蛋': '🍳', '蛋炒饭': '🍚', '蛋包饭': '🍚', '蛋挞': '🥧', '蛋糕': '🍰',
      '面包': '🍞', '饼干': '🍪', '巧克力': '🍫', '冰淇淋': '🍦', '奶茶': '🥤', '咖啡': '☕', '果汁': '🧃',
      '酸奶': '🥛', '牛奶': '🥛', '豆浆': '🥛', '茶': '🍵', '水果': '🍎', '蔬菜': '🥬', '坚果': '🥜',
      '薯片': '🍟', '爆米花': '🍿', '糖果': '🍬', '刺身': '🍣', '天妇罗': '🍤', '乌冬面': '🍜', '荞麦面': '🍜',
      '味噌汤': '🍲', '纳豆': '🫘', '梅子': '🫐', '抹茶': '🍵', '意大利面': '🍝', '意式烩饭': '🍚',
      '提拉米苏': '🍰', '意式冰淇淋': '🍦', '红酒': '🍷', '奶酪': '🧀', '火腿': '🥓', '橄榄': '🫒',
      '泰式炒河粉': '🍜', '冬阴功汤': '🍲', '咖喱': '🍛', '芒果糯米饭': '🍚', '泰式奶茶': '🥤', '椰汁': '🥥',
      '柠檬草茶': '🍵', '泰式沙拉': '🥗', '炸春卷': '🥟', '泰式炒饭': '🍚'
    }
    
    return emojiMap[foodName] || '🍽️'
  },

  // 搜索输入
  onSearchInput(e) {
    const searchText = e.detail.value
    this.setData({
      searchText: searchText
    })
    this.filterFoodList()
  },

  // 选择分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      currentCategory: category
    })
    this.filterFoodList()
  },

  // 筛选食物列表
  filterFoodList() {
    let filteredList = this.data.foodList

    // 按分类筛选
    if (this.data.currentCategory !== 'all') {
      const categoryFoods = this.data.categories[this.data.currentCategory]
      filteredList = filteredList.filter(food => 
        categoryFoods.includes(food.name)
      )
    }

    // 按搜索文本筛选
    if (this.data.searchText) {
      filteredList = filteredList.filter(food =>
        food.name.toLowerCase().includes(this.data.searchText.toLowerCase())
      )
    }

    this.setData({
      filteredFoodList: filteredList
    })
  },

  // 选择食物
  selectFood(e) {
    const food = e.currentTarget.dataset.food
    wx.showToast({
      title: `选择了 ${food.name}`,
      icon: 'success',
      duration: 2000
    })
  },

  // 显示添加弹窗
  showAddModal() {
    this.setData({
      showAddModal: true,
      newFoodName: '',
      selectedCategoryIndex: 0
    })
    
    // 延迟聚焦输入框，确保弹窗完全显示
    setTimeout(() => {
      // 可以在这里添加输入框聚焦逻辑
    }, 300)
  },

  // 隐藏添加弹窗
  hideAddModal() {
    this.setData({
      showAddModal: false
    })
  },

  // 显示编辑弹窗
  editFood(e) {
    const { index, food } = e.currentTarget.dataset
    this.setData({
      showEditModal: true,
      editFoodName: food.name,
      editFoodIndex: index
    })
  },

  // 隐藏编辑弹窗
  hideEditModal() {
    this.setData({
      showEditModal: false
    })
  },

  // 新食物名称输入
  onNewFoodInput(e) {
    this.setData({
      newFoodName: e.detail.value
    })
  },

  // 编辑食物名称输入
  onEditFoodInput(e) {
    this.setData({
      editFoodName: e.detail.value
    })
  },

  // 分类选择
  onCategoryChange(e) {
    this.setData({
      selectedCategoryIndex: e.detail.value
    })
  },

  // 添加新食物
  addNewFood() {
    const { newFoodName, selectedCategoryIndex, categoryOptions } = this.data
    
    if (!newFoodName.trim()) {
      wx.showToast({
        title: '请输入食物名称',
        icon: 'none'
      })
      return
    }

    // 检查是否已存在
    const exists = this.data.foodList.some(food => food.name === newFoodName.trim())
    if (exists) {
      wx.showToast({
        title: '该食物已存在',
        icon: 'none'
      })
      return
    }

    const newFood = {
      name: newFoodName.trim(),
      emoji: this.getFoodEmoji(newFoodName.trim())
    }

    const newFoodList = [...this.data.foodList, newFood]
    
    // 更新全局数据
    app.globalData.foodList = newFoodList.map(food => food.name)
    
    this.setData({
      foodList: newFoodList,
      showAddModal: false,
      newFoodName: ''
    })

    this.filterFoodList()

    wx.showToast({
      title: '添加成功',
      icon: 'success'
    })
  },

  // 确认编辑食物
  confirmEditFood() {
    const { editFoodName, editFoodIndex } = this.data
    
    if (!editFoodName.trim()) {
      wx.showToast({
        title: '请输入食物名称',
        icon: 'none'
      })
      return
    }

    const newFoodList = [...this.data.foodList]
    newFoodList[editFoodIndex] = {
      name: editFoodName.trim(),
      emoji: this.getFoodEmoji(editFoodName.trim())
    }

    // 更新全局数据
    app.globalData.foodList = newFoodList.map(food => food.name)
    
    this.setData({
      foodList: newFoodList,
      showEditModal: false
    })

    this.filterFoodList()

    wx.showToast({
      title: '编辑成功',
      icon: 'success'
    })
  },

  // 删除食物
  deleteFood(e) {
    const { index, food } = e.currentTarget.dataset
    
    wx.showModal({
      title: '确认删除',
      content: `确定要删除"${food.name}"吗？`,
      success: (res) => {
        if (res.confirm) {
          const newFoodList = [...this.data.foodList]
          newFoodList.splice(index, 1)

          // 更新全局数据
          app.globalData.foodList = newFoodList.map(food => food.name)
          
          this.setData({
            foodList: newFoodList
          })

          this.filterFoodList()

          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 重置食物列表
  resetFoodList() {
    wx.showModal({
      title: '确认重置',
      content: '确定要重置为默认食物列表吗？这将删除所有自定义添加的食物。',
      success: (res) => {
        if (res.confirm) {
          // 重置为默认列表
          const defaultFoodList = [
            '麻辣烫', '火锅', '烤肉', '寿司', '披萨', '汉堡', '炸鸡', '拉面', '炒饭', '盖浇饭',
            '水饺', '馄饨', '包子', '面条', '粥', '汤', '沙拉', '三明治', '意面', '牛排',
            '烤鱼', '小龙虾', '烧烤', '串串香', '冒菜', '酸菜鱼', '宫保鸡丁', '麻婆豆腐', '回锅肉', '鱼香肉丝',
            '糖醋里脊', '红烧肉', '白切鸡', '口水鸡', '辣子鸡', '黄焖鸡', '大盘鸡', '烤鸭', '烧鹅', '叉烧',
            '蒸蛋', '煎蛋', '炒蛋', '蛋炒饭', '蛋包饭', '蛋挞', '蛋糕', '面包', '饼干', '巧克力',
            '冰淇淋', '奶茶', '咖啡', '果汁', '酸奶', '牛奶', '豆浆', '粥', '汤', '茶',
            '水果', '蔬菜', '坚果', '薯片', '爆米花', '糖果', '巧克力', '蛋糕', '面包', '饼干',
            '寿司', '刺身', '天妇罗', '拉面', '乌冬面', '荞麦面', '味噌汤', '纳豆', '梅子', '抹茶',
            '意大利面', '披萨', '意式烩饭', '提拉米苏', '意式冰淇淋', '咖啡', '红酒', '奶酪', '火腿', '橄榄',
            '泰式炒河粉', '冬阴功汤', '咖喱', '芒果糯米饭', '泰式奶茶', '椰汁', '柠檬草茶', '泰式沙拉', '炸春卷', '泰式炒饭'
          ]

          const foodWithEmoji = defaultFoodList.map(food => {
            return {
              name: food,
              emoji: this.getFoodEmoji(food)
            }
          })

          // 更新全局数据
          app.globalData.foodList = defaultFoodList
          
          this.setData({
            foodList: foodWithEmoji,
            searchText: '',
            currentCategory: 'all'
          })

          this.filterFoodList()

          wx.showToast({
            title: '重置成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 空函数，用于阻止事件冒泡
  }
}) 