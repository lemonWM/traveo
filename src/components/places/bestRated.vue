<template>
    <div class="place-element" v-if="!error">
        <div class="title-header">
             <h2>{{bestRated.localization}}</h2>
        </div>
        <div class="img-wrapper">
            <img :src="bestRated.logo" alt="" class="img-responsive">
        </div>
        <router-link :to="{name: 'singlePlace', params: {id: url, placeID: bestRated._id}}" class="navigation">
            <div class="bottom-content">
                <h3>{{bestRated.address}}</h3>
                <h3>{{bestRated.price}}</h3>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'best-rated',
    props: ['bestRated'],
    data() {
        return {
            error: true
        }
    },
    computed: {
       
        url(){
            const regex = / /ig
            const postUrl = this.bestRated.localization.replace(regex, '-')
            return postUrl
        },
    },
    watch: {
        
        bestRated(Value){
            this.bestRated = Value
            this.error = false
        }
    },
}
</script>