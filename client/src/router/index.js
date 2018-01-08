import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Profile from '@/components/profilePage'
import ProfileEdit from '@/components/profileEditPage'
import AddPartnerPage from '@/components/addpartnerPage'
import PartnersPage from '@/components/partnersPage'
import AddJUserPage from '@/components/addjuserPage'
import JUsersPage from '@/components/jusersPage'
import UsersPage from '@/components/usersPage'
import AddEmployeePage from '@/components/addemployeePage'
import EmployeesPage from '@/components/employeesPage'
import AddServicePage from '@/components/addservicePage'
import ServicesPage from '@/components/servicesPage'
import ListOfPartnersPage from '@/components/listOfPartnersPage'
import ListOfServicesPage from '@/components/listOfServicesPage'
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
      path: '/addpartner',
      name: 'AddPartnerPage',
      component: Auth().isLoggedIn() && Auth().currentUser().type === 'admin' ? AddPartnerPage : Profile
    },
    {
      path: '/partners',
      name: 'PartnersPage',
      component: Auth().isLoggedIn() && Auth().currentUser().type === 'admin' ? PartnersPage : Profile
    },
    {
      path: '/addjuser',
      name: 'AddJUserPage',
      component: Auth().isLoggedIn() && Auth().currentUser().type === 'admin' ? AddJUserPage : Profile
    },
    {
      path: '/jusers',
      name: 'JUsersPage',
      component: Auth().isLoggedIn() && Auth().currentUser().type === 'admin' ? JUsersPage : Profile
    },
    {
      path: '/users',
      name: 'UsersPage',
      component: Auth().isLoggedIn() && Auth().currentUser().type === 'admin' ? UsersPage : Profile
    },
    {
      path: '/addemployees',
      name: 'AddEmployeePage',
      component: (Auth().isLoggedIn() && Auth().currentUser().type === 'partner') || (Auth().isLoggedIn() && Auth().currentUser().type === 'juser') ? AddEmployeePage : Profile
    },
    {
      path: '/employees',
      name: 'EmployeesPage',
      component: (Auth().isLoggedIn() && Auth().currentUser().type === 'partner') || (Auth().isLoggedIn() && Auth().currentUser().type === 'juser') ? EmployeesPage : Profile
    },
    {
      path: '/services',
      name: 'ServicesPage',
      component: (Auth().isLoggedIn() && Auth().currentUser().type === 'partner') || (Auth().isLoggedIn() && Auth().currentUser().type === 'juser') ? ServicesPage : Profile
    },
    {
      path: '/addservices',
      name: 'AddServicePage',
      component: Auth().isLoggedIn() && Auth().currentUser().type === 'partner' ? AddServicePage : Profile
    },
    // {
    //   path: '/addcoupons',
    //   name: 'AddCouponPage',
    //   component: Auth().isLoggedIn() && Auth().currentUser().type === 'partner' ? AddCouponPage : Profile
    // },
    // {
    //   path: '/coupons',
    //   name: 'CouponsPage',
    //   component: Auth().isLoggedIn() && Auth().currentUser().type === 'partner' ? CouponsPage : Auth().isLoggedIn() && Auth().currentUser().type === 'juser' ? CouponsPage : Profile
    // },
    {
      path: '/partnerslist',
      name: 'ListOfPartnersPage',
      component: Auth().isLoggedIn() && Auth().currentUser().type === 'juser' ? ListOfPartnersPage : Profile
    },
    {
      path: '/serviceslist',
      name: 'ListOfServicesPage',
      component: Auth().isLoggedIn() && Auth().currentUser().type === 'juser' ? ListOfServicesPage : Profile
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
