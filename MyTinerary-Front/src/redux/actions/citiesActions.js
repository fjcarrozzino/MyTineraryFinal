import axios from 'axios'
import apiUrl from '../../api/apiUrl'



const citiesActions = {

    getCities: () => {
        return async(dispatch, getState) => {
            const res = await axios.get(`${apiUrl}api/cities`)
            dispatch({type:'GET_CITIES', payload: res.data.response.cities})
        }
    },

    getOneCity: (id) => {
        return async(dispatch, getState) => {
                const answer = await axios.get(`${apiUrl}api/cities/${id}`)
                dispatch({type:'GET_ONE_CITY', payload:answer.data.response})
            }
        },

    filterCities: (value) => {
        return (dispatch, getState) => {
            dispatch({type: 'FILTER_CITIES', payload:value})
        }
    }
}

export default citiesActions