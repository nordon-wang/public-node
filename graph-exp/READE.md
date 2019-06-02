# 1 留言板案例实战

## 1.1 项目业务分析与展示

- 留言列表展示效果
- 项目业务分析

## 1.2 服务端实现

- 初始化项目
- 类型定义
- 数据解析
  - 留言板信息
  - 友情链接信息
  - 天气预报信息
  - 添加留言功能

```

```

### 1.2.1 对接数据源

- 对接评论信息数据源
- 对接友情链接数据源
- 对接天气数据源
- 实现数据源整合、完成响应数据的 resolver 函数功能

## 1.3 客户端实现

- 根据 vue-cli 初始化项目
- 简单的布局

### 1.3.1 apollo-server 对接后台接口基本流程

1. 安装相关依赖包

     ```
   npm i -S vue-apollo graphql apollo-boost
   
   // cli3 
   vue add apollo
     ```

2. 配置 Vue 的 apollo 插件

   ```
   import Vue from 'vue'
   import VueApollo from 'vue-apollo'
   Vue.use(VueApollo)
   ```

3. 实例化 apollo 客户端对象

   ```
   import ApolloClient from 'apollo-boost'
   
   const apolloClient = new ApolloClient({
   	uri: 'http://localhost:4000/graphql'
   })
   
   const apolloProvider = new VueApollo({
   	defaultClient: apolloClient
   })
   ```

4. 将 apollo 客户端实例对象挂在到 Vue 实例中

   ```
   new Vue({
   	apolloProvider,
   	render: h => h(App)
   }).$mount('#app')
   ```

5. 导入 GraphQL 相关 api

   ```
   import gql from 'graphql-tag'
   ```

6. 调用 GraphQL 后台接口

   ```
   apollo: {
   	info: {
   		query: gql`
   			query list {
   				info {
   					username
   					content
   					date
   				}
   			}
   		`
   	}
   },
   data() {
   	return {
   		info: [a]
   	}
   }
   ```

### 1.3.2 发送留言

- 表单绑定数据

- 调用后台接口发送数据

  ```
  this.$apollo.mutate({
  	mutation: gql`
  		mutation createComment($commentInput: CommentInput) {
  			createComment(commentInput: $commentInput){
  				username
  				content
  			}
  		}
  	`,
  	variables: {
  		commentInput: {
  			username: username,
  			content: content
  		}
  	},
  	refetchQueries:[{
  		query: QueryListTag
  	}]
  })
  ```

  











