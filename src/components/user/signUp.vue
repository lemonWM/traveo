<template>
    <div class="register-form">
        <div v-if="!registerError">
            <div class="card-header">
                <div class="card-title">
                    <h2>Register user</h2>
                    <div class="separator"></div>
                </div>
            </div>
            <div class="card-body">
                <form action="#" class="form-horizontal" @submit.prevent>
                    <div class="form-group">
                        <div class="user">
                            <i class="fa fa-user-circle"></i>
                            <input type="text" class="form-input" v-model.lazy="username" @blur="$v.username.$touch()" placeholder="Username">
                            <p class="form-input-hint" v-if="!$v.username.minLength">Require min 3 signs</p>
                            <p class="form-input-hint" v-if="!$v.username.unique">This user name is already in use</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="password">
                            <i class="fa fa-key"></i>
                            <input type="password" class="form-input" v-model.lazy="password" @input="$v.password.$touch()" placeholder="Password">
                            <p class="form-input-hint" v-if="!$v.password.minLength">Required min. 5 signs</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="password">
                            <i class="fa fa-key"></i>
                            <input type="password" class="form-input" v-model="passwordConfirm" @input="$v.passwordConfirm.$touch()" placeholder="Confirm password">
                            <p class="form-input-hint" v-if="!$v.passwordConfirm.sameAs">Passwords are differents</p>
                        </div>
                    </div>
                    <div class="has-error" v-if="error">
                        <p class="form-input-hint">Incorrect values</p>
                    </div>
                </form>
            </div>
            <div class="card-footer">
                <div class="button-wrapper">
                    <button class="btn btn-primary" :disabled='$v.$invalid' @click="login">Sign up</button>
                </div>
            </div>
        </div>
        <div v-else>
             <div class="card-title h5">There was a problem on register</div>
        </div>
    </div>
</template>

<script>

import {validationMixin} from 'vuelidate';
import {required, minLength, email, sameAs} from 'vuelidate/lib/validators';

export default {
    name:'sign-up',
    mixins: [validationMixin],
    data() {
        return {
            username: '',
            password: '',
            passwordConfirm:'',
            error: false,
            registerError: false
        }
    },
    methods: {
        
        login(){

            let date = new Date()

            this.axios.post('/user/register', {
                    username: this.username,
                    password: this.password,
                    registered: date
                   
                })
                .then(({data}) => {
                    
                    setTimeout(() => {
                        
                        this.$router.push({name: 'login'})
                    }, 1000);
                })
                .catch((error) => {
                    
                    this.registerError = true

                    setTimeout(() => {
                        window.location.reload()
                    }, 500);
                })
        }
    },
    validations: {
        username: {
            required,
            minLength: minLength(3),
            unique(value) {

                if( value === ''){
                    return true
                } else {
                
                return this.axios.post('/userValid', {
                            
                            username: value
                        })            
                        .then(response => {
                            
                            return response.data.unique             
                        })
                }    
            }            
        },
        password: {
            minLength: minLength(5),
            required
        },
        passwordConfirm: {
            required,
            sameAs: sameAs('password')
        }
    }   
}
</script>