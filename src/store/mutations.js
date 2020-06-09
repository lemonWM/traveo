import vue from 'vue';

export default{

    //mutations for set atricle store
    
    setUsers(state, payload){

        state.places = payload.places
    },
    setArticles(state, payload){

        state.articles = payload.articles
    },
    articleLogo(state, payload){

        state.article.logo = payload.logoUrl
    },
    articlePicture(state, payload){

        state.article.pictures.push(payload.logoUrl)
    },
    articleRemoveLastPicture(state, payload){
        
        state.article.pictures.pop()
    },
    articleRemoveAllPictures(state) {

        state.article.pictures = []
    },
    articleTitle(state, payload){

        state.article.title = payload.title
    },
    articleSubtitle(state, payload){

        state.article.subtitle = payload.subtitle
    },
    articleParagraph(state, payload){
        
        state.article.paragraphs = payload.paragraphs
    },
    articleCreateStep(state, payload){

        state.articleCreateStep += payload.value
    },
    articleEditMode(state,payload){
       
        state.editMode = payload.editMode
    },
    
    // mutations for set reservation store
    reservationDefault(state, payload){
        state.reservation.placeID = payload.placeID,
        state.reservation.destination = payload.destination,
        state.reservation.place_name = payload.place_name,
        state.reservation.destinationStart = payload.destinationStart,
        state.reservation.destinationBack = payload.destinationBack,
        state.reservation.user = payload.user
        state.reservation.cost = payload.cost
    },
    setReservationData(state, payload){
        state.reservation.date_from = payload.date_from,
        state.reservation.date_to = payload.date_to,
        state.reservation.totalCost = payload.totalCost,
        state.reservation.persons = payload.persons
    }
}