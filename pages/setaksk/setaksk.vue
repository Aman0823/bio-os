<template>  
	<view class="container">  
		<view class="title">  
			Access_key  
		</view>  
		<input type="text" v-model="ak" placeholder="请输入ak" />  
		<view class="title">  
			Secret_key  
		</view>  
		<input type="text" v-model="sk" placeholder="请输入sk" />  
		<button @click="upload">提交</button>  
	</view>  
</template>  
  
<script>  
export default {  
	data() {  
		return {  
			ak: '', // 用于绑定Access_key输入框  
			sk: '', // 用于绑定Secret_key输入框  
			// 假设我们有一个user_id，这里用测试值代替  
			userId: 'test_user_id' // 实际应用中应从用户登录信息或其他来源获取  
		};  
	},  
	methods: {  
		upload() {  
			// 检查是否填写了所有必填字段  
			if (!this.ak || !this.sk) {  
				uni.showToast({  
					title: '请填写所有字段',  
					icon: 'none'  
				});  
				return;  
			}  
  
			uni.request({  
				url: 'http://localhost:5000/upload_ak_sk',  
				method: 'POST',  
				header: {  
					'Content-Type': 'application/json' // 根据后端要求设置请求头  
				},  
				data: {  
					user_id: this.userId,  
					user_ak: this.ak,  
					user_sk: this.sk  
				},  
				success: (res) => {  
					// 根据后端返回的响应处理结果  
					if (res.data && res.data.success) {  
						uni.showToast({  
							title: '上传成功',  
							icon: 'success'  
						});  
						// 可以在这里添加其他成功后的逻辑，如跳转页面等  
					} else {  
						uni.showToast({  
							title: '上传失败：' + (res.data ? res.data.message : '未知错误'),  
							icon: 'none'  
						});  
					}  
				},  
				fail: (err) => {  
					uni.showToast({  
						title: '请求失败：' + err.message,  
						icon: 'none'  
					});  
				}  
			});  
		}  
	}  
};  
</script>  
  
<style>  
.container{
	margin-left: 20rpx;
}
.title {  
	margin-top: 10rpx;  
	font-size: 32rpx; /* 可根据需要调整字体大小 */  
	font-weight: bold; /* 可选：加粗标题 */  
	margin: 0 auto;
}  
input {  
	border: 1px solid #000; /* 2px 粗的黑色框线，但这里已经是1px了，保持一致性 */  
	padding: 10rpx; /* 添加内边距以增加可点击区域和文本周围的空白 */  
	margin-top: 10rpx; /* 添加上边距以分隔输入框 */  
	width: 90%; /* 可选：设置输入框宽度 */  
	box-sizing: border-box; /* 确保内边距和边框不会增加元素的总宽度 */ 
	height: 80rpx;
	
}  
button {  
	margin-top: 20rpx;  
	padding: 10rpx 20rpx; /* 设置按钮内边距 */  
	background-color: #007aff; /* 设置按钮背景色 */  
	color: #fff; /* 设置按钮文字颜色 */  
	border: none; /* 移除按钮边框 */  
	border-radius: 5rpx; /* 可选：设置按钮圆角 */  
	width: 90%;
	
}  
</style>