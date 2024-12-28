<template>
	<!-- 顶部 -->
	<div class="header-box">
		<img class="back-img" src="/static/bac.png" alt="" />
		<div class="user-info">
			<div class="head-pic">
				<img class="head-img-content" src="/static/account1.png" mode="aspectFit" />
			</div>
			<div class="inf-content">
				<div class="user-name" @click="updateUsername">{{userName}}</div>
				<div class="id-content">账号ID: {{accountID}}</div>
			</div>
			<button class="upload-id" hover-start-time="0" @click="setGlobal">ID授权</button>
		</div>
	</div>
	<!-- 列表 -->
	<div class="userItemListView">
		<div v-for="(item, index) in menuItems" :key="index" @click="handleTap(item.bindTap)" class="my_priview_md">
			<span>{{ item.text }}</span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userName: '微信用户',
				accountID: '',
				menuItems: [{
						text: '账号管理',
						bindTap: 'acountManage'
					},
					{
						text: '安全设置',
						bindTap: 'security'
					},
					{
						text: 'API访问密钥',
						bindTap: 'APIVisit'
					},
					{
						text: '访问控制',
						bindTap: 'visitControl'
					},
					{
						text: '云审计',
						bindTap: 'cloud'
					},
					{
						text: '配额中心',
						bindTap: 'center'
					},
					{
						text: '资源管理',
						bindTap: 'resources'
					},
					{
						text: '退出登录',
						bindTap: 'exitLogin'
					},
				]
			}
		},
		mounted() {

			const storedObject = JSON.parse(uni.getStorageSync('userData'));
			if (storedObject) {
				this.accountID = storedObject.user_id;
				this.userName = storedObject.username;
			} else {
				console.warn('未找到存储的用户信息');
			}
		},
		methods: {
			handleTap(tapMethod) {
				if (tapMethod === 'exitLogin') {
					this.exitLogin(); // 调用退出登录方法  
				} else {
					this[tapMethod](); // 调用其他方法（如 acountManage, security 等）  
				}
			},
			setGlobal() {
				uni.navigateTo({
					url: "/pages/setaksk/setaksk"
				})
			},
			// aountManage(){

			// },
			// security(){

			// },
			// APIVisit(){},
			// visitControl(){},
			// cloud(){},
			// center(){},
			// resources(){},
			confirmExitLogin() {
				// 使用 Element UI 的 Message Box 显示确认对话框  
				this.$confirm('您确定要退出登录吗？', '警告', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
					})
					.then(() => {
						this.exitLogin(); // 用户确认后调用退出登录逻辑  
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '已取消退出登录',
						});
					});
			},
			exitLogin() {
				localStorage.removeItem('access_token');
				// 跳转到登录页面  
				this.$router.push('/pages/login/login').catch(err => err); // 处理未匹配的导航错误  
			}
		}
	}
</script>

<style>
	.header-box {
		height: 370rpx;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
	}

	.back-img {
		position: absolute;
		width: 100%;
		height: 370rpx;
	}

	.user-info {
		height: 200rpx;
		width: 100%;
		margin-bottom: 50rpx;
		justify-content: left;
		display: flex;
		align-items: center;
		flex-direction: row;
		position: absolute;
	}

	.head-pic {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		background-color: #4281ff;
		color: #ffffff;
		align-items: center;
		display: flex;
		justify-content: center;
		margin-left: 5%;
	}

	.head-img-content {
		position: absolute;
		width: 110rpx;
		height: 110rpx;
		border-radius: 55rpx;
		background-color: white;

	}

	.inf-content {
		display: flex;
		flex-direction: column;
		margin-left: 10rpx;
		align-items: flex-start;
		justify-content: center;
		color: #111212;
		padding-bottom: 5rpx;
	}

	.upload-id {
		float: right;
		background-color: #4281ff;
		color: white;
		font-size: 20rpx;
		font-weight: 500;
		left: 15%;
	}

	.upload-id:hover {
		background-color: #366ad1;
	}

	.user-info {
		text-align: left;
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 8rpx;
	}

	.id-content {
		text-align: center;
		justify-content: center;
		font-size: 24rpx;
		margin-bottom: 2rpx;
	}

	.userItemListView {
		background: #fff;
		padding: 0 0rpx;
		margin: 24rpx 0;
	}

	.userItemListView>div {
		height: 94rpx;
		line-height: 94rpx;
		padding-left: 50rpx;
		border-bottom: 1rpx solid #F1F1F1;
		position: relative;
	}

	/* 移除最后一个元素的下边框 */
	.userItemListView>div:last-child {
		border: none;
	}
</style>