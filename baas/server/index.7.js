// 1. 导入相关的依赖包
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const uuid = require('uuid')

// 2. 定义数据类型
// Query 类型是默认客户端查询的类型、并且该类型在服务端必须存在并且是唯一的
const typeDefs = gql`
  # 学生类型
  type Student {
    name: String
    age: Int
    gender: Boolean
  }

  # 查询类型
  type Query {
    hello: String
    stu(id: Int, name: String): Student
  }

`;

// 3. 解析数据类型对应的具体数据
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    stu: (parent, args) => {
      let stu = null;

      if(args.id === 1 && args.name === 'nordon'){
        stu = {
          name: 'norodn',
          age: 18,
          gender: true
        }
      }else {
        stu = {
          name: 'null',
          age: 0,
          gender: false
        }
      }

      return stu
    }
  },
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