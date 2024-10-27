<template>  
	<view class="container">  
		<!-- 头部 -->  
		<view class="head">  
			<view class="title">  
				Workspace: {{ workspaceName }}  
			</view>  
			<view class="left">  
				<button class="uploadFile" @click="upload">上传文件</button>  
				<button class="new-folder" @click="new_folder">创建文件夹</button>  
				<button class="copy">复制</button>  
				<button class="download">下载</button>  
			</view>  
		</view>  
		<!-- 数据显示 -->  
		<view class="box">  
			<view class="table-container">  
				<table class="table">  
					<thead>  
						<tr>  
							<th>文件名</th>  
							<th>大小</th>  
							<th>修改时间</th>  
							<th>操作</th>  
						</tr>  
					</thead>  
					<tbody>  
						<tr v-for="(item, index) in tableData" :key="index">  
							<td>{{ item.fileName || '无' }}</td>  
							<td>{{ item.size || '0 KB' }}</td>  
							<td>{{ item.modifiedTime || '未知' }}</td>  
							<td>  
								<button @click="handleOperation(index)">操作</button>  
							</td>  
						</tr>  
						<!-- 如果没有数据，这里不会显示任何行，但你可以添加一个提示信息 -->  
						<tr v-if="tableData.length === 0">  
							<td colspan="4" class="no-data">暂无数据</td>  
						</tr>  
					</tbody>  
				</table>  
			</view>  
		</view>  
	</view>  
</template>  
  
<script>  
export default {  
	name: "ComponentData",  
	data() {  
		return {  
			workspaceName: '', // 你需要定义这个变量或者从props/vuex中获取  
			tableData: [] // 默认空数组，存储表格内容  
		};  
	},  
	mounted() {
		const token = JSON.parse(uni.getStorageSync('userData')).access_token;
		console.log(token);
		let retrievedName = uni.getStorageSync('workname');
		console.log("名称为：",retrievedName)
		this.workspaceName = retrievedName
	},
	methods: {  
		upload() {  
			// 上传文件的逻辑  
		},  
		new_folder() {  
			// 创建文件夹的逻辑  
		},  
		handleOperation(index) {  
			// 处理操作按钮的点击事件  
			console.log('操作了第', index + 1, '行的数据');  
			
		}  
		
	}  
};  
</script>  
  
<style scoped>  
.container {  
	padding: 20px;  
}  
  
.head {  
	/* display: flex;  */
	justify-content: space-between;  
	align-items: center;  
	margin-bottom: 20px;  
}  
  
.title {  
	font-size: 24px;  
	font-weight: bold;  
	margin-bottom: 20rpx;
}  
  
.left {  
	display: flex;  
	gap: 10px;  
}  
  
button {  
	padding: 10rpx 20rpx 0 20rpx;  
	cursor: pointer;  
	font-size: 25rpx;
}  
  
.table-container {  
	overflow-x: auto; /* 如果表格太宽，允许水平滚动 */  
}  
  
.table {  
	width: 100%;  
	border-collapse: collapse;  
}  
  
.table th, .table td {  
	border: 1px solid #ddd;  
	padding: 8px;  
	text-align: left;  
}  
  
.table th {  
	background-color: #f2f2f2;  
	font-size: 25rpx;
}  
  
.no-data {  
	text-align: center;  
	color: #999;  
}  
</style>