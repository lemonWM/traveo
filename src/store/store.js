import Vue from 'vue';
import Vuex from 'vuex'; 

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        places: [],
        ratingKey: [],
        topRated: [],
        articles: [],
        loggedUser: '',
        user: {},
        editMode: true,
        articleCreateStep: 1,
        article: {
            user: '',
            title: '',
            subtitle: '',
            paragraphs: [
                {text: ''}
            ],
            pictures: [],
            logo: '',
            comments: [],
            data: ''
        },
        reservations: [],
        reservation: {
            placeID: "",
            destination:'',
            place_name: "",
            user: "",
            date_from: "",
            date_to: "",
            destinationStart: "",
            destinationBack: "",
            cost: 0,
            totalCost: 0,
            persons: 0,
        }
    },
    getters,
    mutations,
    actions,

}) // zaimportowanie do main.js
