let newsTypes = [
  {
    id: 0,
    type: 'gn',
    name: '国内',
    active: false
  },
  {
    id: 1,
    type: 'gj',
    name: '国际',
    active: false
  },
  {
    id: 2,
    type: 'cj',
    name: '财经',
    active: false
  },
  {
    id: 3,
    type: 'yl',
    name: '娱乐',
    active: false
  },
  {
    id: 4,
    type: 'js',
    name: '军事',
    active: false
  },
  {
    id: 5,
    type: 'ty',
    name: '体育',
    active: false
  },
  {
    id: 6,
    type: 'other',
    name: '其他',
    active: false
  }
]

const newsListIndex = ['gn', 'gj', 'cj', 'yl', 'js', 'ty', 'other']

Page({
  data: {
    newsType: newsTypes,
    activeNewsType: [],
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
  },

  /**
   * 下拉刷新，不改变当前活跃的新闻类别
   *
   */
  onPullDownRefresh: function () {
    for (let type of newsTypes) {
      if (type.active) {
        function callback () {
          wx.stopPullDownRefresh()
        }
        // console.log(type.type)
        this.setNewsActiveType(type.type)
        this.getNewsInfo(type.type, callback)
      }
    }
  },

  /**
   * 点击新闻类别时，改变当前活跃的新闻类别
   *
   * @param {any} type
   */
  setNewsActiveType: function (type) {
    let index = newsListIndex.indexOf(type)
    newsTypes[index].active = true
    for (let type of newsTypes) {
      if (type.id === index) {
        type.active = true
      } else {
        type.active = false
      }
    }
    this.setData({
      newsType: newsTypes
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
      complete: () => {
        callback && callback()
      }
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
