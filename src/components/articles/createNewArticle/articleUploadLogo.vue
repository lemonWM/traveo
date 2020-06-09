<template>
    <div class="img-upload-container"> 
        <div v-if="!uploaded" class="article-logo">
            <label>Select image from file</label>
            <input type="file" 
                    accept="image/png, image/jpeg, image/bmp"
                    ref="file"
                    @change="handleFileUpload()">
            <button class="btn btn-primary" 
                @click="uploadImg" 
                :disabled='!selected'>
                <i class="fa fa-cloud-upload-alt"></i>
            </button>
        </div>
        <div v-else class="img-upload-preview">
            <p class="title">Upload sucesfull!</p>
            <img :src="logo" alt="" class="img-responsive">
            <button class="btn btn-secondary" 
                @click="reset"
                title="edit">
                <i class="icon icon-edit"></i>
            </button>
        </div>
        <div class="next-step">
            <button class="btn btn-secondary"
                 @click="back">Back
            </button>
            <button class="btn btn-primary" 
                @click="next" 
                :disabled='!uploaded'>Next step
            </button>
        </div>        
    </div>
</template>

<script>
export default {
    name: 'upload-img',
    data() {
        return {
            imageData: '',
            selected: false,
            uploaded: false
        }
    },
    created() {
        this.loadImgAfterPreviev() // if logo was set, after back from previev article will be loaded
    },
    computed: {
        
        logo() {

            return this.$store.state.article.logo
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

            this.$store.commit('articleLogo', {
                logoUrl: value
            })
            this.uploaded = true
        },        
        reset(){
            
            let logoUrl = ''

            this.update(logoUrl)
            
            this.uploaded = false
            this.selected = false
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

                if(this.logo) {
                this.uploaded = true
            }
        } 
    }
}
</script>