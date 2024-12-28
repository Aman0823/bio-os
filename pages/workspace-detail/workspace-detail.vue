<template>
	<div>
		<scroll-view id="tab" scroll-x="true">
			<view v-for="(item, index) in barNameList" :key="item.id" class="tabName" :data-current="index"
				@click="ontabtap">
				<text class="tabName_text" :class="tabIndex === index ? 'active_text' : ''">{{ item.name }}</text>
			</view>
		</scroll-view>
		<swiper :current="tabIndex" @change="tabChange">
			<swiper-item v-for="(item, index) in barNameList" :key="item.id">
				<component :is="getComponentName(index)" />
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import ComponentData from '@/components/ComponentData.vue';
	import ComponentWorkflow from '@/components/ComponentWorkflow.vue';
	import ComponentHistory from '@/components/ComponentHistory.vue';

	export default {
		name: 'App',
		components: {
			ComponentData,
			ComponentWorkflow,
			ComponentHistory,
		},
		data() {
			return {
				tabIndex: 0,
				barNameList: [{
						name: '数据',
						id: '0'
					},
					{
						name: '工作流',
						id: '1'
					},
					{
						name: '分析历史',
						id: '2'
					},
				],
				barContentList: [],  
			};
		},
		mounted() {
			this.initializeTabs();
		},
		methods: {
			initializeTabs() {
				this.barNameList.forEach((tabBar) => {
					this.barContentList.push({
						data: [],
						isLoading: false,
						refreshText: '',
						loadingText: '加载更多...',
					});
				});
				this.getList(0);
			},
			getList(index) {
				const activeTab = this.barContentList[index];
				if (activeTab.data.length > 0) return;

				activeTab.isLoading = true;
				// 模拟数据获取  
				setTimeout(() => {
					activeTab.data = ['内容1', '内容2', '内容3'];
					activeTab.isLoading = false;
				}, 1000);
			},
			tabChange(e) {
				const index = e.detail.current;
				this.switchTab(index);
			},
			ontabtap(e) {
				const index = e.currentTarget.dataset.current;
				this.switchTab(index);
			},
			switchTab(index) {
				if (this.tabIndex === index) return;

				this.tabIndex = index;
				this.getList(index);
			},
			getComponentName(index) {
				switch (index) {
					case 0:
						return 'ComponentData';
					case 1:
						return 'ComponentWorkflow';
					case 2:
						return 'ComponentHistory';
					default:
						return null;
				}
			},
		},
	};
</script>

<style>
	#tab {
		width: 100%;
		display: flex;
	}

	.tabName {
		text-align: center;
		width: 33.33%;
		display: inline-block;
		height: 50px;
		line-height: 50px;
		white-space: nowrap;
	}

	.tabName_text {
		display: inline-block;
		width: 100%;
		height: 100%;
	}

	.active_text {
		background-color: #4281ff;
		color: #ffffff;
	}
</style>