<template>
    <div class="article-creator">
        <div v-if="editMode">
            <h2>New article creator</h2>
            <div class="separator"></div>
            <transition name="fade" mode='out-in'>
                <div v-show="step === 1"> 
                    <div class="article-title">
                        <h2>Write title</h2>
                        <createTitle />
                    </div>
                </div>
            </transition>
            <transition name="fade" mode='out-in'>
                <div v-show="step === 2"> 
                    <div class="article-text">
                        <h2>Write text acapite. If Your story is long add next chapter</h2>
                        <createText />
                    </div>                    
                </div>
            </transition>
            <transition name="fade" mode='out-in'>
                <div v-show="step === 3">
                    <div class="article-logo">
                        <h2>Upload main image</h2>
                        <uploadLogo />
                    </div>
                </div>
            </transition>
            <transition name="fade" mode='out-in'>
                <div v-show="step === 4">
                    <div class="article-pictures">
                        <h2>Upload another pictures for article</h2>
                        <uploadPictures />
                    </div>
                </div>
            </transition>
            <transition name="fade" mode='out-in'>
                <div v-show="step === 5" >
                    <div class="article-preview-confirm">
                        <h2>Well done</h2>
                        <h3>Show preview of article</h3>
                        <div class="preview-nav">
                            <button class="btn btn-secondary" @click="back">Back</button>
                            <button class="btn btn-primary" @click="saveAll">Show</button>
                        </div>
                    </div>
                </div>
            </transition>
        </div> 
        <div v-else>
            <articlePreviev/>
        </div>
    </div>
</template>

<script>

import createTitle from '../createNewArticle/articleCreateTitle'
import createText from '../createNewArticle/articleCreateText'
import uploadLogo from '../createNewArticle/articleUploadLogo'
import uploadPictures from '../createNewArticle/articleUploadPictures'
import articlePreviev from '../createNewArticle/articlePreviev'

export default {
    name: 'article-create-new',
    data() {
        return {
            editMode: true,
            step: 1
        }
    },
    computed: {
        currentStep(){

            return this.$store.state.articleCreateStep
        },
        isModeEdit(){

            return this.$store.state.editMode
        }
    },
    methods: {
        
        saveAll(){

            this.$store.commit('articleEditMode', {
                editMode: false
            })
        },
        changeEdit(){

            this.editMode = true
        },
        back(){

            this.$store.commit('articleCreateStep', {
                value: -1
            })
        } 
    },
    watch: {
        
        currentStep(newValue){

            return this.step = newValue
        },
        isModeEdit(newValue){

            this.editMode = newValue
        }
    },
    components: {
        createTitle,
        createText,
        uploadLogo,
        uploadPictures,
        articlePreviev
    }
}
</script>

<style lang="">

.fade-enter-active, .fade-leave-active{
    transition: opacity .5s;
    -webkit-transition: opacity .5s;
    -moz-transition: opacity .5s;
    -ms-transition: opacity .5s;
    -o-transition: opacity .5s;
}
.fade-leave-active, .fade-enter-active{
    position: absolute;
}
.fade-enter{
    opacity: 0;
}
.fade-leave-to{
    opacity: 0;
}



</style>