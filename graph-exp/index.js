// 1. 导入相关的依赖包
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const uuid = require('uuid')

const comment = require('./data-file') // 评论数据源
const weather = require('./data-api') // 天气数据源
const link = require('./data-db') // 友情链接数据源

// 2. 定义数据类型
// Query 类型是默认客户端查询的类型、并且该类型在服务端必须存在并且是唯一的
const typeDefs = gql`
  # 评论
  type Comment {
    username: String
    content: String
    date: String
  }

  # 链接
  type Link {
    linkName: String
    linkUrl: String
  }

  # 天气
  type Weather {
    weather: String
    temp1: String
  }

  # 增加评论
  input CommentInput {
    username: String
    content: String
  }

  type Data {
    list: [Comment],
    link: [Link],
    weather: Weather
  }

  # 查询类型
  type Query {
    info: Data
    msg: String
  }

  # 操作类型
  type Mutation {
    createComment(commentInput: CommentInput): Comment
  }
`;

// 3. 解析数据类型对应的具体数据
const resolvers = {
  Query: {
    msg: () => 'msg info',
    info: async (parent, args, context) => {
      let listStr = await context.comment.getData()
      const list = JSON.parse(listStr)
      const link = await context.link.getData()
      const weather = await context.weather.getData()
      
      return {
        list,
        link,
        weather
      }
    }
  },
  Mutation: {
    createComment: async (parent, args, context) => {
      // 接口客户端传递的数据、 将数据保存在文件中
      const {
        username,
        content
      } = args.commentInput
      
      const res = await context.comment.setData(username, content)

      if(res === 'success'){
        return {
          username,
          content
        }
      }

      return {
        username:'',
        content:''
      }
    }
  }
};

// 提供数据源操作对象
const context = () => {
  return {
    comment,
    weather,
    link
  }
}

// 4. 整合 apolloServer 和 express
// typeDefs, resolvers 两个属性名称是固定的、 属性值可以改变
const server = new ApolloServer({ typeDefs, resolvers, context });

const app = express();
server.applyMiddleware({ app });


// 5. 启动监听
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);