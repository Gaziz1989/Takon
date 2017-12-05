import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Profile from '@/components/profilePage'
import ProfileEdit from '@/components/profileEditPage'
import ProjectsPage from '@/components/projectsPage'
import AddingProjectPage from '@/components/addingProjectPage'
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
      name: 'ProjectsPage',
      component: Auth().isLoggedIn() && Auth().currentUser().type === 'admin' ? ProjectsPage : Profile
    },
    {
      path: '/addproject',
      name: 'AddingProjectPage',
      component: Auth().isLoggedIn() && Auth().currentUser().type === 'admin' ? AddingProjectPage : Profile
    },
    {
      path: '/modules',
      name: 'ModulesPage',
      component: Auth().isLoggedIn() && Auth().currentUser().type === 'admin' ? ModulesPage : Profile
    },
    {
      path: '/employees',
      name: 'EmployeesPage',
      component: Auth().isLoggedIn() && Auth().currentUser().type === 'admin' ? EmployeesPage : Profile
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
