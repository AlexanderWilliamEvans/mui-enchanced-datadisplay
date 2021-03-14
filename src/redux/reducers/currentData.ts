const currentData = (state = {}, action:any) => {
    switch(action.type){
        case "SET_DATA":
            return {
                ...state,
                data: action.payload,
            }
        case "CLEAR_DATA":
            return {
                ...state,
                data: {},
            }
        default:
            return state
    }
}

export default currentData;
