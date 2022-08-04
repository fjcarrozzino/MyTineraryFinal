const initialState = {
    tinerary: [],
    oneTinerary: []
}

const tineraryReducer = (state = initialState, action) => {

    switch(action.type){
        case 'GET_TINERARIES':
            return {
                ...state,
                tinerary: action.payload
            }
        case 'GET_ONE_TINERARY':
            return {
                ...state,
                oneTinerary: action.payload
            }
            default:
            return state
    }
}

export default tineraryReducer