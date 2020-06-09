<template>
    <div class="reservation">
        <router-link :to="{name: 'singleReservation', params: {id: reservation._id}}">
            <div class="reservation-title">
                <h3>{{reservation.destination}}</h3>
                <h4>{{reservation.place_name}}</h4>  
            </div>
            <div class="reservation-bottom">
                <p><i class="fa fa-user-circle"></i>{{reservation.user}}</p>
                <p><i class="fa fa-calendar-check"></i>{{createdData}}</p>
            </div>
        </router-link>
    </div>
</template>

<script>

import * as moment from 'moment';
import 'moment/locale/pt-br';

export default {
    name: 'single-reservation-main',
    props: ['reservation'],
    data() {
        return {
       
        }
    },
    computed: {

        createdData(){

            var moment = require('moment');

            return moment(this.reservation.date_created).format("DD/MM/YYYY")
        }
    },
}
</script>