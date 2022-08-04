import axios from 'axios'
import apiUrl from '../../api/apiUrl'

const commentsActions = {

    addComment: (comment) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {

            if(comment.comment !== "") {
                const res = await axios.post(`${apiUrl}api/tineraries/comment`, { comment }, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                console.log(res.data.response)
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })

            return res
            }
            else {
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: "Add a comment to save it",
                        success: false
                    }
                })
            }
        }
    },

    modifyComment: (commentModified) => {
        
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {

            const res = await axios.put(`${apiUrl}api/tineraries/comment/${commentModified.commentId}`, {commentModified}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(res)
            dispatch ({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res
        }
    },

    deleteComment: (id) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const res = await axios.post(`${apiUrl}api/tineraries/comment/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res
        }
    }
}

export default commentsActions