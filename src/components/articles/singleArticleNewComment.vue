<template>
    <div class="comment-wrapper">
        <div v-if="!error">
            <label for="comment" v-if="isLogged">Leave your comment</label>
            <label for="comment" v-else>Login to post a comment</label>
            <textarea name="comment" id="comment" v-model="comment"></textarea>
            <button class="btn btn-primary" :disabled='!isLogged || !comment' @click="send">Send</button>
        </div>
        <div v-else>
            <p>Sending not correct</p>
        </div>
    </div>
</template>

<script>

import * as moment from 'moment';
import 'moment/locale/pt-br';

export default {
    name: 'new-comment',
    props:['id'],
    data() {
        return {
            author: '',
            comment: '',
            data: '',
            error: false
        }
    },
    created() {
        
        var moment = require('moment');

        let actualData = new Date()

        this.data = moment(actualData).format("YYYY/MM/DD")
        this.author = this.$store.state.loggedUser
    },
    computed: {
        
        isLogged(){

            return this.$store.state.loggedUser
        }
    },
    methods: {
        
        send(){

            this.axios.put('/create-comment', {
                articleID: this.id,
                author: this.author,
                text: this.comment,
                data: this.data
            })
            .then(({ data })=>{

                this.$emit('commentPublished', {
                    author: this.author,
                    text: this.comment,
                    data: this.data
                })
            })
            .catch(({err})=> {
                this.error = true
            })
        }
    }
}
</script>