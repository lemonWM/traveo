<template>
    <div class="edit-profile">
        <div>
            <p>Edit page in progress..</p>
            <button class="btn btn-secondary" @click="changeEditMode">Back</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'user-edit-profile',
    data() {
        return {
            
        }
    },
    computed: {
        
        user(){
            
             return this.$store.state.user
        }
    },
    methods: {
        
        changeEditMode(){

            this.$emit('changeEditMode', false) // emit to user component
        }
    },
}
</script>