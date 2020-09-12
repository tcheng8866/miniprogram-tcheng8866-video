var app = getApp();
Page({
	data: {
		play: '/images/bofang.png',
		weixin: '/images/weixin.png',
		list: [],
		introduceShow: false
	},
	onLoad: function(options) {
		this.getList()
	},
	async getList() {
		const db = wx.cloud.database()
		await db.collection("videos").get().then(res => {
			const list = res.data
			if (list.length == 0 ) {
			this.setData({
				introduceShow: true
			})
			}
			this.setData({
				list
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
