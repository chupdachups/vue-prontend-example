import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../components/login/index'
import SignUp from '@/components/signUp/'

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
  HELLOWORLD: "HelloWorld",
  SIGNUP: "SignUp"
}
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/test',
    name: routeNames.HELLOWORLD,
    component: HelloWorld
  },
  {
    path: '/login',
    name: routeNames.LOGIN,
    component: Login
  },
  {
    path: '/signUp',
    name: routeNames.SIGNUP,
    component: SignUp
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