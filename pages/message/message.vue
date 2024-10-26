<template>
	<div class="container">
		<!-- 头部开始 -->
		<div class="head">
			<div class="left">
				<div class="title">类目:</div>
				<div class="picker">
					<picker @change="bindPickerChange1" :value="index1" :range="array1" class="pick">
						<view>{{array1[index1]}}</view>
					</picker>
					<img src="/static/array.png" alt=""  class="icon"/>
				</div>
			</div>
			<div class="right">
				<div class="title">状态:</div>
				<div class="picker">
					<picker @change="bindPickerChange2" :value="index2" :range="array2" class="pick">
						<view>{{array2[index2]}}</view>
					</picker>
					<img src="/static/array.png" alt=""  class="icon"/>
				</div>
			</div>
		</div>
		<!-- 头部结束 -->
		
		<!-- 消息列表开始 -->
		<div class="message-list">
			<div class="list-item" v-for="(item,index) in messageList" :key="index">
				<div class="item-left">
					<div class="kind">{{ item.kind }}</div>
					<div class="red-dot" v-if="item.dot"></div>
				</div>
				<div class="item-right">
					<div>{{ item.content }}</div>
					<img src="/static/array2.png" alt="" class="ico" />
				</div>
			</div>
		</div>
		<!-- 消息列表结束 -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				index1:0,
				index2:0,
				array1:['全部','安全消息','产品消息','财务消息','运维消息','活动消息','数据汇总'],
				array2:['全部消息','未读','已读'],
				messageList:[
					{kind:'消息提醒',dot:1,content:'说明文字'},
					{kind:'消息提醒',dot:1,content:'说明文字'},
					{kind:'消息提醒',dot:0,content:'说明文字'},
					{kind:'消息提醒',dot:0,content:'说明文字'},
					{kind:'消息提醒',dot:0,content:'说明文字'},
					{kind:'消息提醒',dot:0,content:'说明文字'},
				]
			}
		},
		methods: {
			bindPickerChange1: function(e) {		//改变的事件名
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index1 = e.detail.value
			},
			bindPickerChange2: function(e) {		//改变的事件名
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index2 = e.detail.value
			},
		}
	}
</script>

<style>
	.head{
		height: 60rpx;
		margin: 20rpx;
		display: flex;
		font-size: 28rpx;
	}
	.head .left{
		display: flex;
	}
	.head .right{
		display: flex;
		padding-left: 150rpx;
	}
	.head .title{
		margin-right: 10rpx;
		padding-top: 10rpx;
	}
	.head .picker{
		border-style: solid;
		padding-left: 30rpx;
		width: 160rpx;
		height: 58rpx;
		border-radius: 0.5em;
		border-color: #cccccc;
		border-width: 4rpx;
		display: flex;
		justify-content: space-between;
	}
	.head .pick{
		padding-top: 6rpx;
	}
	.head .icon{
		width: 26rpx;
		height: 26rpx;
		padding-top: 15rpx;
		padding-right: 13rpx;
	}
	.list-item{
		display: block;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		height: 90rpx;
		width: 700rpx;
		padding: 20rpx;
		border-bottom: 1rpx solid #b4b4b4;
	}
	.item-left{
		
		float: left;
		display: flex;
		padding-top: 20rpx;
	}
	.item-right{
		float: right;
		color: #808080;
		display: flex;
		padding-top: 20rpx;
		justify-content: space-between;
	}
	.ico{
		width: 30rpx;
		height: 30rpx;
		padding-top: 8rpx;
		margin-left: 10rpx;
	}
	.red-dot{
		border-radius: 360%;
		width: 10rpx;
		height: 10rpx;
		background-color: #b50000;
	}
</style>
