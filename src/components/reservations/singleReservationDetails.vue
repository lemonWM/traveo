<template>
    <div class="single-reservation-details">
        <div class="reservation-details-header">
            <h2>Reservation details</h2>
            <div class="separator"></div>
        </div>
        <div class="reservation-details-main">
            <p>Localization: <span>{{reservation.destination}}</span></p>
            <p>Country: <span>{{reservation.place_name}}</span></p>
            <p>Fly from: <span>{{reservation.destinationStart}}</span> on: <span>{{startData}}</span></p>
            <p>Back from place: <span>{{reservation.destinationBack}}</span> on: <span>{{backData}}</span></p>
            <p>Created: <span>{{createdData}}</span></p>
        </div>
        <button class="btn btn-secondary" @click="back">Back</button>
    </div>
</template>

<script>

import * as moment from 'moment';
import 'moment/locale/pt-br';

export default {
    name: 'single-reservation-details',
    props: ['id'],
    data() {
        return {
            reservation: {},
            createdData: '',
            startData:'',
            backData:''

        }
    },
    created() {
        
        let id = this.id
                        
        this.axios.get(`/reservation/${id}`)
            
            .then(({ data }) => {

                this.reservation = data
                this.data = data.date_created

                var moment = require('moment');

                this.createdData = moment(data.date_created).format("DD/MM/YYYY")
                this.startData = moment(data.date_from).format('DD/MM/YYYY')
                this.backData = moment(data.date_to).format('DD/MM/YYYY')
            })
    },
    methods: {
        
        back(){
            this.$router.go(-1)
        }
    },
}
</script>