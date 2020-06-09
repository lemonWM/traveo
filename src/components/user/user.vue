<template>
    <div class="user-profile">
        <div class="profile-header">
           <h2>Profile</h2>
           <div class="separator"></div> 
        </div>
        <div v-if="!editMode" class="user-main">      
            <div class="user-header">
                <div class="user-header-info">
                    <div class="user-logo">
                        <img :src="user.avatar" alt="" v-if="user.avatar">
                        <i class="fa fa-user-circle" v-else></i>
                    </div>
                    <div class="user-name">
                        <p class="username">{{user.username}}</p> 
                    </div>
                    <div class="user-registered">
                        <p class="registeres">from: {{getRegisteredDate}}</p>
                    </div> 
                </div>
                <div class="user-details">
                    <p>{{user.description}}</p>
                    <p>city: <span>{{user.localization}}</span></p>
                </div>
                <div class="edit-profile">
                    <button class="btn" @click="editMode =!editMode" value="edit profile">
                        <i class="fa fa-cog" aria-hidden="true"></i>
                    </button>
                </div>        
            </div>
            <div class="last-activities">
                <p>User activity</p>
            </div>
            <div class="main-user-content" v-if="user.reservations">
                <div class="user-reservations" v-if="shorInformation">
                    <p>Latest reservations:</p>
                    <div class="reservation-wrapper">
                        <div v-for="(reservation, key) in sortedReservations" 
                            :key='reservation.reservationID' 
                            class="single-reservation">
                            <p>{{reservation.place_name}}</p>
                            <p>{{reservation.destination}}</p>
                            <button class="btn btn-secondary" @click="getFullReservation(user.reservations[key].reservationID)">Show details</button>
                        </div>
                    </div> 
                 </div>
                <div v-else>
                    <userReservationSingle :completeReservation='completeReservation' @back='backToList'/>
                </div>
            </div>
        </div>
        <div v-else>
            <userEditProfile @changeEditMode='setEdit'/>
        </div>
    </div>
</template>

<script>

import userReservationSingle from '../user/userSingleReservation'
import userEditProfile from '../user/userEditProfile'
import * as moment from 'moment';
import 'moment/locale/pt-br';

export default {
    name: 'user',
    data() {
        return {
            editMode: false,
            shorInformation: true,
            index: '',
            completeReservation: {},
            registered:''
        }
    },
    created() {
        
        this.axios.get('/user/'+this.user._id)
        .then(({ data })=> {

            this.$store.state.user = data
        })
    },
    computed: {
        
        user(){
            
             return this.$store.state.user
        },
        getRegisteredDate(){
            
            var moment = require('moment');

            return moment(this.$store.state.user.registered).format("DD/MM/YYYY")
        },
        sortedReservations(){

            return this.$store.state.user.reservations.slice().reverse();
        }
    },
    methods: {
        
        getFullReservation(key){
            
            let id = key

            this.axios.get(`/reservation/${id}`)
            
                .then(({ data }) => {

                    this.completeReservation = data
                    this.shorInformation = false
                })
        },
        backToList(value){

            this.shorInformation = value
        },
        setEdit(value){

            this.editMode = value
        }
    },
    components: {
        userReservationSingle,
        userEditProfile
    }
}
</script>
