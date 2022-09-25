<template>
    <el-container>
        <el-header style="background-color: #F7F7F7;; padding: 0; height: 50px;">
            <div style="padding-top: 10px; margin-left: 10px; ">
                <el-row>
                    <el-col :span="15">
                        <el-button
                            type="primary"
                            size="small"
                            icon="el-icon-circle-check-outline"
                            @click="handleConfirm"
                            round
                        >
                            点击保存
                        </el-button>

                        <el-button
                            icon="el-icon-caret-right"
                            type="info"
                            size="small"
                            @click="handleRunCode"
                            round
                        >
                            在线运行
                        </el-button>
                    </el-col>
                    <el-col :span="9">
                        <h2>调试控制台</h2>
                    </el-col>
                </el-row>
            </div>

        </el-header>

        <el-container>
            <el-main style="padding: 0; margin-left: 10px">
                <el-row>
                    <el-col :span="15">
                        <editor
                            v-model="code.code"
                            @init="editorInit"
                            lang="python"
                            theme="monokai"
                            width="100%"
                            :height="codeHeight"
                            :options="{
                                 enableSnippets:true,
                                 enableBasicAutocompletion: true,
                                 enableLiveAutocompletion: true
                             }"
                        >
                        </editor>
                    </el-col>

                    <el-col :span="15">
                        <editor
                            v-model="resp.msg"
                            lang="text"
                            theme="monokai"
                            width="100%"
                            :height="codeHeight"
                        >
                        </editor>
                    </el-col>


                </el-row>

            </el-main>
        </el-container>
    </el-container>

</template>

<script>
import { builtins_code, builtins_update, run_code } from '../../api/api';
export default {
    data() {
        return {
            codeHeight: 500,
            code: {
                code: '',
                id: ''
            },
            resp: {
                msg: ''
            }
        }
    },
    name: "DebugTalk",
    methods: {
        handleRunCode() {
            this.resp.msg = '';
            run_code(this.content)
                .then(response => {
                    this.resp = response.data
                })
        },

        editorInit() {
            require('brace/ext/language_tools');
            require('brace/mode/python');
            require('brace/theme/monokai');
            require('brace/snippets/python');
        },
        getDebugTalk() {
            builtins_code(this.debugtalk_id)
                .then(response => {
                    this.code = response.data;
                })
        }
    },
    components: {
        editor: require('vue2-ace-editor')
    },
    mounted() {
        this.getDebugTalk();
        this.codeHeight = window.screen.height - 248;
    }
}
</script>

<style scoped>

.ace_editor {
    position: relative;
    overflow: hidden;
    font: 18px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace !important;
    direction: ltr;
    text-align: left;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

</style>
