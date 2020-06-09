<template>
     <div class="img-upload-container">
        <div v-if="!maxUpload" class="article-pictures">
            <label >Send max 3 file</label>
            <div class="article-pictures-upload">
                <input type="file" 
                    accept="image/png, image/jpeg, image/bmp"
                    ref="file"
                    @change="handleFileUpload()">
                <button class="btn btn-primary" 
                    @click="uploadImg" 
                    :disabled='!selected'>
                     <i class="fa fa-cloud-upload-alt"></i>
                </button>
                <button class="btn btn-secondary" 
                    @click="removeLast"
                    :disabled='!uploaded'>Delete last
                </button>
                <button class="btn btn-secondary" 
                    @click="removeAll"
                    :disabled='!uploaded'>Remove all
                </button>
            </div>
        </div>
        <div v-else-if="maxUpload" class="article-pictures-preview">
            <p>Nice! 3 pictures uploaded sucessfull</p>
            <button class="btn btn-secondary" 
                 @click="removeLast">Delete last image
            </button>
            <button class="btn btn-secondary" 
                @click="removeAll">Remove all
            </button>
        </div>
        <div class="uploaded-picture-content">
            <div v-for="picture in pictures" class="picures-wrapper">
                <img :src="picture" alt="" class="img-responsive">
            </div>
        </div>
        <div class="next-step">
            <button class="btn btn-secondary" @click="back">Back</button>
            <button class="btn btn-primary" @click="next">Next step</button>
        </div>  
    </div>   
</template>

<script>
export default {
    name: 'upload-article-pictures',
    data() {
        return {
            imageData: '',
            selected: false,
            uploaded: false,
            maxUpload: false
        }
    },
    created() {
        
        this.loadImgAfterPreviev() // if img was set, after back from previev article will be loaded
    },
    computed: {
        
        pictures() {

            return this.$store.state.article.pictures
        },
        maxArticles(){
            
            return this.$store.state.article.pictures.length
        }
    },
    methods: {
        
        uploadImg(){

            let formData = new FormData()
            formData.append('file', this.imageData)

            this.axios.post('/upload_img', 
                formData,
                {headers: {"Content-Type": "multipart/form-data"}}
            )
            .then(({ data }) => {
                
                let logoUrl = data.url
                this.update(logoUrl)
            })
            .catch(({ err }) => {
                //console.log(err)
            })
        },
        handleFileUpload(){

            this.imageData = this.$refs.file.files[0]
            this.selected = true
            
        },
        update(value){

            this.$store.commit('articlePicture', {
                logoUrl: value
            })
        },        
        removeLast(){
            
            this.$store.commit('articleRemoveLastPicture')
        },
        removeAll(){
            
            this.$store.commit('articleRemoveAllPictures')
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
        loadImgAfterPreviev(){

            if(this.pictures) {
                this.uploaded = true
            }
        } 
    },
    watch: {
        maxArticles(newValue){

            if(newValue == 3){
                
                this.maxUpload = true
            } else {

                this.maxUpload = false
            }
            if(newValue >= 1 && newValue <= 3 ){

                this.uploaded = true
            } else {

                this.uploaded = false
            }
        }
    },
}
</script>