// 1. 导入相关的依赖包
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const uuid = require('uuid')

// 2. 定义数据类型
const typeDefs = gql`
  # 学生类型
  type Student {
    id: ID
    name: String
    gender: Boolean
  }

  # 查询类型
  type Query {
    stu(id: Int): Student
  }

`;

// 3. 解析数据类型对应的具体数据
const resolvers = {
  Query: {
    stu: (parent, args) => {
      if(args.id === 1){
        return {
          id: uuid(),
          name: 'nordon',
          gender: true
        }
      }else{
        return {
          id: uuid(),
          name: 'wangyao',
          gender: false
        }
      }
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