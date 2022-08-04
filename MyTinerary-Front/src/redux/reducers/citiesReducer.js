const initialState = {
    cities: [],
    filterCities: [],
    auxiliar: [],
    oneCity: []
}

const citiesReducer = (state = initialState, action) => {
    
    switch(action.type){
        case 'GET_CITIES':
            return {
                ...state,
                cities: action.payload,
                auxiliar: action.payload,
            }
        case 'GET_ONE_CITY':
            return {
                ...state,
                oneCity: action.payload
            }
        
            
        case 'FILTER_CITIES':
            const filter = state.cities.filter((cities =>
                     cities.name.toLowerCase().startsWith(action.payload.toLowerCase().trim())))
            return {
                ...state,
                filterCities: filter
             }
            
        default: 
        return state
    }
}

export default citiesReducer