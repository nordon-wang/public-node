<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.username" placeholder="请输入内容姓名"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布留言</el-button>
      </el-form-item>
    </el-form>

    <div v-for="(item, index) in info.list" :key="'list' + index">
      <p>{{item.username}} -- {{formatDate(item.date)}}</p>
      <p>{{item.content}}</p>
      <el-divider></el-divider>
    </div>

    <div >
      <el-link 
        v-for="(item, index) in info.link" 
        :key="'link' + index"
        :href='item.linkUrl'
        target="_blank"
        type="primary">{{item.linkName}}</el-link>
    </div>
    
    <el-divider></el-divider>

    <div>
      <el-button type="primary" icon="el-icon-search">{{info && info.weather && info.weather.weather}}</el-button>
      <el-button type="primary" icon="el-icon-search">{{info && info.weather && info.weather.temp1}}</el-button>
    </div>
  </div>
</template>

<script>
// 导入 apollo 客户端相关 api
import gql from 'graphql-tag'
import dayjs from 'dayjs'

let QueryListTag = gql`
  query list{
    info {
      list{
        username
        content
        date
      }
      link{
        linkName
        linkUrl
      }
      weather{
        weather
        temp1
      }
    }
  }
`

export default {
  apollo: {
    info: {
      query: QueryListTag
    }
  },
  data() {
    return {
      // info 表示服务端返回的数据
      info:{
        list:[]
      },
      form: {
        username:'',
        content:''
      }
    };
  },
  computed: {
  },
  methods: {
    formatDate(time){
      // return dayjs(+time).format('MMMM Do YYYY, HH:mm:ss')
      return dayjs(+time).format('YYYY-MM-DD HH:mm:ss')
    },
    onSubmit() {
      const {
        username,
        content
      } = this.form

      // 把数据提交到服务器
      this.$apollo.mutate({
        mutation: gql`
          mutation createComment($commentInput: CommentInput){
            createComment(commentInput: $commentInput){
              username
              content
            }
          }
        `,
        variables:{
          commentInput:{
            username,
            content
          }
        },
        refetchQueries:[{
        query:QueryListTag
        }]
      })

    }
  }
};
</script>