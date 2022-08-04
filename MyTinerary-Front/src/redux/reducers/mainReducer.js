import { combineReducers } from 'redux'
import citiesReducer from "./citiesReducer"
import tineraryReducer from "./tineraryReducer"
import userReducer from "./userReducer"

const mainReducer = combineReducers({
    citiesReducer,
    tineraryReducer,
    userReducer
})

export default mainReducer