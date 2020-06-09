import decode from 'jwt-decode'

export function login(token){

    window.localStorage.setItem('token', token)
} 

export function logOut(){

    window.localStorage.removeItem('token')
    window.location.reload()
}

export function getToken(){

    return window.localStorage.getItem('token')
}

export function isLoggedIn(){
    
    const token = getToken()
    //console.log(decode(token).username)
    return token && decode(token).exp > (Date.now() / 1000)
}
