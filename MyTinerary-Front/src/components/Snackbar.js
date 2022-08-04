import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import '../styles/Snackbar.css'
import { useDispatch, useSelector } from "react-redux";


export default function Snackbars() {
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch({
      type: 'message',
      payload: { view: false, message: '', success: false}
    })
  };

  const message = useSelector((store) => store.userReducer.snackbar)

  console.log(message)
  
  const action = (
    <Box className='fredokaFont' sx={{
        width: '100%',
        backgroundColor: message.success ? '#2e7d32':'#d32f2f',
        color: 'white',
        borderRadius: '4px',
        padding: '4px',
        fontWeight: '400'}}>
        {(typeof message.message) === "string" ?
            (<p>{message.message}</p>) :
            <div>{message.message.map((message,index) =><p key={index}>{message.message}</p>)}</div>
        }

    </Box>
  )

  return (
    <Snackbar
    open={message.view}
    autoHideDuration={6000}
    onClose={handleClose}
    action={action}
    message={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} sx={{
          width: '100%',}}>
            <CloseIcon fontSize="small" />
        </IconButton>
    } 
/>
  );
}
