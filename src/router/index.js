import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/views/Home'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Home
        }
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    ]
})
