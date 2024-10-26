<template>
	<view class="content">
		<image class="logo" src="https://cloudcache.volccdn.com/eps-cms/prod/image/IMG_829722370.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button class="login-button" @click="onLogin">登录/注册</button>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				title: ''
			}
		},
		onLoad() {

		},
		methods: {
			onLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
				console.log("success, 进入登录/注册")
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.login-button{
		margin-top: 50rpx;
		height: 100rpx;
		width: 500rpx;
		border-radius: 20px;
		background-color: #4281ff;
		color:white;
		font-size: 37rpx;
	}
	.login-button:active{
		background-color: rgb(55, 107, 212);
	}
</style>
