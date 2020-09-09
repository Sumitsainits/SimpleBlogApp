interface initialStageObj<T> {
    current_user_name:T ,
    current_user_email:T
}

const initialStage:initialStageObj<string> = {
    current_user_email: "",
    current_user_name: ""
}

interface Action {
    type: string,
    payload:string
}

const currentUserRed = ( state = initialStage, action:Action) => {
    switch(action.type){
        case "SET_USERNAME":
            return {
                ...state,
                current_user_name:action.payload
            }
        case "SET_EMAIL":
            return {
                ...state,
                current_user_email:action.payload
            }
        
        default :
            return state
    }
}

export default currentUserRed;