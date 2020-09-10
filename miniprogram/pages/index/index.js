var app = getApp();
Page({
	data: {
		playIndex: null, //用于记录当前播放的视频的索引值
		videos: []
	},
	onLoad: function(options) {
		this.getList()
	},
	async getList() {
		const db = wx.cloud.database()
		await db.collection("videos").get().then(res => {
			const list = res.data
			this.setData({
				videos: list
			})
		}).catch(err => {
			console.log(err)
		})
	},
	videoPlay: function(e) {
		var curIdx = e.currentTarget.dataset.index;
		// 没有播放时播放视频
		if (!this.data.playIndex) {
			this.setData({
				playIndex: curIdx
			})
			//这里对应的视频id
			var videoContext = wx.createVideoContext('video' + curIdx) 
			videoContext.play()
		} else { 
			// 有播放时先将prev暂停，再播放当前点击的current
			var videoContextPrev = wx.createVideoContext('video' + this.data.playIndex)
			if (this.data.playIndex != curIdx) {
				videoContextPrev.pause()
			}
			this.setData({
				playIndex: curIdx
			})
			var videoContextCurrent = wx.createVideoContext('video' + curIdx)
			videoContextCurrent.play()
		}
	}
})
