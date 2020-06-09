<template>
    <div class="rating-main">
        <label for="id_select"> Rate place: </label>
        <select id="person_select" v-model="rating" >
            <option :value="n" v-for="n in 10">{{n}}</option>
        </select> 
        <button @click="rate" class="btn btn-link">Save rate</button>        
    </div>
</template>

<script>
export default {
    name: 'rating',
    props: ['id'],
    data() {
        return {
            rating: '',
            rateValue: ''
        }
    },
    methods: {
        
        rate(){

            this.rateValue = this.rating
            
            this.axios.put(`/place/${this.id}`, {

                rateValue: this.rateValue
            })
            .then(({ data })=> {

                this.$emit('updateRating', true)
            })
        }
    }
}
</script>