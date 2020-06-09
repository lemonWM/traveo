<template>
    <div>
        <h1>sss</h1>
        <label>Select image from file</label>
            <input type="file" 
                    accept="image/png, image/jpeg, image/bmp"
                    ref="file"
                    @change="handleFileUpload()">
            <button class="btn btn-success" 
                @click="uploadImg" 
              >Upload
            </button>
    </div>
</template>

<script>

export default {
    name:'uplo',
    data() {
        return {
               imageData: '',
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

                console.log(logoUrl)
            })
            .catch(({ err }) => {
                console.log(err)
            })
        },
        handleFileUpload(){

            this.imageData = this.$refs.file.files[0]
        },
    },

}
</script>