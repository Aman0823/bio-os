<template>
	<view class="container">
		<view v-for="(item, index) in workflows" :key="index" class="list">
			<view class="title">
				{{ item.title }}
			</view>
			<view class="src">
				{{ item.src }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "ComponentWorkflow",
		data() {
			return {
				workflows: []
			};
		},
		mounted() {
			const Index = uni.getStorageSync('workflowindex');
			const workspaceIndex = parseInt(Index, 10);
			console.log("索引：", workspaceIndex)
			const token = JSON.parse(uni.getStorageSync('userData')).access_token;
			const workspacesDataStr = uni.getStorageSync('workspacesData');
			const workspacesData = JSON.parse(workspacesDataStr);

			if (workspaceIndex >= 0 && workspaceIndex < workspacesData.Items.length) {
				const workspaceId = workspacesData.Items[workspaceIndex].ID;

				uni.request({
					url: 'http://localhost:5000/list_workflows',
					method: 'POST',
					header: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					data: {
						"WorkspaceID": workspaceId,
						"SortBy": "CreateTime",
						"PageNumber": 1,
						"PageSize": 10,
						"SortOrder": "Desc"
					},
					success: (res) => {
						if (res.data && res.data.Items) {
							console.log("有效获取，", res.data)
							this.workflows = res.data.Items.map(item => ({
								title: item.Name,
								src: item.Source  
							}));
						}
					},
					fail(err) {
						console.error('请求失败：', err);
					}
				});
			} else {
				console.error('无效的 workspace 索引');
			}
		},
		methods: {
			// 可以在这里添加其他方法  
		}
	};
</script>

<style>
	.container {
		height: 100%;
		overflow-y: auto;
	}

	.list {
		margin: 0 auto;
		border-bottom: 0.5rpx solid #a5aeaf;
		width: 700rpx;
		min-height: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 10rpx;
		box-sizing: border-box;
	}

	.list .title {
		font-size: 50rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.list .src{
		color: #9d9f9f;
	}
</style>