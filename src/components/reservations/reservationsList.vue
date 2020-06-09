<template>
    <div class="reservation-main-wrapper">
        <div class="reservation-header">
            <h2>Last reservations</h2>
            <div class="separator"></div>
            <p v-if="!loggedIn"> Login to show details</p>
        </div>
        <div class="reservation-main">
            <div v-for='(reservation, index) in reservations' :key="reservation._id" class="single-user-reservation">
                <singleReservation :reservation='reservation'/>
            </div>
        </div>
    </div>
</template>

<script>

import singleReservation from '../reservations/singleReservation'

export default {
    name: 'reservations-list',
    data() {
        return {
            
        }
    },
    computed: {
        
        reservations(){

            return this.$store.state.reservations.slice().reverse(); 
        },
        loggedIn(){

            return this.$store.state.loggedUser
        }
    },
    created() {
        
        this.axios.get('/reservations')
            .then(({ data }) => {

                this.$store.state.reservations = data
            })
            .catch(({ error }) => {
                
                this.error = error
            })
    },
    components: {
        singleReservation
    }
}
</script>