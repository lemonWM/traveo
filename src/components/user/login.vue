<template>
    <div class="login-form">
        <div class="login-header">
            <div class="card-title">
                <h2>Login</h2>
            </div>
            <div class="separator"></div>
        </div>
        <div class="login-body">
            <form action="#" class="form-horizontal" @submit.prevent>
                <div class="form-group">
                    <div class="user">
                        <i class="fa fa-user-circle"></i>
                        <input type="text" class="form-input" v-model="username" placeholder="Username" name="username">
                    </div>
                </div>
                <div class="form-group">
                    <div class="password">
                        <i class="fa fa-key"></i>
                        <input type="password" class="form-input" v-model="password" placeholder="Password"  name="password">
                    </div>
                </div>
                <div class="error" v-if="error">
                    <p class="form-input-hint">Inncorect values.</p>
                </div>
            </form>
        </div>
        <div class="login-footer">
            <div class="button-wrapper">
                <button class="btn btn" @click="$router.go(-1)">Back</button>
                <button class="btn btn-primary" @click="login">Sign in</button>
            </div>
        </div>
    </div>
</template>

<script>

import { login, loggedUser } from '../../utils/jwt'
import decode from 'jwt-decode'

export default {
    name: 'login',
    data() {
        return {
                username: "",
                password: "",
                error: false,
                user: '',
                dataa: {}           
        }
    },
    methods: {
        login(){ 

            this.error = false 

            this.axios.post('/login', {

                 username: this.username,
                 password: this.password
            }) 
            .then(({ data }) => {

                const token = data.token
                const user = data.findedUser

                login(token)

                this.getUser(token)
                this.getUserContent(user)

                this.$router.push({name: 'home'})     
            })
            .catch((error) => {
                
                this.error = true
            })
        },
        getUser(token){

             this.user = decode(token).username
             this.$store.state.loggedUser = this.user
        },
        getUserContent(user){

            this.$store.state.user = user
        }
    }
}
</script>