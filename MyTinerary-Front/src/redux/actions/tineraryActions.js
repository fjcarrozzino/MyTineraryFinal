import axios from 'axios'
import apiUrl from '../../api/apiUrl'

const tineraryActions = {

    getTineraries: () => {
        return async(dispatch, getState) => {
            const res = await axios.get(`${apiUrl}api/tineraries`)
            dispatch({type:'GET_TINERARIES', payload: res.data.response.tineraries})
        }
    },
    getOneTinerary: (id) => {
        return async(dispatch, getState) => {
            try{

                const answer = await axios.get(`${apiUrl}api/tineraries/cities/${id}`)
                dispatch({type:'GET_ONE_TINERARY', payload: answer.data.response.tineraries})
            } catch(error){
                console.log(error)
            }
        }
    }, 
    likeDislike: (tineraryId) => {
        const token = localStorage.getItem('token')
        return async () => {
            try {
                let response = await axios.put(`${apiUrl}api/tineraries/like/${tineraryId}`, {},
                {headers: {
                    Authorization: "Bearer "+token
                    }
                })
                console.log(response)
                return response
            }catch (error) {
                console.log(error)
            }
        }
    }
}

export default tineraryActions