<template>
    <div class="single-element">
        <router-link :to="{name: 'singleArticle', params: {id: url , articleID: article._id}}">
            <div class="single-img">
                <img :src="article.logo" alt="">
            </div>
            <div class="shadow"></div>
            <div class="single-nav">
                <div class="single-text-content">
                    <div class="single-header">
                        <h2>{{article.title}}</h2>
                    </div>
                </div>                    
                <div class="bottom-content">
                    <h3><i class="fa fa-user-circle"></i>{{article.user}}</h3>
                    <h3><i class="fa fa-table"></i>{{article.data}}</h3>
                </div>
            </div>
      
        </router-link>        
    </div>
</template>

<script>
export default {
    name: 'article-single-element',
    props: ['article'],
    data() {
        return {
            
        }
    },
    computed: {

        url(){
            const regex = / /ig
            const postUrl = this.article.title.replace(regex, '-')
            return postUrl
        }
    }
}
</script>