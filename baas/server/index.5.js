// 1. 导入相关的依赖包
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const db = require('./db')

// 2. 定义数据类型
// Query 类型是默认客户端查询的类型、并且该类型在服务端必须存在并且是唯一的
const typeDefs = gql`
  # 学生
  type Student {
    name: String
    age: Int
  }
  
  type Hero {
    name: String
    age: Int
  }

  # 查询类型
  type Query {
    hello: [Student!]!,
    hero: Hero
  }

`;

// 3. 解析数据类型对应的具体数据
const resolvers = {
  Query: {
    hello: async (parent, args, context, info) => {
      const ret = await context.db.getData()
      return JSON.parse(ret)
    },
    hero: () => {
      return {
        name: 'nordon',
        age: 18
      }
    }
  },
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