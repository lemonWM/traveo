<template>
    <div>
        <div class="article-title-wrapper">
            <div>
                <div class="header-main-title" v-if="!isTitle">
                    <div>
                        <label>Title</label>
                        <input type="text" placeholder="Type main title.." v-model="title">
                    </div>
                    <button class="btn btn-secondary" 
                        @click="setTitle" 
                        :disabled='!title.length'>
                        <i class="icon icon-check"></i>
                    </button>
                </div>
                <div v-else class="preview">
                    <p>Title: <span>{{getTitle}}</span></p>
                    <button class="btn btn-secondary" 
                        @click="removeTitle"
                        title="edit">
                        <i class="icon icon-edit"></i>
                    </button>
                </div>
            </div>
            <div>
                <div class="header-subtitle" v-if="!isSubtitle">
                    <div>
                        <label>Subtitle</label>
                        <input type="text" placeholder="Type subtitle.." v-model="subtitle">
                    </div>
                    <button class="btn btn-secondary" 
                        @click="setSubitle" 
                        :disabled='!subtitle.length'>
                        <i class="icon icon-check"></i>
                    </button>
                </div>
                <div v-else class="preview">
                    <p>Subtitle: <span>{{getSubtitle}}</span></p>
                    <button class="btn btn-secondary" 
                        @click="removeSubitle"
                        title="edit">
                        <i class="icon icon-edit"></i>
                    </button>
                </div>
            </div>
            <div class="next-step">
                <p v-if="!isTitle || !isSubtitle">Confirm changes before you go</p>
                <button class="btn btn-primary" 
                    @click="next"
                    :disabled='!isTitle || !isSubtitle'>Next step
                </button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:'create-article-title',
    data() {
        return {
            title:'',
            subtitle:'',
            isTitle: false,
            isSubtitle: false
        }
    },
    created() {
        
        this.loadTextAfterPreviev() // if title or subtitle was set, after back from previev article will be loaded
    },
    computed: {
        
        getTitle(){

            return this.$store.state.article.title
        },
        getSubtitle(){

            return this.$store.state.article.subtitle
        }
    },
    methods: {
        
        setTitle(){
       
            this.$store.commit('articleTitle', {
                title: this.title
            });
            this.isTitle = true
        },
        setSubitle(){

            this.$store.commit('articleSubtitle', {
                subtitle: this.subtitle
            });
            this.isSubtitle = true
        },
        removeTitle(){
            
            this.$store.commit('articleTitle', {
                title: ''
            });
            this.isTitle = false
        },
        removeSubitle(){

            this.$store.commit('articleSubtitle', {
                subtitle: ''
            });
            this.isSubtitle = false
        }, 
        next(){

            this.$store.commit('articleCreateStep', {
                value: 1
            })
        },
        loadTextAfterPreviev(){

            if(this.getTitle){
                this.isTitle = true
            }
            if(this.getSubtitle){
                this.isSubtitle = true
            }
        }       
    }
}
</script>
