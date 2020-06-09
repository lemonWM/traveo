<template>
    <div class="reservation-creator">
        <div v-show="editMode" class="reservation-wrapper">
            <div class="reservation-header">
                <h2>Reservation creator</h2>
                <div class="separator"></div>
                <p>Destination: <span>{{reservation.place_name}}</span></p>
                <p>Name: <span>{{reservation.destination}}</span></p>
            </div>
            <div class="reservation-main">
                <p>Fly from: <span>{{reservation.destinationStart}}</span></p>
                <p>To: <span>{{reservation.destinationBack}}</span></p>
                <div class="reservation-date">
                    <p>Select date:</p>
                    <date-picker v-model.lazy="data" range @blur="$v.data.$touch()"></date-picker>
                    <p class="form-input-hint" v-if="!$v.data.$model[0]">Set start and last day date</p>
                </div>
            </div>
            <div class="reservation-person-select">
                <p>Cost for person: <span>{{reservation.cost}} $</span></p>
                <label for="id_select"> Select persons </label>
                <select id="person_select" v-model="personCount" >
                    <option :value="n" v-for="n in 10">{{n}}</option>
                </select> 
            </div>
            <div class="form-group">
                <label class="form-switch">
                    <input type="checkbox" v-model="acceptTerms">
                    <i class="form-icon"></i> Accept terms and conditions
                </label>
            </div>
            <div class="reservation-btn">
                <button class="btn btn-secondary" @click="backToList">Quite</button>
                <button class="btn btn-primary" @click="showSummary" :disabled='!$v.data.$model[0] || $v.$invalid === true'>Show summary</button>
            </div>
        </div>

        <div v-show="!editMode" class="reservation-summary">
            <div class="header-ticket">
                <h2>Travel ticekt</h2>
                <div class="separator"></div>
                <p>{{post.localization}} {{post.address}}</p>
            </div>
            <div class="main-ticket">
                <div>
                    <p>Fly from: <span>{{post.destinationStart}} </span> on: <span>{{dateFrom}}</span></p>
                    <p>Back from: <span>{{post.destinationBack}} </span> on: <span>{{dateTo}}</span></p>
                </div>
                <div>
                    <p>Total tickets: <span>{{personCount}}</span></p>
                    <p>Total cost: <span>{{totalCost}}$</span></p>
                </div>
            </div>
            <div class="btn-wrapper">
                <button class="btn btn-secondary" @click="backToEdit">Back to edit</button>
                <button class="btn btn-primary" @click="createReservation">Save</button>
            </div>
        </div>
    </div> 
</template>

<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import {validationMixin} from 'vuelidate';
import {required} from 'vuelidate/lib/validators';

export default {
    name: 'single-reservation',
    mixins: [validationMixin],
    props: ['id', 'post'],
    data() {
        return {
            editMode: true,
            data: '',
            personCount: '',
            acceptTerms: false,
            dateFrom:'',
            dateTo:'',
            completeData: false
        }
    },
    computed: {
        
        totalCost(){

            return this.personCount * this.post.price
        },
        reservation(){

            return this.$store.state.reservation
        },
    },
    methods: {
        
        showSummary(){

            this.$store.commit('setReservationData', {
                
                date_from: this.data[0],
                date_to: this.data[1],
                totalCost: this.totalCost,
                persons: this.personCount
            })
            this.editMode = false
        },
        backToEdit(){

            this.editMode = true
        },
        createReservation(){

            this.axios.post('/reservation/create', {
                placeID: this.id,
                place_name: this.reservation.place_name,
                destination: this.reservation.destination,
                destinationStart: this.reservation.destinationStart,
                destinationBack: this.reservation.destinationBack,
                date_created: new Date(),
                date_from: this.reservation.date_from,
                date_to: this.reservation.date_to,
                totalCost: this.reservation.totalCost,
                persons: this.reservation.persons,
                user: this.reservation.user
            })
            .then(({ data }) => {
                
                this.sendToUserBase(data)
            })
        },
        sendToUserBase(data){

            this.axios.put('/user/reservation/create', {
                username: this.reservation.user,
                reservationID: data,
                place_name: this.reservation.place_name,
                destination: this.reservation.destination,
            })
            .then(({ data }) => {

                this.$router.push({name:'user', params: {userName: this.reservation.user}})
            })
        },
        backToList(){

            this.$router.push({name: 'home'})
        }
    },
    watch: {
        
        data(newV){
            var moment = require('moment');

            this.dateFrom = moment(newV[0]).format("DD/MM/YYYY")
            this.dateTo = moment(newV[1]).format("DD/MM/YYYY")
        }
    },
    validations: {

        data: {
            required
        },
        personCount: {
            required
        },
        acceptTerms: {
            checked: value => value === true
        }
    },  
    components: { DatePicker },
}
</script>