Page({
  data: {
    newsTypes: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    newsInfo: []
  },

  onLoad: function (options) {
    this.getNewsInfo()
  },

  getNewsInfo: function () {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: 'gn'
      },
      success: (res) => {
        let result = res.data.result
        let newsInformation = []
        for (let info of result) {
          newsInformation.push({
            id: info.id,
            title: info.title,
            date: info.date.slice(info.date.indexOf('T') + 1, info.date.indexOf('T') + 6),
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
  }
})
