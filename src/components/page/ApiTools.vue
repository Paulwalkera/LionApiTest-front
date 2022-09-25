<template>
    <div>{{ this.case_id }}</div>
</template>

<script>

import { get_detail_testcase } from '@/api/api';

export default {
    name: 'test',
    data(){
        return{
            case_id: '',
        }
    },
    created() {
        this.$EventBus.$off('sendMsg')
        // 监听到TestCases组件点击事件才会走下面,如果没点击事件直接进入页面就不会请求接口
        this.$EventBus.$on('sendMsg',(msg)=>{
            this.case_id = msg
            this.getTestcaseDetail() // 获取接口数据
        })
    },
    methods:{
        getTestcaseDetail(){
            get_detail_testcase(this.case_id)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    this.$message.error('服务器错误');
                })
        },
    },
};
</script>

<style scoped>

</style>