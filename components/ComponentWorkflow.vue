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
								src: item.Source // 假设后端返回的是 Source 而不是 src  
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
		/* 确保容器有足够的高度 */
		overflow-y: auto;
		/* 如果内容超出容器高度，允许垂直滚动 */
	}

	.list {
		margin: 0 auto;
		border-bottom: 0.5rpx solid #a5aeaf;
		width: 700rpx;
		/* 可以设置一个最小高度，或者根据内容动态调整高度 */
		min-height: 150rpx;
		/* 示例值，根据实际情况调整 */
		display: flex;
		/* 使用 Flexbox 布局 */
		flex-direction: column;
		/* 子元素垂直排列 */
		align-items: flex-start;
		/* 子元素在交叉轴（水平方向）上对齐到起始位置 */
		padding: 10rpx;
		/* 添加内边距以提供空间 */
		box-sizing: border-box;
		/* 确保内边距和边框不会增加元素的总宽度 */
	}

	.list .title {
		font-size: 50rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
		/* 调整下边距以适应内容 */
	}
	.list .src{
		color: #9d9f9f;
	}
</style>