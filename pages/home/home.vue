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
	<div class="workflow-list">
		<h1 style="margin-bottom: 10rpx;">最近访问的Workspace</h1>
		<div class="list2" v-for="(item,index) in workflowList" :key="index" @click="handleTap(item.bindTap)">
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
	
	
</template>

<script>
	export default {
		data() {
			return {
				List:[
					{ iconurl:'/static/workspace.png',title:"Workspace",bindTap:'workspace',num:0},
					{ iconurl:'/static/工作流.png',title:"工作流",bindTap:'workflow',num:0},
					{ iconurl:'/static/notebook.png',title:"NoteBook",bindTap:'notebook',num:0}
				],
				workflowList:[
					{name:'workspace1',time:'2024-08-09',bindTap:'workspace'},
					{name:'workspace2',time:'2024-08-09',bindTap:'workspace2'},
				]
				
			}
		},
		
		methods: {
			
			onClickNew(){
				uni.navigateTo({
					url:"/pages/newWorkspace/newWorkspace"
				})
				console.log("success, 选择创建方式")
			},
			workspace(){
				this.workflowList[0].time = new Date().toLocaleString(); // 修改为当前时间  
				console.log("success, 修改时间为: " + this.workflowList[0].time); 
				console.log("Handling workspace tap");  
			},
			workspace2(){
				this.workflowList[1].time = new Date().toLocaleString(); // 修改为当前时间  
				console.log("success, 修改时间为: " + this.workflowList[1].time); 
				console.log("Handling workspace tap");  
			},
			handleTap(bindTap) {  
			        if (bindTap === 'workspace') {  
			            this.workspace();  
			        } else if (bindTap === 'workspace2') {  
			            this.workspace2();
			            
			        }  
			        // 添加更多的条件以处理其他bindTap值  
			    }  
		}
	}
</script>

<style>
	.header{
		height: 340rpx;
		width: 700rpx;
		background-color: #f2f7fe;
		display: block;
		margin: 0 auto;
		margin-top: 20rpx;
		border-radius: 3%;
	}
	.header .image{
		float: right;
		height: 340rpx;
		width: 550rpx;
		background-color: #a7dafd;
		border-radius: 0 3% 3% 0;

		
	}
	.header .title{
		padding-top: 50rpx;
		margin-left: 20rpx;
		position: absolute;
		z-index: 1;

	}
	.list{
		margin-top: 20rpx;
		text-align: center;
	}
	.i{
		width: 700rpx;
		height: 145rpx;
		background-color: #f6f8fa;
		margin-bottom: 20rpx;
		display: inline-block;
		border-radius: 3%;
	}
	.i .left{
		float: left;
		padding-left: 25rpx;
		display: flex;
		padding-top: 20rpx;
	}
	.left .icon{
		height: 100rpx;
		width: 100rpx;
		padding-right: 15rpx;
	}
	.i .right{
		float: right;
		padding-right: 60rpx;
		padding-top: 40rpx;
		display: flex;
	}
	.right .num{
		font-size: 1.5rem;
	}
	
	.workflow-list{
		display: block;
		margin: 0 auto;
		width: 700rpx;
	}
	.workflow-list .list2-item{
		height: 175rpx;
		width: 100%;
		background-color: #e8f4ff;
		border-radius: 3%;
		margin-bottom: 15rpx;
		box-shadow:2px 2px 3px #9c9c9c;
	}
	.list2-item .name{
		padding-left: 30rpx;
		color: #2064ff;
		padding-top: 20rpx;
		font-weight: 600;
		
	}
	.list2-item .time{
		float: right;
		padding-top: 40rpx;
		padding-right: 20rpx;
		font-size: 26rpx;
	}
	.new-workflow{
		height: 175rpx;
		background-color: #f6f8fa;
		box-shadow:2px 2px 3px #9c9c9c;
		display: block;
		margin: 0 auto;
		width: 700rpx;
		border-radius: 3%;
	}
	.new-workflow .plus{
		font-size: 2em;
		text-align: center;
	}
	.new-workflow .text{
		text-align: center;
		color: #42464e;
	}
</style>
