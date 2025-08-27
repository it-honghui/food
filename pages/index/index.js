const app = getApp()

Page({
  data: {
    wheelRotation: 0,
    isSpinning: false,
    showResult: false,
    currentFood: '',
    foodList: [],
    resultPraise: '',
    showJokeModal: false,
    currentJoke: '',
    jokeIndex: 0,
    currentTheme: {
      primary: '#FF69B4',
      secondary: '#FFB6C1',
      tertiary: '#FFC0CB',
      background: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 50%, #FFE4E1 100%)'
    },
    themes: [
      {
        name: '粉色系',
        primary: '#FF69B4',
        secondary: '#FFB6C1',
        tertiary: '#FFC0CB',
        background: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 50%, #FFE4E1 100%)'
      },
      {
        name: '紫色系',
        primary: '#9C27B0',
        secondary: '#E1BEE7',
        tertiary: '#F3E5F5',
        background: 'linear-gradient(135deg, #E1BEE7 0%, #F3E5F5 50%, #F8F4FF 100%)'
      },
      {
        name: '蓝色系',
        primary: '#2196F3',
        secondary: '#BBDEFB',
        tertiary: '#E3F2FD',
        background: 'linear-gradient(135deg, #BBDEFB 0%, #E3F2FD 50%, #F5F9FF 100%)'
      },
      {
        name: '绿色系',
        primary: '#4CAF50',
        secondary: '#C8E6C9',
        tertiary: '#E8F5E8',
        background: 'linear-gradient(135deg, #C8E6C9 0%, #E8F5E8 50%, #F1F8F1 100%)'
      },
      {
        name: '橙色系',
        primary: '#FF9800',
        secondary: '#FFE0B2',
        tertiary: '#FFF3E0',
        background: 'linear-gradient(135deg, #FFE0B2 0%, #FFF3E0 50%, #FFF8F0 100%)'
      },
      {
        name: '红色系',
        primary: '#F44336',
        secondary: '#FFCDD2',
        tertiary: '#FFEBEE',
        background: 'linear-gradient(135deg, #FFCDD2 0%, #FFEBEE 50%, #FFF5F5 100%)'
      }
    ],
    praises: [
      '小公主最可爱啦～💖',
      '小公主今天也超级棒！🌟',
      '小公主的选择总是对的！✨',
      '小公主是最棒的！💕',
      '小公主今天也要开开心心哦～🌸',
      '小公主的品味真好！🎀',
      '小公主是最聪明的小可爱！💝',
      '小公主今天也要美美的！💫',
      '小公主的选择让人羡慕呢～💖',
      '小公主是最贴心的小天使！👼'
    ],
    jokes: [
      '为什么小公主这么可爱？因为她是天生的可爱精！😄',
      '小公主问：为什么我总是这么可爱？答：因为你是小公主呀！💖',
      '小公主说：我要吃遍天下美食！然后转盘说：好的，今天吃这个！🍽️',
      '小公主的专属笑话：为什么转盘总是听小公主的话？因为它也被小公主的可爱征服了！🎯',
      '小公主问：为什么我这么受欢迎？答：因为你是小公主专属的呀！🌟',
      '小公主说：我要当美食家！转盘说：没问题，今天就从这里开始！🍕',
      '小公主的专属笑话：为什么美食都喜欢小公主？因为小公主最懂得欣赏它们的美味！😋',
      '小公主问：为什么我总是这么开心？答：因为你是快乐的小公主！✨',
      '小公主说：我要当美食博主！转盘说：今天的美食就是你的第一个作品！📸',
      '小公主的专属笑话：为什么小公主这么受欢迎？因为她是小公主专属的可爱精！💝'
    ]
  },

  onLoad() {
    this.initFoodList()
    this.setRandomTheme()
    this.welcomeLittleEar()
  },

  // 设置随机主题颜色
  setRandomTheme() {
    const randomIndex = Math.floor(Math.random() * this.data.themes.length)
    const selectedTheme = this.data.themes[randomIndex]
    
    this.setData({
      currentTheme: selectedTheme
    })
    
    // 将主题信息存储到全局，供其他页面使用
    app.globalData.currentTheme = selectedTheme
  },

  // 欢迎小公主
  welcomeLittleEar() {
    const welcomeMessages = [
      '欢迎小公主来到专属美食世界！💖',
      '小公主，今天想吃什么好吃的呢？🍽️',
      '小公主专属转盘为你服务！🎯',
      '小公主，让我们一起来选择美食吧！✨'
    ]
    const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]
    
    wx.showToast({
      title: randomMessage,
      icon: 'none',
      duration: 3000
    })
  },

  // 初始化食物列表
  initFoodList() {
    const foodList = app.globalData.foodList
    this.setData({
      foodList: foodList
    })
  },

  // 转盘旋转
  spinWheel() {
    if (this.data.isSpinning) return
    
    this.setData({
      isSpinning: true,
      showResult: false
    })

    // 随机选择食物
    const randomIndex = Math.floor(Math.random() * this.data.foodList.length)
    const selectedFood = this.data.foodList[randomIndex]
    
    // 计算旋转角度
    const baseRotation = 360 * 5 // 基础旋转5圈
    const targetRotation = Math.floor(Math.random() * 360) // 随机停止角度
    const totalRotation = baseRotation + targetRotation
    
    this.setData({
      wheelRotation: this.data.wheelRotation + totalRotation
    })

    // 3秒后显示结果
    setTimeout(() => {
      this.setData({
        isSpinning: false,
        showResult: true,
        currentFood: selectedFood
      })
      
      // 转盘结束后自动触发夸夸小公主
      setTimeout(() => {
        this.praiseLittleEar()
      }, 500) // 延迟500ms后触发，让用户先看到结果
    }, 3000)
  },

  // 夸夸小公主
  praiseLittleEar() {
    console.log('夸夸小公主按钮被点击')
    const randomPraise = this.data.praises[Math.floor(Math.random() * this.data.praises.length)]
    
    wx.showModal({
      title: '💝 小公主专属夸夸',
      content: randomPraise,
      showCancel: false,
      confirmText: '谢谢夸奖～',
      confirmColor: this.data.currentTheme.primary,
      success: (res) => {
        console.log('夸夸弹窗显示成功')
      },
      fail: (err) => {
        console.error('夸夸弹窗显示失败:', err)
        // 如果弹窗失败，使用Toast
        wx.showToast({
          title: randomPraise,
          icon: 'none',
          duration: 3000
        })
      }
    })
  },

  // 讲笑话
  tellJoke() {
    const randomJoke = this.data.jokes[Math.floor(Math.random() * this.data.jokes.length)]
    
    this.setData({
      showJokeModal: true,
      currentJoke: randomJoke,
      jokeIndex: Math.floor(Math.random() * this.data.jokes.length)
    })
  },

  // 下一个笑话
  nextJoke() {
    let nextIndex = this.data.jokeIndex + 1
    if (nextIndex >= this.data.jokes.length) {
      nextIndex = 0
    }
    
    this.setData({
      currentJoke: this.data.jokes[nextIndex],
      jokeIndex: nextIndex
    })
  },

  // 隐藏笑话弹窗
  hideJokeModal() {
    this.setData({
      showJokeModal: false
    })
  },

  // 跳转到食物列表页面
  goToFoodList() {
    wx.navigateTo({
      url: '/pages/food-list/food-list'
    })
  },

  // 页面显示时重新初始化
  onShow() {
    this.initFoodList()
    this.setRandomTheme()
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 空函数，用于阻止事件冒泡
  }
}) 