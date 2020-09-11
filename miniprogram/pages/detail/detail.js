var app = getApp();
Page({
	data: {
		item: {}
	},
	onLoad: function(options) {
		const item = JSON.parse(options.item)
		this.setData({
			item: item
		})
	}
})
