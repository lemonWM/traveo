<template>
    <div class="articles-main-wrapper" v-if="!error">
        <div class="articles-header">
            <h2>Latests articles</h2>
             <div class="separator"></div>
        </div>
        <div class="add-panel">
            <button class="btn btn-primary" :disabled='!isLoggedIn' @click="goToCreator">Add new article</button>
            <p v-if="!isLoggedIn">Login to use new article creator</p>
        </div>
        <div class="articles-container">
            <articleElement  v-for="article in articles" 
                :article='article'
                :key="article._id"
            />
        </div>
    </div>
</template>

<script>

import articleElement from '../articles/articleElement'

export default {
    name: 'articles-list',
    data() {
        return {
            error: null
        }
    },
    created() {

        this.axios.get('/articles')
            .then(({ data }) => {

                this.$store.state.articles = data
            })
            .catch(({ error }) => {
                
                this.error = error
            })
    },
    computed: {
        
        articles(){

            return this.$store.state.articles
        },
        isLoggedIn(){

            return this.$store.state.loggedUser
        }
    },
    methods: {
        
        goToCreator(){

            this.$router.push({name: 'articleCreate'})
        }
    },
    components: {
        articleElement
    }
}
</script>