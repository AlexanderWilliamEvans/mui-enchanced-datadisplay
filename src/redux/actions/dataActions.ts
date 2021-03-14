const setData = (userObj:any) => {
    return {
        type: "SET_DATA",
        payload: userObj
    }
}

const clearData = () => {
    return {
        type: "CLEAR_DATA"
    }
}

export default {
    setData,
    clearData,
}