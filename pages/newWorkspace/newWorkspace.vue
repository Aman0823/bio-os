<template>
	<div class="select">
		<div class="select-list">
			<div class="list-item" v-for="(item,index) in newList" :key="index" @click="handleTap(item.bindTap)">
				<div class="left">
					<img :src="item.imgUrl" class="img" alt="" />
					<div class="text">
						<div class="title">{{ item.title }}</div>
						<div class="content">{{ item.content }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				newList:[
					{imgUrl:'https://lf-cdn-tos.bytescm.com/obj/static/bioos-web-prod/static/image/new-workspce-blank.667f246f.png',
					title:'创建空白 Workspace',content:'填写名称、描述即可创建空白 Workspace',bindTap:'newMargin'},
					{imgUrl:'https://lf-cdn-tos.bytescm.com/obj/static/bioos-web-prod/static/image/new-workspce-digger.6cc5534b.png',
					title:'从公共 Workspace 内复制',content:'可从公共 Workspace 快速复制至 Workspace',bindTap:'newCopy'},
					{imgUrl:'https://lf-cdn-tos.bytescm.com/obj/static/bioos-web-prod/static/image/new-workspace-schema.a2587c3b.png',
					title:'导入 Workspace 文件',content:'通过导入压缩文件构建Workspace',bindTap:'newUpload'}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.select-list .list-item{
	display: block; 	
	margin: 0 auto;	   
	height: 175rpx;
	width: 700rpx;
	background-color: #f6f7fb;
	border-radius: 3%;
	margin-bottom: 15rpx;
	box-shadow:2px 2px 3px #9c9c9c;
	margin-top: 10rpx;

}
.select-list .left{
	float: left;
	display: flex;
	position: relative;
	top: 20%;
}
.list-item .img{
	height: 105rpx;
	width: 180rpx;
}
.list-item .left .title{
	font-weight: bold;
}
.list-item .left .content{
	font-size: 25rpx;
}
</style>
