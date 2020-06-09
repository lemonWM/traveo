<template>
    <div class="article-preview-wrapper">
        <div v-show="!isSend" class="main-preview">
            <div class="article-header">
                <h2 class="article-title">{{title}}</h2>
                <div class="article-header-author">
                    <div class="article-author">
                        <i class="icon icon-1x icon-people"></i>
                        <p><span>{{author}}</span></p>
                    </div>
                    <div class="artile-date">
                        <i class="icon icon-1x icon-time"></i>
                        <p>{{data}}</p>
                    </div>                
                </div>
            </div>
            <div class="article-logo">
                <img :src="logo" alt="logo" class="img-responsive">
            </div>
            <div class="article-subtitle">
                <h2>{{subtitle}}</h2>
            </div>
            <div class="article-pictures-wrapper">
                <div class="article-picture" v-for="pic in pictures">
                    <img :src="pic" alt="img">
                </div>
            </div>
            <div class="article-paragraphs-wrapper">
                <div class="article-paragraphs" v-for="paragraph in paragraphs">
                    <p>{{paragraph.text}}</p>
                </div>
            </div>
            <div class="btn-select">
                <button class="btn btn-secondary" @click="backToEdit">Back to edit</button>
                <button class="btn btn-primary" @click="saveArticle">Publish it!</button>
            </div>
        </div>
        <div v-show="isSend">
            <div v-if="inProgress" >
                <div class="loading loading-lg"></div>
                <p>Your data is sendeing now</p>
            </div>
            <div v-else>
                <p>Success !</p>
                <i class="icon icon-1x icon-check"></i>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'article-previev',
    data() {
        return {
            data: new Date().toISOString().slice(0,10),
            isSend: false,
            inProgress: true
        }
    },
    computed: {
        logo(){

            return this.$store.state.article.logo
        },
        title(){

            return this.$store.state.article.title
        },
        subtitle(){

            return this.$store.state.article.subtitle
        },
        pictures(){

            return this.$store.state.article.pictures
        },
        paragraphs(){

            return this.$store.state.article.paragraphs
        },
        comments(){

            return this.$store.state.article.comments
        },
        author(){

            return this.$store.state.loggedUser
        }
    },
    methods: {
        
        saveArticle(){

            this.axios.post('/article/create-new', {
                
                user: this.author,
                title: this.title,
                subtitle: this.subtitle,
                articles: this.paragraphs,
                pictures: this.pictures,
                logo: this.logo,
                comments: this.comments,
                data: this.data
            })
            .then(({ data }) =>{

                this.isSend = true

                this.loading()
            })
            .catch((error) => {
                
                console.log(error)
            })
        },
        loading(){

            setTimeout(() => {
                
                this.inProgress = false

                this.$router.push({name: 'articles'})

                this.resetArticleStore() // clear state article after send

            }, 1000);
        },
        backToEdit(){

            this.$store.commit('articleEditMode', {
                editMode: true
            })
        },
        resetArticleStore(){

            this.$store.commit('articleTitle',{
                title:''
            })
            this.$store.commit('articleSubtitle',{
                subtitle:''
            })
            this.$store.commit('articleParagraph',{
                paragraphs: [{'text':''}]
            })
            this.$store.commit('articleLogo',{
                logoUrl:''
            })
            this.$store.commit('articleRemoveAllPictures')

            this.$store.commit('articleCreateStep',{
                value: -4
            })
            this.$store.commit('articleEditMode', {
                editMode: true
            })
        }
    },
}
</script>