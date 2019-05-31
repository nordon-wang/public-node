// 1. 导入相关的依赖包
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const db = require('./db')
const uuid = require('uuid')

// 2. 定义数据类型
// Query 类型是默认客户端查询的类型、并且该类型在服务端必须存在并且是唯一的
const typeDefs = gql`

  # 输入类型
  input UserInfo {
    name: String
    pwd: String
  }

  # 用户类型
  type User {
    id: ID
    name: String
    pwd: String
  }

  # 变更类型
  type Mutation {
    addUser(userInfo: UserInfo): User
  }

  # 查询类型
  type Query {
    hello: String
    msg: String
  }

`;

// 3. 解析数据类型对应的具体数据
const resolvers = {
  Query: {
    hello: () => 'hi query',
    msg: () => 'msg query'
  },
  Mutation: {
    addUser: (parent, args) => {
      return {
        id: uuid(),
        name: args.userInfo.name,
        pwd: args.userInfo.pwd
      }
    }
  }
};

const context = ({req}) => {
  return {
    db: db
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