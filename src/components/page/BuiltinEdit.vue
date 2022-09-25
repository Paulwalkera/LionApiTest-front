<template>
    <div class="table">

        <el-scrollbar style="height:100%" wrap-style="overflow-x:hidden;overflow-y:hidden;">
            <editor
                style="font-size: 13px;"
                v-model="content.code"
                @init="editorInit"
                lang="python"
                theme="monokai"
                width="100%"
                height="600px"
                :options="{
                        enableSnippets:true,
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        showPrintMargin: false
                    }">
            </editor>
        </el-scrollbar>

        <el-row>
            <el-button type="text" @click="Drawer = true">重复显示运行结果</el-button>

            <el-scrollbar wrap-style="overflow-x:hidden;overflow-y:hidden;">
            <el-drawer class='Drawer'
                :visible.sync="Drawer"
                :modal=false
                direction="rtl"
                :withHeader=false
                size="40%">
                <el-scrollbar wrap-style="overflow-x:hidden;overflow-y:hidden;">
                <editor
                    v-model="res"
                    lang="python"
                    theme="monokai"
                    width="100%"
                    height="595px"
                    :options="{
                        showPrintMargin: false
                    }">
                </editor>
                </el-scrollbar>
            </el-drawer>
            </el-scrollbar>
        </el-row>


        <el-row class="btn_class">
            <el-button type="primary" size="medium" style="margin-right: 10px;" @click="back">返回</el-button>
            <el-button type="primary" size="medium" style="margin-right: 10px;" @click="saveBuiltin">保存</el-button>
            <el-button type="danger" size="medium" @click="runCode">在线运行</el-button>
        </el-row>

    </div>
</template>

<script>
import { builtins_code, builtins_update, run_code } from '../../api/api';
    
    export default {
        beforeRouteEnter (to, from, next) {
            // 在路由跳转页面实例化之前被调用, 此时还没有this实例, 但是可以通过next的回调中获取实例的引用
            // console.log("before route enter")
            // console.log(to);
            next(vm => {
                vm.debugtalk_id = vm.$route.params.id;
                // console.log("id = ", vm.debugtalk_id);
                vm.getCode();
            });
            next()
        },
        beforeRouteUpdate (to, from, next) {
            // 路由在同组件之间更新之前被调用
            this.debugtalk_id = to.params.id;
            // console.log("before route update")
            // console.log(to);
            // console.log("id = ", this.debugtalk_id);
            this.getCode();
            next()
        },
        // beforeRouteLeave (to, from, next) {
        //     // 页面离开切换到其他组件之间被调用
        //     console.log("before route leave")
        //     next()
        // },
        // props: ['id'],
        components: {
            editor: require('vue2-ace-editor'),
        },
        name: 'basetable',
        data() {
            return {
                content: {
                    code: ''
                },
                debugtalk_id: null,
                res:'',
                Drawer: false,
            }
        },
        methods: {
            editorInit() {
                require('brace/ext/language_tools');
                require('brace/mode/python');
                require('brace/theme/monokai');
                require('brace/snippets/python');
            },
            // 获取内置函数源码
            getCode() {
                // alert('1111')
                // builtins_code(this.$route.params.id)
                // builtins_code(this.id)
                builtins_code(this.debugtalk_id)
                .then(response => {
                    this.content.code = response.data.debugtalk;
                })
                .catch(error => {
                    this.$message.error('服务器错误');
                })
            },
            // 更新指定的内置函数源码
            saveBuiltin() {
                // builtins_update(this.$route.params.id, this.content)
                // builtins_update(this.id, this.content)
                builtins_update(this.debugtalk_id, this.content.code)
                .then(response => {
                    this.$message.success('更新成功');
                    this.$router.go(-1);
                })
                .catch(error => {
                    this.$message.error('服务器错误');
                })
            },
            // 在线运行
            runCode() {
                run_code(this.content)
                    .then(response => {
                        this.res = response.data.msg
                        this.Drawer = true
                    })
                    .catch(error => {
                        this.$message.error('服务器错误');
                    })
            },
            back(){
                this.$router.go(-1);
            }
        },
        // mounted() {
        //     this.getCode();
        // },
        // created() {
        //     this.getCode();
        // },
    }
</script>

<style scoped>
    .btn_class{
        margin-top: 10px;
    }
    .Drawer{
        height: 580px;
        margin-top: 110px;
        margin-right: 30px;
    }

</style>
