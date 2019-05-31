// 1. 导入相关的依赖包
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// 2. 定义数据类型
// Query 类型是默认客户端查询的类型、并且该类型在服务端必须存在并且是唯一的
const typeDefs = gql`
  # 学生类型
  type Student {
    name: String
    age: Int
    favour: String
  }

  # 查询类型
  type Query {
    hello: String
    stu: Student
  }

`;

// 3. 解析数据类型对应的具体数据
const resolvers = {
  Student: {
    // 提供字段的 resolver 函数、如果不提供会默认生成
    name: (parent) => {
      // return 'wangyao' 会覆盖父节点的 name
      return parent.name // 
    },
    favour: (parent) => {
      if(parent.favour === 'swimming'){
        return '洗澡'
      }else{
        return parent.favour
      }
    }
  },
  Query: {
    hello: (parent, args, context) => {
      return context.db
    },
    stu: (parent) => {
      return {
        name: 'nordon',
        age: 18,
        favour: 'swimming'
      }
    }
  },
};

const context = () => {
  return {
    db: 'dbObj'
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