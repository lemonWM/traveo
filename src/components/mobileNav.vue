<template>
    <div class="navigation-wrapper">
        <div class="main-panel">
            <div class="logo">
                <button class="btn btn-secondary btn-logo" @click="goHome">
                    <img src="../img/logo.png" alt="" >
                </button>
            </div>
            <div class="burger-menu">
                <button class="btn btn-secondary" @click="activeMenu">
                    <img src="../img/open.png" alt="" v-if="!active">
                    <img src="../img/close.png" alt="" v-else>
                </button>
            </div>
        </div>
        <div class="navigation" v-if="active">
            <nav id="navigation" class="main-nav">
                <router-link :to="{name: 'home'}" @click.native="activeMenu">
                    <img src="../img/home.png" alt="">
                    Home
                </router-link>
                <router-link :to="{name: 'articles'}" @click.native="activeMenu">
                    <img src="../img/articles.png" alt="">
                    Articles
                </router-link>
                <router-link :to="{name: 'reservations'}" @click.native="activeMenu">
                    <img src="../img/reservations.png" alt="">
                    Reservations
                </router-link>
            </nav>
            <nav id="userSection" class="userPanel">
                <div v-if="!loggedIn">
                    <router-link :to="{name: 'login'}" @click.native="activeMenu">
                        <img src="../img/login.png" alt="">
                        Log in
                    </router-link>
                    <router-link :to="{name: 'signUp'}" @click.native="activeMenu">
                        <img src="../img/new-user.png" alt="">
                        Sign up
                    </router-link>
                </div>
                <div v-else class="login-panel">
                    <router-link :to="{name: 'user' , params: {userName: loggedIn}}" class="logged-user" @click.native="activeMenu"> 
                        <img src="../img/user.png" alt=""> {{loggedIn}}
                    </router-link>
                    <button @click="logout(); activeMenu()" class="btn" >
                        <img src="../img/logout.png" alt="">
                        Log out
                    </button>
                </div>
            </nav>            
        </div>
    </div>
</template>

<script>

import { logOut } from '../utils/jwt'

export default {
    name: 'mobile-menu',
      data() {
        return {
            user: this.$store.state.loggedUser,
            active: false
        }
  },
  computed: {
    
      loggedIn(){

          return this.$store.state.loggedUser
      }
  },
methods: {
    
    logout(){

        this.$router.push({name: 'login'})
        
        logOut()
      },
      goHome(){

        if(window.location.pathname !== '/'){
        
             this.$router.push({name: 'home'})
        }
      },
      activeMenu(){

          setTimeout(() => {

              this.active = !this.active
          }, 400);  
      }
  },
}
</script>