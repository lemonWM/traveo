<template>
    <div class="single-element">
        <div class="title-header">
             <h2>{{place.localization}}</h2>
        </div>
        <div class="background"></div>
        <div class="img-wrapper">
            <img :src="place.logo" alt="" class="img-responsive">
        </div>
        <router-link :to="{name: 'singlePlace', params: {id: url, placeID: place._id}}" class="navigation">
            <div class="bottom-content">
                <h3>{{place.address}}</h3>
                <h3>{{place.price}}</h3>
            </div>
        </router-link>

    </div>
</template>

<script>
import singlePlaceVue from './singlePlace.vue'
export default {
    name: 'place-single-element',
    props: ['place'],
    data() {
        return {
            
        }
    },
    computed: {

        url(){
            const regex = / /ig
            const postUrl = this.place.localization.replace(regex, '-')
            return postUrl
        }
    },  
}
</script>