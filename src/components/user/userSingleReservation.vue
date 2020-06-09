<template>
    <div>
        <div class="reservation-information">
            <p>Place: <span>{{completeReservation.destination}}</span></p>
            <p>Localization: <span>{{completeReservation.place_name}}</span></p>
            <p>Start on: <span>{{completeReservation.date_from}}</span></p>
            <p>To date: <span>{{completeReservation.date_to}}</span></p>
            <p>Number of person: <span>{{completeReservation.persons}}</span></p>
            <p>Total cost: <span>{{completeReservation.totalCost}} USD</span></p>
        </div>
        <button class="btn btn-primary" @click="backToList">Back</button>        
    </div>
</template>

<script>
export default {
    name: 'user-sigle-reservation-info',
    props: ['completeReservation'],
    data() {
        return {
            
        }
    },
    methods: {
        
        backToList(){
           
            this.$emit('back', true)
        }
    },
}
</script>