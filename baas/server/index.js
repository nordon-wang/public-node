// 1. 导入相关的依赖包
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const uuid = require('uuid')

// 2. 定义数据类型
// Query 类型是默认客户端查询的类型、并且该类型在服务端必须存在并且是唯一的
const typeDefs = gql`
  #输入类型
  input UserInfo {
    uname: String
    pwd: String
  }

  # 用户类型
  type User {
    id: ID
    uname: String
    pwd: String
  }

  # 变更类型
  type Mutation {
    addUserByParams(uname: String, pwd: String): User
    addUserByInput(userInput: UserInfo): User
  }

  # 查询类型
  type Query {
    hello: String
  }

`;

// 3. 解析数据类型对应的具体数据
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  },
  Mutation: {
    addUserByParams: (parent, args) => {
      return {
        id: uuid(),
        uname: args.uname,
        pwd: args.pwd
      }
    },
    addUserByInput: (parent, args) => {
      return {
        id: uuid(),
        uname: args.userInput.uname,
        pwd: args.userInput.pwd
      }
    }
  }
};

// 4. 整合 apolloServer 和 express
// typeDefs, resolvers 两个属性名称是固定的、 属性值可以改变
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });


// 5. 启动监听
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);