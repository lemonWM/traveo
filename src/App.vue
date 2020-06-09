<template>
  <div id="app">
    <header class="header">
      <div class="main-menu">
        <nav id="navigation" class="main-nav">
          <button class="btn btn-secondary logo-btn" @click="goHome">
              <img src="./img/logo.png" alt="">
          </button>
          <router-link :to="{name: 'home'}">Home</router-link>
          <router-link :to="{name: 'articles'}">Articles</router-link>
          <router-link :to="{name: 'reservations'}">Reservations</router-link>
        </nav>
        <nav id="userSection" class="userPanel">
          <div v-if="!loggedIn">
            <router-link :to="{name: 'login'}">Log in</router-link>
            <router-link :to="{name: 'signUp'}">Sign up</router-link>
          </div>
          <div v-else>
            <router-link :to="{name: 'user' , params: {userName: loggedIn}}" class="logged-user">
              <i class="fa fa-user-circle"></i> {{loggedIn}}
            </router-link>
            <button @click="logout" class="btn">
              <i class="fas fa-power-off"></i>
            </button>
          </div>
        </nav>
      </div>
      <mobileNav  class="mobile-nav"/>
    </header>
    <transition name="fade" mode='out-in'> 
       <router-view/>
    </transition>
    <footer class="footer"></footer>
  </div>
</template>


<script>

import { logOut } from './utils/jwt'
import mobileNav from './components/mobileNav'

export default {
  name: 'App',
  data() {
    return {
      user: this.$store.state.loggedUser,
    }
  },
  computed: {
    
      loggedIn(){

          return this.$store.state.loggedUser
      }
  },
  methods: {
    
    logout(){

      this.$router.push({name: 'home'})
        
      logOut()
    },
    goHome(){

      if(window.location.pathname !== '/'){
        
        this.$router.push({name: 'home'})
      }
    }
  },
  components:{
    mobileNav
  }
}
</script>



