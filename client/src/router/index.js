import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Profile from '@/components/profilePage'
import ProfileEdit from '@/components/profileEditPage'
import ProjectsPage from '@/components/projectsPage'
import ModulesPage from '@/components/modulesPage'
import EmployeesPage from '@/components/employeesPage'
import Auth from '../utils/Auth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/main',
      name: 'Main',
      component: Auth().isLoggedIn ? Main : HelloWorld
    },
    {
      path: '/user',
      name: 'Profile',
      component: Auth().isLoggedIn ? Profile : HelloWorld
    },
    {
      path: '/useredit',
      name: 'ProfileEdit',
      component: Auth().isLoggedIn ? ProfileEdit : HelloWorld
    },
    {
      path: '/projects',
      name: 'Main',
      component: Auth().isLoggedIn ? ProjectsPage : HelloWorld
    },
    {
      path: '/modules',
      name: 'Main',
      component: Auth().isLoggedIn ? ModulesPage : HelloWorld
    },
    {
      path: '/employees',
      name: 'Main',
      component: Auth().isLoggedIn ? EmployeesPage : HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
