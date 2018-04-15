const newsTypes = [
  {
    type: 'gn',
    name: '国内',
    active: true
  },
  {
    type: 'gj',
    name: '国际',
    active: false
  },
  {
    type: 'cj',
    name: '财经',
    active: false
  },
  {
    type: 'yl',
    name: '娱乐',
    active: false
  },
  {
    type: 'js',
    name: '军事',
    active: false
  },
  {
    type: 'ty',
    name: '体育',
    active: false
  },
  {
    type: 'other',
    name: '其他',
    active: false
  }
]

Page({
  data: {
    newsTypes: newsTypes,
    newsInfo: []
  },

  onLoad: function (options) {
    this.getNewsInfo(newsTypes[0].type)
  },

  getNewsInfo: function (type) {
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
        console.log(newsInformation)
        this.setData({
          newsInfo: newsInformation
        })
      }
    })
  },

  changeNewsType: function (event) {
    console.log(event)
    this.getNewsInfo(event.currentTarget.dataset.type)
  }
})
