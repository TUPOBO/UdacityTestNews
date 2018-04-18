let newsTypes = [
  {
    id: 0,
    type: 'gn',
    name: '国内'
  },
  {
    id: 1,
    type: 'gj',
    name: '国际'
  },
  {
    id: 2,
    type: 'cj',
    name: '财经'
  },
  {
    id: 3,
    type: 'yl',
    name: '娱乐'
  },
  {
    id: 4,
    type: 'js',
    name: '军事'
  },
  {
    id: 5,
    type: 'ty',
    name: '体育'
  },
  {
    id: 6,
    type: 'other',
    name: '其他'
  }
]

Page({
  data: {
    newsType: newsTypes,
    activeNewsType: '',
    newsInfo: []
  },

  /**
   *页面首次加载时默认显示国内新闻
   *
   * @param {any} options
   */
  onLoad: function () {
    let type = newsTypes[0].type
    this.setNewsActiveType(type)
    this.getNewsInfo(type)
    // console.log(activeNewsType)
  },

  /**
   * 下拉刷新，不改变当前活跃的新闻类别
   *
   */
  onPullDownRefresh: function () {
    function callback () {
      wx.stopPullDownRefresh()
    }
    this.getNewsInfo(this.data.activeNewsType, callback)
    // console.log(activeNewsType)
  },

  /**
   * 点击新闻类别时，改变当前活跃的新闻类别
   *
   * @param {any} type
   */
  setNewsActiveType: function (type) {
    this.setData({
      activeNewsType: type
    })
  },

  /**
   *调用新闻api 获取该类别的新闻信息
   *
   * @param {any} type
   */
  getNewsInfo: function (type, callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: type
      },
      success: res => {
        let result = res.data.result
        this.getNewsList(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  /**
   * 获取新闻id、标题、图片、来源和时间
   *
   * @param {any} result
   */
  getNewsList: function (result) {
    let newsInformation = []
    for (let info of result) {
      newsInformation.push({
        id: info.id,
        title: info.title,
        date: info.date.slice(
          info.date.indexOf('T') + 1,
          info.date.indexOf('T') + 6
        ),
        source: info.source || '未知来源',
        firstImage: info.firstImage || '/image/news-icon.png'
      })
    }
    // console.log(newsInformation)
    this.setData({
      newsInfo: newsInformation
    })
  },

  /**
   * 点击类别栏，改变当前活跃的类别样式及展示该类别的新闻信息
   *
   * @param {any} event
   */
  changeNewsType: function (event) {
    let type = event.currentTarget.dataset.type
    this.setNewsActiveType(type)
    this.getNewsInfo(type)
  },

  /**
   * 点击新闻列表，跳转新闻详情页
   *
   * @param {any} event
   */
  showNewsDetails: function (event) {
    let newsId = event.currentTarget.dataset.id
    console.log(newsId)
    wx.navigateTo({
      url: '/pages/details/newsDetails?id=' + newsId
    })
  }
})
