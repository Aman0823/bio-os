<template>
	<view>
		<view class="table-container">
			<table class="table">  
				<thead>  
					<tr>  
						<th>投递名称</th>  
						<th>分析状态</th>  
						<th>执行结果</th>  
						<th>开始时间</th>  
						
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
</template>

<script>
	export default {
		name:"ComponentHistory",
		data() {
			return {
				tableData: [] // 默认空数组，存储表格内容
			};
		}
	}
</script>

<style>
.head {  
	justify-content: space-between;  
	align-items: center;  
	margin-bottom: 16px;  
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