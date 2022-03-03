import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
// import HelloWorld from '@/views/HelloWorld'
import HelloWorld from '@/views/test'
import Login from '@/views/login'
import SignUp from '@/views/signUp'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
export const routeNames = {
    LOGIN: "Login",
    HOME: "home",
    HELLOWORLD: "HelloWorld",
    SIGNUP: "SignUp"
}
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    // {
    //     path: '/test',
    //     name: routeNames.HELLOWORLD,
    //     component: HelloWorld
    // },
    {
        path: '/login',
        name: routeNames.LOGIN,
        component: Login
    },
    {
        path: '/signUp',
        name: routeNames.SIGNUP,
        // component: SignUp
        //코드 스필리팅
        component: () => import ('@/views/signUp')
    },
    {
        path: '/home',
        name: routeNames.HOME,
        component: Home,
        children: [
            {
                path: '/test',
                name: routeNames.HELLOWORLD,
                component: HelloWorld
            }
        ]
    }

]

const router = new Router({
    base: '/',
    mode: 'history',
    routes
})

router.beforeEach(async(to, from, next) => {
    console.log("to ==>", to)
    next()
})

export default router