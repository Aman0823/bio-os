<template>
	<div class="select">
		<div class="select-list">
			<div class="list-item" v-for="(item, index) in newList" :key="index" @click="handleTap(item.bindTap)">
				<div class="left">
					<img :src="item.imgUrl" class="img" alt="" />
					<div class="text">
						<div class="title">{{ item.title }}</div>
						<div class="content">{{ item.content }}</div>
					</div>
				</div>
			</div>
		</div>

		<div class="form-container">
			<div v-if="activeForm === 'newMargin'" class="margin-form">
				<h3>创建空白 Workspace</h3>
				<form @submit.prevent="submitForm">
					<div>
						<label for="name">名称:</label>
						<input type="text" v-model="formData.Name" id="name" required />
					</div>
					<div>
						<label for="description">描述:</label>
						<input type="text" v-model="formData.Description" id="description" required />
					</div>
					<button type="submit">提交</button>
				</form>
				<text>{{ responseMessage }}</text>
			</div>

			<div v-if="activeForm === 'newCopy'" class="copy-form">
				<h3>从公共 Workspace 内复制</h3>
				<div class="grid">
					<div class="grid-item" v-for="index in 9" :key="index">
						<div class="grid-content">Workspace {{ index }}</div>
					</div>
				</div>
			</div>

			<div v-if="activeForm === 'newUpload'" class="upload-form">
				<h3>导入 Workspace 文件</h3>
				<button @click="chooseFile">上传文件</button>
				<text>{{ responseMessage }}</text>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				newList: [{
						imgUrl: 'https://lf-cdn-tos.bytescm.com/obj/static/bioos-web-prod/static/image/new-workspce-blank.667f246f.png',
						title: '创建空白 Workspace',
						content: '填写名称、描述即可创建空白 Workspace',
						bindTap: 'newMargin',
					},
					{
						imgUrl: 'https://lf-cdn-tos.bytescm.com/obj/static/bioos-web-prod/static/image/new-workspce-digger.6cc5534b.png',
						title: '从公共 Workspace 内复制',
						content: '可从公共 Workspace 快速复制至 Workspace',
						bindTap: 'newCopy',
					},
					{
						imgUrl: 'https://lf-cdn-tos.bytescm.com/obj/static/bioos-web-prod/static/image/new-workspace-schema.a2587c3b.png',
						title: '导入 Workspace 文件',
						content: '通过导入压缩文件构建Workspace',
						bindTap: 'newUpload',
					},
				],
				activeForm: 'newMargin', // 激活表单类型  
				formData: {
					Name: '',
					Description: ''
				},
				responseMessage: ''
			};
		},
		// mounted() {  
		//   console.log('组件已挂载，activeForm:', this.activeForm);  
		//   // 尝试手动调用 submitForm  
		//   this.submitForm();  
		// },
		methods: {
			handleTap(bindTap) {
				this.activeForm = bindTap;
				this.formData = {
					Name: '',
					Description: ''
				};
				this.responseMessage = '';
			},
			submitForm() {
				console.log('提交数据:', this.formData);
				const token = JSON.parse(uni.getStorageSync('userData')).access_token;
				console.log('Token:', token); // 输出 token 进行调试  

				uni.request({
					url: 'http://127.0.0.1:5000/create_workspace',
					method: 'POST',
					header: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
					data: this.formData,
					success: (response) => {
						if (response.data.error){
							console.log(response.data);
							this.responseMessage = '请求失败！'
						}
						else{
							console.log(response.data);
							this.responseMessage = '请求成功！';
						}
						
					},
					fail: (error) => {
						console.error('请求失败:', error);
						this.responseMessage = '创建 Workspace 失败，请重试。';
					},
				});
			},
			chooseFile() {
				uni.chooseFile({
					count: 1,
					type: 'all',
					success: (res) => {
						const file = res.tempFiles[0];
						const filePath = file.path;
						const fileName = file.name;
						if (this.isZipFile(fileName)) {
							this.uploadFile(filePath);
						} else {
							this.responseMessage = '请选择一个ZIP文件！';
						}
					},
					fail: (error) => {
						console.error('选择文件失败:', error);
						this.responseMessage = '选择文件失败，请重试。'; // 错误消息  
					},
				});
			},
			isZipFile(fileName) {
				const zipPattern = /\.zip$/i;
				return zipPattern.test(fileName);
			},
			uploadFile(filePath) {
				console.log('上传的文件:', filePath);

				uni.uploadFile({
					url: 'http://127.0.0.1:5000/upload_file',
					filePath: filePath,
					name: 'file',
					success: (uploadResponse) => {
						console.log('上传成功:', uploadResponse.data);
						this.responseMessage = '文件上传成功！';
					},
					fail: (uploadError) => {
						console.error('上传失败:', uploadError);
						this.responseMessage = '文件上传失败，请重试。';
					},
				});
			},
		},
	};
</script>

<style scoped>
	.select-list .list-item {
		display: block;
		margin: 0 auto;
		height: 175rpx;
		width: 700rpx;
		background-color: #f6f7fb;
		border-radius: 3%;
		margin-bottom: 15rpx;
		box-shadow: 2px 2px 3px #9c9c9c;
		margin-top: 10rpx;

	}

	.select-list .left {
		float: left;
		display: flex;
		position: relative;
		top: 20%;
	}

	.list-item .img {
		height: 105rpx;
		width: 180rpx;
	}

	.list-item .left .title {
		font-weight: bold;
	}

	.list-item .left .content {
		font-size: 25rpx;
	}
</style>