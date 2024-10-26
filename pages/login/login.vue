<template>
	<view class="container">
		<!-- 登录表单 -->
		<view v-if="isLogin">
			<view class="form-item">
				<input v-model="userId" placeholder="请输入10位用户ID" />
			</view>
			<view class="form-item">
				<input type="password" v-model="password" placeholder="请输入密码（6-16位）" />
			</view>
			<button @click="login">登录</button>
			<text @click="toggleForm">切换到注册</text>
		</view>

		<!-- 注册表单 -->
		<view v-else>
			<view class="form-item">
				<input v-model="userId" placeholder="请输入10位用户ID" />
			</view>
			<view class="form-item">
				<input type="password" v-model="password" placeholder="请输入密码（6-16位）" />
			</view>
			<view class="form-item">
				<input type="password" v-model="rePassword" placeholder="请确认密码" />
			</view>
			<button @click="register">注册</button>
			<text @click="toggleForm">切换到登录</text>
		</view>

		<!-- 错误提示 -->
		<text v-if="errorMessage" class="error">{{ errorMessage }}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: true,
				userId: '',
				password: '',
				rePassword: '',
				errorMessage: ''
			};
		},
		methods: {
			toggleForm() {
				this.isLogin = !this.isLogin;
				this.resetForm();
			},
			resetForm() {
				this.userId = '';
				this.password = '';
				this.rePassword = '';
				this.errorMessage = '';
			},
			login() {
				if (this.validateLogin()) {
					// 发起登录请求  
					uni.request({
						url: 'http://localhost:5000/login',
						method: 'POST',
						
						data: {
							userId: this.userId,
							password: this.password
						},
						success: (res) => {
							if (res.data.success) {
								// 登录成功的处理逻辑  
								console.log('登录成功！', res.data);
								uni.redirectTo({
									url: '/pages/home/home'
								});
							} else {
								console.log('准备发送的登录数据:', {
									userId: this.userId,
									password: this.password
								});
								this.errorMessage = res.data.message || '登录失败，请重试';
								console.log(res.data)
							}
						},
						fail: (err) => {
							this.errorMessage = '请求失败，请检查网络';
							console.error(err);
						}
					});
				}
			},
			register() {
				if (this.validateRegister()) {
					// 发起注册请求  
					uni.request({
						url: 'http://localhost:5000/register', // 替换为你的注册接口  
						method: 'POST',
						header: {
							'Content-Type': 'application/json'
						},
						data: {
							userId: this.userId,
							password: this.password
						},
						success: (res) => {
							if (res.data.success) {
								// 注册成功的处理逻辑  
								console.log('注册成功！', res.data);
								uni.redirectTo({
									url: '/pages/home/home'
								});
							} else {
								console.log('准备发送的登录数据:', {
									userId: this.userId,
									password: this.password
								});
								this.errorMessage = res.data.message || '注册失败，请重试';
							}
						},
						fail: (err) => {
							this.errorMessage = '请求失败，请检查网络';
							console.error(err);
						}
					});
				}
			},
			validateLogin() {
				if (this.userId.length !== 10) {
					this.errorMessage = '用户ID必须为10位';
					return false;
				}
				if (this.password.length < 6 || this.password.length > 16 || !this.password) {
					this.errorMessage = '密码长度必须为6-16位且不能为空';
					return false;
				}
				this.errorMessage = '';
				return true;
			},
			validateRegister() {
				if (this.userId.length !== 10) {
					this.errorMessage = '用户ID必须为10位';
					return false;
				}
				if (this.password.length < 6 || this.password.length > 16 || !this.password) {
					this.errorMessage = '密码长度必须为6-16位且不能为空';
					return false;
				}
				if (this.password !== this.rePassword) {
					this.errorMessage = '两次输入的密码不一致';
					return false;
				}
				this.errorMessage = '';
				return true;
			}
		}
	};
</script>

<style>
	.container {
		padding: 20px;
	}

	.form-item {
		margin-bottom: 15px;
	}

	.error {
		color: red;
	}
</style>