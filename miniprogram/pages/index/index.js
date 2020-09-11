var app = getApp();
Page({
	data: {
		play: '/images/bofang.png',
		weixin: '/images/weixin.png',
		list: []
	},
	onLoad: function(options) {
		this.getList()
	},
	async getList() {
		const db = wx.cloud.database()
		await db.collection("videos").get().then(res => {
			this.setData({
				list: res.data
			})
		}).catch(err => {
			console.log(err)
		})
	},
	toDetail(e) {
		const item = e.currentTarget.dataset.item
		wx.navigateTo({
			url: '/pages/detail/detail?item=' + JSON.stringify(item)
		})
	}
})
