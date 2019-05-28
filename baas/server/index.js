// 1. 导入相关的依赖包
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const uuid = require('uuid')

// 2. 定义数据类型
// Query 类型是默认客户端查询的类型、并且该类型在服务端必须存在并且是唯一的
const typeDefs = gql`
  # 枚举
  enum Favour {
    SWIMMING
    SINGING
    CODING
  }

  # 课程
  type Course {
    cName:String
    cScore: Int
  }

  # 列表
  type Student{
    name: String!
    age:Int
    scores:[Course!]!
  }

  # 输入类型
  input UserInfo{
    name: String
    pwd: String
  }

  #用户类型
  type User {
    id: ID
    name: String
    pwd: String
  }

  # 变更类型
  type Mutation{
    addUserByInput(userInput: UserInfo): User
  }

  # 查询类型
  type Query {
    hello: String
    info: Favour
    stu:Student
  }

`;

// 3. 解析数据类型对应的具体数据
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    info: () => {
      return 'CODING'
    },
    stu: () => {
      return {
        name:'nordon',
        // name:null, 不能为空
        age:18,
        scores:[{
          cName:'数学',
          cScore:99
        },{
          cName:'语文',
          cScore:88
        }]
      }
    },
  },
  Mutation: {
    addUserByInput: (parent, args, context, info) => {
      // parent 当前字段的父级对象 -- Query 中的 hello 相当于根节点，例如查学生中的 name、age 就是子节点
      // args 客户端传递过来的参数
      // context 可以用于操作数据源
      // info 不怎么用
      return {
        id: uuid(),
        name: args.userInput.name,
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