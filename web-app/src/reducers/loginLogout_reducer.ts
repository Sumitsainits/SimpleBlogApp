interface initialStage<T>{
    userLogOut:T,
    userLogIn:T,
    successSignUp:T
}

const initialStage = {
    userLogOut:false,
    userLogIn:false,
    successSignUp:false
}

type Action = {
    type:string,
    payload:boolean
}

const loginLogOutRed = ( state = initialStage, action:Action) => {
    switch(action.type){
        case "LOG_OUT":
            return {
                ...state,
                userLogOut:action.payload
            }
            
        case "LOG_IN":
            return {
                ...state,
                userLogIn:action.payload
            }
        case 'SIGN_UP':
            return {
                ...state,
                successSignUp: action.payload
            }
        default :
            return state
    }
}

export default loginLogOutRed;