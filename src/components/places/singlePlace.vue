<template>
    <div class="single-element-list" v-if="!error">
        <div class="top-single">
            <div class="single-header">
                <h2>Event description</h2>
                <div class="separator"></div>
            </div>
            <p>Localization: 
                <span>{{post.localization}}</span>
            </p>
            <p>Country: 
                <span>{{post.address}}</span>
            </p>
        </div>
        <div class="main-single">
            <p>Local attractions:</p>
            <p v-for="attr in post.attraction">
                <span>{{attr}}</span>
            </p>
        </div>
        <div class="bottom-single">
            <p>Fly from: 
                <span>{{post.destinationStart}}</span>
            </p>
            <p>Back from: 
                <span>{{post.destinationBack}}</span>
            </p>            
            <p>Price:   
                <span>{{post.price}} $</span>
            </p>
        </div>
        <div class="img-single">
            <slider :images='pictures' />
        </div>
        <div v-if="!user" class="login-baner">
            <p>Login to reserved and use rating</p>
        </div>
        <div class="rate-single" v-show="user">
            <rating :id='post._id' v-if="!rated" @updateRating='updateRate'/> 
            <p v-else>Your rate is added</p>
        </div>
        <div class="button-wrapper">
            <button @click="$router.go(-1)" class="btn ">Back to list</button>
            <router-link :to="{name: 'reservationPlace', params: {id: urlID, post: this.post}}"
                class="btn btn-primary" :disabled='!user'>Go to reservation</router-link>
        </div>
    </div>
</template>

<script>

import { isLoggedIn } from '../../utils/jwt'
import rating from '../places/rating'
import slider from '../slider'

export default {
    name: 'singlePlace',
    props: ['id', 'placeID'],
    data() {
        return {
            post: [],
            error: '',
            isLoggedIn: false,
            user: this.$store.state.loggedUser,
            rated: false,
            pictures: []
        }
    },
    created() {

        this.axios.get(`/place/${this.placeID}`)

            .then(({ data }) => {

                this.post = data
                this.pictures = data.pictures
                this.setReservation()
            })
            .catch(({ error }) => {
                
                this.error = error
            })
    },
    computed: {
        
        urlID(){

            return this.post._id
        },
        getUser(){

            return this.$store.state.loggedUser
        }
    },
    methods: {
        
        setReservation(){

            this.$store.commit('reservationDefault', {

                placeID: this.placeID,
                destination: this.post.localization,
                place_name: this.post.address,
                destinationStart: this.post.destinationStart,
                destinationBack: this.post.destinationBack,
                cost: this.post.price,
                user: this.getUser
            })
        },
        updateRate(value){
            
            this.rated = value
        }
    },
    components: {
        rating,
        slider
    }
}
</script>