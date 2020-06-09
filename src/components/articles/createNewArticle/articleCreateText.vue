<template>
        <div class="article-text" >
            <div v-if="notSend">
                <div class="text-content-area"  v-for='(paragraph, index) in paragraphs'>
                    <textarea name="acapit" id="articleText" v-model="paragraph.text"></textarea>
                    <button class="btn btn-secondary" 
                        @click="removeParagraph(index)" 
                        :disabled="diasabeldBtn"
                        title="Remove one">
                         <i class="icon icon-delete"></i>   
                    </button>                   
                </div>
                <div class="text-nav-area">
                    <button class="btn btn-secondary" 
                        @click="addParagraph" 
                        :disabled='!value'>Add next chapter
                    </button>
                    <button class="btn btn-primary" 
                        @click="setParagraphs" 
                        :disabled='!value'>Confirm all
                    </button>
                </div>
            </div>
            <div v-else class="text-preview">
                <div v-for='(paragraph, index) in getParagraphs'>
                    <p>Paragraph {{index+1}}: <span>{{paragraph.text}}</span></p>
                </div>
                <button class="btn btn-secondary" 
                    @click="notSend = !notSend"
                    title="edit">
                    <i class="icon icon-edit"></i>
                </button>
            </div>
            <div class="next-step">
                <p v-if="notSend">Confirm all to go</p>
                <button class="btn btn-secondary"
                    @click="back">Back
                 </button>
                <button class="btn btn-primary" 
                    @click="next" 
                    :disabled='notSend'>Next step
                </button>
            </div>
        </div>
</template>

<script>
export default {
    name:'create-article-text',
    data() {
        return {
            notSend: true,
            paragraphs: [
                { text:''}
            ],
            diasabeldBtn: true,
            value:''
        }
    },
    created() {
        
        this.loadTextAfterPreviev()
    },
    computed: {
        
        getParagraphs(){

            return this.$store.state.article.paragraphs
        },
        notEmpty(){

            return this.paragraphs[0].text
        }
    },
    methods: {
        
        addParagraph(){

            const article = {
                text: ''
            }
            this.diasabeldBtn = false

            return this.paragraphs.push(article)
        },
        removeParagraph(index) {
            
            this.paragraphs.splice(index, 1)   

            if(this.paragraphs.length === 1){

                this.diasabeldBtn = true    
            }
        },
        setParagraphs(){

            this.$store.commit('articleParagraph', {

                paragraphs: this.paragraphs
            })
            this.notSend = false
        },
        next(){

            this.$store.commit('articleCreateStep', {
                value: 1
            })
        },
        back(){

            this.$store.commit('articleCreateStep', {
                value: -1
            })
        },
        loadTextAfterPreviev(){

            if(this.$store.state.article.paragraphs[0].text.length){
                this.notSend = false
            }
        } 
    },
    watch: {
        notEmpty(value){

            if(value.length >= 3){
                this.value = true
            } else {
                this.value = false
            }
        }
    } 
}
</script>