<template>
	<div class="container">
		<!-- 头部开始 -->
		<div class="head">
			<div class="picker">
				<picker @change="bindPickerChange" :value="index" :range="array" class="pick">
					<view>{{array[index]}}</view>
				</picker>
				<div>
					<img src="/static/array.png" alt="" class="icon" />
				</div>
			</div>
			<div class="input">
				<input class="uni-input" confirm-type="search" placeholder="搜索关键词" />
			</div>
		</div>
		<!-- 头部结束 -->

		<!-- 工作流list开始 -->
		<div class="workflow-list">
			<div class="list2" v-for="(item,index) in workspaceList" :key="index" @click="handleTap(index)">
				<div class="list2-item">
					<div class="name">{{ item.name }}</div>
					<div class="time">{{ item.time }}</div>
				</div>
			</div>
			<div class="new-workflow" @click="onClickNew">
				<div class="plus">+</div>
				<div class="text">新建Workspace</div>
			</div>
		</div>
		<!-- 工作流list结束 -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				array: ['按 访问时间 排序', '按 名称 排序', '按 创建时间 排序'],
				workspaceList: []
			}
		},
		mounted() {
			const token = JSON.parse(uni.getStorageSync('userData')).access_token;
			const workspacesDataStr = uni.getStorageSync('workspacesData');
			if (workspacesDataStr) {
				const workspacesData = JSON.parse(workspacesDataStr);
				console.log(token);
				console.log(workspacesData);
				this.transformWorkspacesData(workspacesData); // 直接传递解析后的数据  
			} else {
				console.error('未找到存储的workspacesData');
			}
		},
		created() {
			this.transformWorkspacesData();
		},
		methods: {
			transformWorkspacesData(data) {
				this.workspaceList = data.Items.map(item => ({
					name: item.Name,
					time: new Date(item.UpdateTime * 1000).toLocaleString()
				}));
			},
			bindPickerChange: function(e) { //改变的事件名
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			onClickNew() {
				uni.navigateTo({
					url: "/pages/newWorkspace/newWorkspace"
				})
				console.log("success, 选择创建方式")
			},
			handleTap(index) {
				console.log("你点击了" + index);
				const workspacesDataStr = uni.getStorageSync('workspacesData');
				const workspacesData = JSON.parse(workspacesDataStr);
				
				uni.setStorageSync('workflowindex',index);
				let i = uni.getStorageSync('workflowindex');
				console.log("索引是,",i)
				console.log("workspace名称为-----", workspacesData.Items[index].Name)

				let name = workspacesData.Items[index].Name;
				console.log("workspace名称为-----", name);

				// 如果您确实需要存储这个值，可以这样做：  
				uni.setStorageSync('workname', name);

				// 立即检索并打印出来以确认存储是否成功（这一步是可选的）  
				let retrievedName = uni.getStorageSync('workname');
				console.log("从存储中检索到的名字是：", retrievedName);
				uni.navigateTo({
					url: `/pages/workspace-detail/workspace-detail?index=${index}&workspaceName=${name}`
				});

			}
		}
	}
</script>

<style>
	.head {
		display: flex;
	}

	.picker {
		border-style: solid;
		width: 270rpx;
		height: 58rpx;
		border-radius: 0.7em;
		border-color: #cccccc;
		margin-top: 10rpx;
		margin-left: 20rpx;
		border-width: 4rpx;
		display: flex;
		justify-content: space-between;
	}

	.picker {
		padding-left: 10rpx;
		padding-top: 12rpx;
		font-size: 28rpx;
	}

	.icon {
		width: 30rpx;
		height: 30rpx;
		padding-top: 8rpx;
		padding-right: 16rpx;
	}

	.workflow-list {
		display: block;
		margin: 0 auto;
		width: 700rpx;
	}

	.workflow-list .list2-item {
		height: 175rpx;
		width: 100%;
		background-color: #e8f4ff;
		border-radius: 3%;
		margin-bottom: 15rpx;
		box-shadow: 2px 2px 3px #9c9c9c;
	}

	.list2-item .name {
		padding-left: 30rpx;
		color: #2064ff;
		padding-top: 20rpx;
		font-weight: 600;

	}

	.list2-item .time {
		float: right;
		padding-top: 40rpx;
		padding-right: 20rpx;
		font-size: 26rpx;
	}

	.new-workflow {
		height: 175rpx;
		background-color: #f6f8fa;
		box-shadow: 2px 2px 3px #9c9c9c;
		display: block;
		margin: 0 auto;
		width: 700rpx;
		border-radius: 3%;
	}

	.new-workflow .plus {
		font-size: 2em;
		text-align: center;
	}

	.new-workflow .text {
		text-align: center;
		color: #42464e;
	}

	.input {
		margin: 20rpx;
		width: 400rpx;
		border-style: solid;
		height: 70rpx;
		border-radius: 0.7em;
		border-color: #cccccc;
		margin-top: 10rpx;
		margin-left: 20rpx;
		border-width: 4rpx;
	}

	.uni-input {
		padding-top: 10rpx;
		padding-left: 20rpx;
	}
</style>