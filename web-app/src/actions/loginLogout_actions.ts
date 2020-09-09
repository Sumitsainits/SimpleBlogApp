const logOut = (flag:boolean) => {
    return {
        type: "LOG_OUT",
        payload:flag
    }
}

const logIn = (flag:boolean) => {
    return {
        type:"LOG_IN",
        payload:flag
    }
}

const signUp = (flag:boolean) => {
    return {
        type:"SIGN_UP",
        payload:flag
    }   
}

export default {
    logOut,
    logIn,
    signUp
}