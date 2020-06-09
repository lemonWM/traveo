import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'
import singlePlace from '@/components/places/singlePlace'

import reservations from '@/components/reservations/reservationsList'
import singleReservationPlace from '@/components/reservations/singleReservationPlace'
import singleReservationDetails from '@/components/reservations/singleReservationDetails'

import articles from '@/components/articles/articlesList'
import singleArticle from '@/components/articles/singleArticle'
import articleCreateNew from '@/components/articles/createNewArticle/articleCreateNew'

import loginUser from '@/components/user/login'
import signUp from '@/components/user/signUp' 

import user from '@/components/user/user'

import { isLoggedIn } from '../utils/jwt'

import upload from '@/components/upload'
import slider from '@/components/slider'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/place/:id',
      name: 'singlePlace',
      component: singlePlace,
      props: true
    },
    {
      path: '/place/:id/reservation',
      name: 'reservationPlace',
      component: singleReservationPlace,
      props: true
    },
    {
      path: '/articles',
      name: 'articles',
      component: articles
    },
    {
      path: '/article/:id',
      name: 'singleArticle',
      component: singleArticle,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: loginUser // zrobic meta jak w cms
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/user/:userName',
      name: 'user',
      component: user,
      props: true
    },
    {
      path: '/article/create-new',
      name: 'articleCreate',
      component: articleCreateNew
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: reservations
    },
    {
      path: '/reservation/:id',
      name: 'singleReservation',
      component: singleReservationDetails,
      props: true,
      meta: {auth: true},
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/slider',
      name: 'slider',
      component: slider
    }
  ]
})

router.beforeEach((to, from, next) => {

  if(to.meta.auth === true) {

    if( isLoggedIn() ){
   
      next()
    } else {

      next({name: 'login'})
    }
  } else  {
    next() 
  }
})

export default router
