import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
// import HelloWorld from '@/views/HelloWorld'
import HelloWorld from '@/views/test'
import Login from '@/views/login'
import SignUp from '@/views/signUp'
import Reserve from '@/views/reserve'
import Product from '@/views/product'
import ProductMgnt from '@/views/admin/product'
import ReserveMgnt from '@/views/admin/reserve'
import UserMgnt from '@/views/admin/user'

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
    SIGNUP: "SignUp",
    RESERVE: "Reserve",
    PRODUCT: "Product",
    PRODUCT_MGNT: "ProductMgnt",
    RESERVE_MGNT: "ReserveMgnt",
    USER_MGNT: "UserMgnt"
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
                path: '/reserve',
                name: routeNames.RESERVE,
                component: () => import('@/views/reserve')
            },
            {
                path: '/product',
                name: routeNames.PRODUCT,
                component: Product
            },
            {
                path: '/test',
                name: routeNames.HELLOWORLD,
                component: HelloWorld
            },
            {
                path: '/product-mgnt',
                name: routeNames.PRODUCT_MGNT,
                component: ProductMgnt
            },
            {
                path: '/reserve-mgnt',
                name: routeNames.RESERVE_MGNT,
                component: ReserveMgnt
            },
            {
                path: '/user-mgnt',
                name: routeNames.USER_MGNT,
                component: UserMgnt
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
    next()
})

export default router