import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入 apollo 相关插件
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueApollo)

// 产生 apollo 对应客户端实例对象
const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

// 挂载 apollo
new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
