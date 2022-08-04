import axios from 'axios'
import apiUrl from '../../api/apiUrl'


const userActions = {
    
    signUpUser: (userData) => {
        
        return async (dispatch, getState) => {

            const res = await axios.post(`${apiUrl}api/auth/signUp`, {userData})
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

    signInUser: (userData) => {

        return async (dispatch, getState) => {

            const user = await axios.post(`${apiUrl}api/auth/signIn`, {userData})
            if (user.data.success) {
                localStorage.setItem('token', user.data.response.token)
                dispatch({ type: 'user', payload: user.data.response.userData });
                dispatch({type:'userList'})
            }
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: user.data.message,
                    success: user.data.success
                }
            })
            return user
        }
    },

    SignOutUser: (closeUser) => {
        return async (dispatch, getState) => {
            const user = await axios.post(`${apiUrl}api/auth/signOut`, { closeUser })
            localStorage.removeItem('token')
            dispatch({ type: 'user', payload: false });
            dispatch({type:'userList'})
            return user
        }
        
    },

    VerificarToken: (token) => {

        return async (dispatch, getState) => {

            await axios.get(`${apiUrl}api/auth/signInToken`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(user => {
                    if (user.data.success) {
                        dispatch({ type: 'user', payload: user.data.response });
                        dispatch({
                            type: 'message',
                            payload: {
                                view: true,
                                message: user.data.message,
                                success: user.data.success
                            }
                        });
                    } else {
                        localStorage.removeItem('token')
                    }
                }
                ).catch(error => {
                    if (error.response.status === 401)
                        dispatch({
                            type: 'message',
                            payload: {
                                view: true,
                                message: "Please log in again",
                                success: false
                            }
                        })
                    localStorage.removeItem('token')
                })
        }
    }
}

export default userActions;