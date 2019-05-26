# 一.GraphQL 介绍

## 1.1 接口开发方式

- restful
- GraphQL

## 1.2 restful 接口问题

- 接口粒度比较细、很多场景需要调用多次才能完成一个功能
- 接口扩展、维护成本高
- 接口响应的数据格式无法预知、目前基本都是使用json

## 1.3 GraphQL概述

````
GraphQL 是一种用于 API 的查询语言、也是一个满足你数据查询的运行时
是一种接口开发标准、支持常见的服务器开发语言
````

## 1.4 GrapgQL 优势

- 精确获取需要的信息
- 通过单个请求获取各种资源
- 通过类型系统描述查询
- 强大的调试工具



# 二. 上手玩玩

## 2.1 服务端

- 创建服务端项目目录

- 初始化项目 npm init -y

- 创建入口文件 index.js

- 安装依赖包

  - Apollo-server-express

  - express

  - graphql

    ```
    npm install apollo-server-express body-parser express graphql graphql-tools -S
    ```

- 复制官方案例代码到index.js

  - [地址](<https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express>)

- 启动

## 2.2 客户端

- 打开 http://localhost:4000/graphql 进行接口测试

```
{
  hello
}
```



# 三.基于apolloServer开发

```
apolloserver 是一个实现了 GraphQL 规范的框架、可以基于apolloserver 快速开发基于 GraphQL 的服务端接口、并且方便客户端进行接口调用
```

## 3.1 开发

- 基本开发步骤-服务端
  - 初始化服务端项目
    - 创建项目目录
    - 创建入口文件
    - 初始化项目
  - 安装依赖
  - 定义类型
  - 解析数据
  - 实例化apollo对象
  - 整合express并监听端口、提供web服务

## 3.2 对象类型定义规则

### 3.2.1 对象类型定义与字段

- GraphQL提供了一套完善的类型系统、可以约束服务端服务端可以提供哪些数据类型供客户端查询使用
- 通过 type 关键字定义类型、type 之后是类型名称(自定义名称)

```
# 课程类型
type Course {
  cname: String
  score: Float
}

# 学生类型
type Student{
  name: String
  scores:[Course]
}
```

- 注意事项
  - 花括号中是对象的字段信息
  - 属性名称是自定义的
  - 属性名后面的类型为标量类型(内置类型)
  - GraphQL 使用 # 注释

![image-20190526223944324](/Users/nordon.wang/Desktop/self/public-node/baas/img-md/image-20190526223944324.png)

### 3.2.2 基本参数

- 对象类型上的每一个字段都可能有零个或者多个参数

```
type Query {
  hello: String
  # 定义字段参数 可以有默认值
  stu(n: Int = 12): Student
}


# 获取参数(通过 resolver 函数的第二个参数获取客户端传递的参数数据)
const resolvers = {
  Query: {
    stu: (obj, args) => {
      console.log(args)
    }
  }
}

# 客户端字段传递
{
  stu(n: 13){
    name
    age
  }
}
```

![WX20190526-225927@2x](/Users/nordon.wang/Desktop/self/public-node/baas/img-md/WX20190526-225927@2x.png)

- 注意事项
  - 参数可以指定默认值、如果有默认值则参数是可选的
  - 客户端可以通过 resolvers 函数的第二个参数获取传递的数据

### 3.3.3 内置类型

- 查询和变更类型

```
内置类型中有两个特殊的类型：Query 和 Mutation

每一个GraphQL 服务有一个 Query 类型、也可能有一个 mutation 类型、这两个类型本质上也是对象类型、唯一的区别就是他们作为客户端访问的入口
```

- 标量类型 — 用于表示基本的字段数据、表示查询数据的叶子节点
  - Int
  - Float
  - String
  - Booleab
  - ID 唯一标识符

- 枚举类型 — 是一种特殊的标量、枚举类型限制在一个特殊的可选值集合内



# 参考网站

[grapgQL官网](<http://graphql.cn/>)

[apolloserver官网](<https://www.apollographql.com/docs/apollo-server/>)

