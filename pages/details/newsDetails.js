// pages/details/newsDetails.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    date: '',
    source: '',
    firstImage: '',
    content: [],
    readCount: null
  },

  onLoad: function (options) {
    console.log(options.id)
    this.getNewsDetails(options.id)
  },

  getNewsDetails: function (id) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: id
      },
      success: res => {
        console.log(res)
        let result = res.data.result
        let title = result.title
        let source = result.source || '未知来源'
        let date = result.date.slice(
          result.date.indexOf('T') + 1,
          result.date.indexOf('T') + 6
        )
        let firstImage = result.firstImage || '/image/news-icon.png'
        let readCount = result.readCount
        /**
         * 将数据处理的和官方文档中的格式一样，
         */
        let contents = []
        for (let content of result.content) {
          delete content.id
          if (content.type == 'image') {
            contents.push({
              name: 'img',
              attrs: {
                style: 'width: 100%;margin: 10px 0;',
                src: content.src
              }
            })
          } else if (content.type == 'p' || content.type == 'strong') {
            contents.push({
              name: content.type,
              attrs: {
                style: 'margin: 10px 0;'
              },
              children: [
                {
                  type: 'text',
                  text: content.text
                }
              ]
            })
          }
        }
        // console.log(contents)

        this.setData({
          title: title,
          source: source,
          date: date,
          readCount: readCount,
          // firstImage: firstImage,
          content: contents
        })
      }
    })
  }
})
