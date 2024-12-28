<template>
	<!-- 头部开始 -->
	<div class="header">
		<img src="/static/bac.png" class="image" />
		<h2 class="title">Hi,欢迎来到生信操作系统Bio-OS</h2>
	</div>
	<!-- 头部结束 -->

	<!-- 功能列表开始 -->
	<div class="list">
		<div class="i" v-for="(item,index) in List" :key="index" @click="handleTap(item.bindTap)">
			<div class="left">
				<img :src="item.iconurl" alt="" class="icon" />
				<p>{{item.title}}</p>
			</div>
			<div class="right">
				<div class="num">{{item.num}}</div>个
			</div>
		</div>
	</div>
	<!-- 功能列表结束 -->

	<!-- 工作流list开始 -->
	<div class="workspace-list">
		<h1 style="margin-bottom: 10rpx;">最近访问的Workspace</h1>
		<div class="list2" v-for="(item,index) in workspaceList" :key="index" @click="handleTap(index)">
			<div class="list2-item">
				<div class="name">{{ item.name }}</div>
				<div class="time">{{ item.time }}</div>
			</div>
		</div>
		<div class="new-workspace" @click="onClickNew">
			<div class="plus">+</div>
			<div class="text">新建Workspace</div>
		</div>
	</div>
	<!-- 工作流list结束 -->


</template>

<script>
	export default {
		data() {
			return {
				List: [{
						iconurl: '/static/workspace.png',
						title: "Workspace",
						bindTap: 'workspace',
						num: 0
					},
					{
						iconurl: '/static/工作流.png',
						title: "工作流",
						bindTap: 'workflow',
						num: 0
					},
					{
						iconurl: '/static/notebook.png',
						title: "NoteBook",
						bindTap: 'notebook',
						num: 0
					}
				],
				workspaceList: [{
						name: 'workspace1',
						time: '2024-08-09',
						bindTap: 'workspace'
					},
					{
						name: 'workspace2',
						time: '2024-08-09',
						bindTap: 'workspace2'
					},
				]

			}
		},
		mounted() {
			const token = JSON.parse(uni.getStorageSync('userData')).access_token;
			console.log(this.token);
			if (token) {
				async function fetchData() {
					try {
						const worksapcesResponse = await uni.request({
							url: 'http://localhost:5000/list_workspaces',
							method: 'GET',
							header: {
								'Authorization': `Bearer ${token}`,
								'Content-Type': 'application/json'
							}
						});
						console.log('请求成功，返回工作空间数据：', worksapcesResponse.data);
						const workspacesData = worksapcesResponse.data;
						uni.setStorageSync('workspacesData', JSON.stringify(workspacesData));

						const worksapces = worksapcesResponse.data;
						console.log(workspacesData);

						this.List[0].num = worksapces.TotalCount;
						this.TotalCount = worksapces.TotalCount;

						let totalWorkflowCount = 0; // 用于累加所有工作流的总数  
						let totalNotebookCount = 0; // 用于累加所有笔记本的总数  
						let cnt = 0;

						const workspaceIDs = []; // 用于保存 WorkspaceID  

						for (const workspace of worksapces.Items || []) {
							try {
								workspaceIDs.push(workspace.ID); // 保存 WorkspaceID  

								const workflowResponse = await uni.request({
									url: 'http://localhost:5000/list_workflows',
									method: 'POST',
									header: {
										'Authorization': `Bearer ${token}`,
										'Content-Type': 'application/json'
									},
									data: {
										WorkspaceID: workspace.ID, // 使用当前工作空间的 ID  
										SortBy: "CreateTime",
										PageNumber: 1,
										PageSize: 10,
										SortOrder: "Desc"
									}
								});
								console.log('请求成功，返回工作流数据：', workflowResponse.data);

								// 累加当前工作空间的工作流总数  
								totalWorkflowCount += workflowResponse.data.TotalCount || 0;
								this.workspaceList[cnt].name = worksapces.Items[cnt].Name;
								this.workspaceList[cnt].time = new Date(worksapces.Items[cnt].UpdateTime * 1000)
									.toLocaleString();
								cnt++;
							} catch (workflowErr) {
								console.error('获取工作流失败：', workflowErr);
							}
						}

						// 将所有工作流的总数设置到 this.List[1].num  
						this.List[1].num = totalWorkflowCount;

						// 循环调用 list_notebook_servers 接口  
						for (const workspaceID of workspaceIDs) {
							try {
								const notebookResponse = await uni.request({
									url: `http://127.0.0.1:5000/list_notebook_servers?WorkspaceID=${workspaceID}`,
									method: 'GET',
									header: {
										'Authorization': `Bearer ${token}`,
										'Content-Type': 'application/json'
									}
								});
								console.log(workspaceID)
								console.log('请求成功，返回笔记本服务器数据：', notebookResponse.data);

								// 累加当前工作空间的笔记本总数  
								totalNotebookCount += notebookResponse.data.TotalCount || 0;
							} catch (notebookErr) {
								console.error('获取笔记本服务器失败：', notebookErr);
							}
						}

						// 将所有笔记本的总数设置到 this.List[2].num  
						this.List[2].num = totalNotebookCount;

					} catch (err) {
						console.error('请求失败：', err);
					}
				}

				// 调用异步函数   
				fetchData.call(this);
			}
		},
		methods: {

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

				console.log("workspace名称为-----", workspacesData.Items[index].Name)

				let name = workspacesData.Items[index].Name;
				console.log("workspace名称为-----", name);
				uni.setStorageSync('workname', name);
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
	.header {
		height: 340rpx;
		width: 700rpx;
		background-color: #f2f7fe;
		display: block;
		margin: 0 auto;
		margin-top: 20rpx;
		border-radius: 3%;
	}

	.header .image {
		float: right;
		height: 340rpx;
		width: 550rpx;
		background-color: #a7dafd;
		border-radius: 0 3% 3% 0;


	}

	.header .title {
		padding-top: 50rpx;
		margin-left: 20rpx;
		position: absolute;
		z-index: 1;

	}

	.list {
		margin-top: 20rpx;
		text-align: center;
	}

	.i {
		width: 700rpx;
		height: 145rpx;
		background-color: #f6f8fa;
		margin-bottom: 20rpx;
		display: inline-block;
		border-radius: 3%;
	}

	.i .left {
		float: left;
		padding-left: 25rpx;
		display: flex;
		padding-top: 20rpx;
	}

	.left .icon {
		height: 100rpx;
		width: 100rpx;
		padding-right: 15rpx;
	}

	.i .right {
		float: right;
		padding-right: 60rpx;
		padding-top: 40rpx;
		display: flex;
	}

	.right .num {
		font-size: 1.5rem;
	}

	.workspace-list {
		display: block;
		margin: 0 auto;
		width: 700rpx;
	}

	.workspace-list .list2-item {
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

	.new-workspace {
		height: 175rpx;
		background-color: #f6f8fa;
		box-shadow: 2px 2px 3px #9c9c9c;
		display: block;
		margin: 0 auto;
		width: 700rpx;
		border-radius: 3%;
	}

	.new-workspace .plus {
		font-size: 2em;
		text-align: center;
	}

	.new-workspace .text {
		text-align: center;
		color: #42464e;
	}
</style>