<template>
    <div class="single-element-article" v-if="!error">
        <div class="article-title"> 
            <h2 class="title">{{article.title}}</h2>
        </div>
        <div class="article-user-data">
            <p><i class="fa fa-user-circle"></i><span>{{article.user}}</span></p>
            <p><i class="fa fa-calendar-check"></i>{{article.data}}</p>
        </div>
        <div class="article-logo">
            <img :src="article.logo" alt="logo" class="img-responsive">
        </div>
        <div class="article-subtitle">
            <h3>{{article.subtitle}}</h3>
        </div>
        <div class="articles-text-wrapper" v-for="art in article.articles">
            <p>{{art.text}}</p>
        </div>
        <div class="article-gallery-wrapper">
            <slider :images='pictures' />
        </div>
        <div class="article-tag">
            <p>Tags: in build..</p>
        </div>
        <div class="article-comments">
            <p>{{articleLength}} Comments<p>
            <div class="single-comment" v-for="comment in article.comments">
                <div class="user-logo"><i class="fa fa-user-circle"></i></div>
                <div class="user-comment">
                    <div class="user-comment-header">
                        <p class="user">{{comment.author}}</p>
                        <p class="text">{{comment.data}}</p>
                    </div>
                    <div class="user-comment-text">
                        <p>{{comment.text}}</p>
                    </div>
                </div>
            </div>
        </div>
        <newComment :id='article._id' @commentPublished='updateComment'/>
    </div>
</template>

<script>

import newComment from './singleArticleNewComment'
import slider from '../slider'

export default {
    name: 'singleArticle',
    props: ['articleID'],
    data() {
        return {
            article: [],
            error: null,
            articleLength: '',
            pictures: []
        }
    },
    created() {

        this.axios.get(`/articles/${this.articleID}`)

            .then(({ data }) => {

                this.article = data
                this.pictures = data.pictures
                this.articleLength = this.article.comments.length
            })
            .catch(({ error }) => {
                
                this.error = error
            })
    },
    methods: {
        updateComment(commentNew){
            
            this.article.comments.push(commentNew)
            this.articleLength = this.article.comments.length
        }
    },
    components: {
        newComment,
        slider
    }
}
</script>