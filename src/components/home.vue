<template>
  <div class="main-wrapper-home">
    <div class="top-rated-element">
      <h2 class="top-title">Top rated place</h2>
      <div class="separator"></div>
      <bestRated  :bestRated='best' v-if='!error' />
    </div>
    <div class="places-list-main">
      <h2 class="list-title">Other places</h2>
      <div class="separator"></div>
      <div class="place-list-elements">
        <placeElement  v-for="place in places"
                    :place='place'
                    :key="place._id" v-if='!error'/>
      </div>
    </div>
  </div>
</template>

<script>

import placeElement from '../components/places/placeElementList'
import bestRated from '../components/places/bestRated'

export default {
  name: 'home',
  data () {
    return {
        ratedArray: [],
        error: null
    }
  },
  created() {
      this.$store.state.places =[]
    
      this.axios.get('/places')
        .then(({ data }) => {

          this.ratedArray = data

          this.topRated()

          this.getTopRatedPost(data) // data sending to get best to synchronize loading
            
      })
         .catch(({ error }) => {

            this.error = error
      }) 
  },    
  computed: {

    places(){ 
      
      return this.$store.state.places
    },

    best() {
      
      return this.$store.state.topRated
    }
  },
  methods: {
    
    getBestRating(a, b){
        
        return a[0] - b[0]
    },
    topRated(){

      let ratingSort = []

      this.ratedArray.forEach(element => {
         
          let value = element.rating.reduce((a, b) => a + b, 0);
          let rating = value / element.rating.length -1;
          let singleRating = [];
            
          singleRating.push(rating , element._id) // set post id & avarage rating post

          ratingSort.push(singleRating) // all post id & avarage rating post
      });
      
      ratingSort.sort(this.getBestRating)  

      this.$store.state.ratingKey = ratingSort.slice(-1)[0] // set topRatedPost in store
    },

    getTopRatedPost(data) {

        let places = data

        if(this.$store.state.ratingKey){

            this.axios.get(`/place/${this.$store.state.ratingKey[1]}`)

            .then(({ data }) => {

                this.$store.state.topRated = data

                this.$store.state.places = places
            })
            .catch(({ error }) => {

                this.error = error
            })
        } // get post by _id - top rated post
    }
  },
  components: {
    placeElement,
    bestRated
  }
}
</script>