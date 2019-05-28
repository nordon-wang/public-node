// 1. 导入相关的依赖包
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// 2. 定义数据类型
// Query 类型是默认客户端查询的类型、并且该类型在服务端必须存在并且是唯一的
const typeDefs = gql`
  # 课程类型
  type Course {
    cname: String
    score: Float
  }

  # 学生类型
  type Student{
    name: String
    age: Int
    scores:[Course]
  }

  # 查询类型
  type Query {
    hello: String
    stu(n: Int = 18): Student
  }

`;

// 3. 解析数据类型对应的具体数据
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    stu: (obj, args) => { // 提供学生相关的数据
      console.log('-----',args);
      
      const courseData = [{
        cname:"数学",
        score:66
      },{
        cname:'语文',
        score:88
      }]

      if(args.n > 10){
        return {
          name:'nordon',
          age:args.n,
          scores:courseData
        }
      }else{
        return {
          name:'nordon',
          age:8,
          scores:courseData
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