<template>
    <div class="slider-wrapper" v-if="images[0]">
        <div class="main-content">
            <button @click="changeSlide(-1)" :disabled='actual === 0' class="back-slide">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </button>
            <div class="images-wrapper">
                <figure>
                    <transition name="fade"> 
                        <img :src="images[actual]" alt="" :key="images[actual]" class="img">
                    </transition>  
                </figure>
            </div>
            <button @click="changeSlide(1)" :disabled='actual === images.length-1' class="next-slide">
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
        </div>
        <div class="bottom-content">
            <p>{{actual+1}} / {{images.length}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'slider',
    props: ['images'],
    data() {
        return {
            actual: 0,
        }
    },
    methods: {
        
        changeSlide(value){

            this.actual += value
        }
    }
}
</script>
