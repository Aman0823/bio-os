<template>
	<view class="container">
		<!-- 登录表单 -->
		<view v-if="isLogin">
			<view class="form-item">
				<input v-model="user_id" placeholder="请输入10位用户ID" />
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
				<input v-model="user_id" placeholder="请输入10位用户ID" />
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
				user_id: '',
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
				this.user_id = '';
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
			                user_id: this.user_id,  
			                password: this.password  
			            },  
			            success: (res) => {  
							let id = res.data.id
			                if (res.data.success) {  
			                    // 登录成功的处理逻辑  
			                    console.log('登录成功！', res.data);  
			                    uni.request({  
			                        url: 'http://localhost:5000/set-ak-sk/' + id,  
			                        method: 'GET',  
			                        success: (result) => {  
			                            if (result.data.user_ak == null || result.data.user_sk == null) {  
			                                // 如果密钥不存在  
			                                console.log("密钥不存在，需要手动设置id="+id);  
			                                uni.navigateTo({  
			                                    url: '/pages/setaksk/setaksk'  
			                                });  
			                            } else {  
			                                const ak_sk = {  
			                                    user_ak: result.data.user_ak,  
			                                    user_sk: result.data.user_sk  
			                                };  
			                                uni.setStorageSync('ak_sk', JSON.stringify(ak_sk));  
			                            }  
			                        },  
			                        fail: (err) => {  
			                            console.error('获取密钥请求失败：', err);  
			                        }  
			                    });  
			  
			                    const userData = {  
			                        username: res.data.username,  
			                        user_id: this.user_id  ,
									access_token: res.data.access_token
			                    };  
			                    uni.setStorageSync('userData', JSON.stringify(userData));  
			                    uni.switchTab({  
			                        url: '/pages/home/home'  
			                    });  
			                } else {  
			                    console.log('准备发送的登录数据:', {  
			                        user_id: this.user_id,  
			                        password: this.password  
			                    });  
			                    this.errorMessage = res.data.message || '登录失败，请重试';  
			                    console.log(res.data);  
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
							user_id: this.user_id,
							password: this.password
						},
						success: (res) => {
							if (res.data.success) {
								// 注册成功的处理逻辑  
								console.log('注册成功！', res.data);
								localStorage.setItem('access_token', res.data.access_token); 
								const globalObject = { user_id: this.user_id };  
								uni.setStorageSync('globalObject', JSON.stringify(globalObject)); 
								uni.switchTab({
									url: '/pages/home/home'
								});
							} else {
								console.log('准备发送的登录数据:', {
									user_id: this.user_id,
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
				if (this.user_id.length !== 10) {
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
				if (this.user_id.length !== 10) {
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