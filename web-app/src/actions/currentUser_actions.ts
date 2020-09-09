const setUsername = (name: string) => {
    return {
        type: "SET_USERNAME",
        payload: name
    }
}

const setEmail = (email: string) => {
    return {
        type: "SET_EMAIL",
        payload: email
    }
}


export default  {
    setUsername,
    setEmail
}