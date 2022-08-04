import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tineraryActions from '../redux/actions/tineraryActions'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import dollarBill from "../assets/dollar-bill.png";
import { Link, useParams } from 'react-router-dom';
import "../styles/CityInfo.css";
import commentsActions from '../redux/actions/commentsActions';
import '../styles/Itineraries.css'
import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const Itineraries = (itinerary) => {
    const [reload, setReload] = useState()
    const [inputText, setInputText] = useState("")
    const [modify, setModify] = useState()
    const { id } = useParams()
    const [editable, setEditable] = useState(false)

    useEffect(() => {
        dispatch(tineraryActions.getOneTinerary(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [id, reload]);

    const dispatch = useDispatch()

    const user = useSelector( (store) => store.userReducer.user)
    

    async function likeOrDislike() {
       const res = await dispatch(tineraryActions.likeDislike(itinerary.itinerary._id))

        setReload(res)
      }

      const drawBill = (number) => {
        const bill = new Array(number).fill("billete");
        return bill.map((item, index) => (
          <img
            key={item + index}
            style={{ height: "3rem" }}
            src={dollarBill}
            alt={item}
          />
        ));
      };

      async function addCommentary(event) {

        const commentData = {
          tinerary: itinerary.itinerary._id,
          comment: inputText,
        }
    
        const res = await dispatch(commentsActions.addComment(commentData))
        console.log(res)
        if(res.data.success){
            toast.success(res.data.message)   
        } else {
            toast.error(res.data.message)
        }
        setInputText("")
          console.log(document.querySelector("#newComentary").target)
          setReload(!reload)
      }
    
      async function modifyComment(id) {
        const commentData = {
          commentId: id,
          comment: modify,
        }
        console.log(modify)
        console.log(id)
        const res = await dispatch(commentsActions.modifyComment(commentData))
        console.log(res)
        if(res.data.success){
            toast.success(res.data.message)   
        } else {
            toast.error(res.data.message)
        }
        setReload(!reload)
        setEditable(false)
      }
    
      async function deleteComment(id) {
        const res = await dispatch(commentsActions.deleteComment(id))
        if(res.data.success){
            toast.success(res.data.message)   
        } else {
            toast.error(res.data.message)
        }
        setReload(!reload)
      }

      const messageLikes = () => {
        toast.error("Please log in to like this itinerary")
      }

      const renderTextArea = () => {
        
        if(editable) {
            setEditable(false)
        } else {
            setEditable(true)
        }
      }

      
  return (
    <div className="city-itinerary" key={itinerary.id}>
    <div className="itinerary-title">
      <h2>{itinerary.itinerary.tineraryName}</h2>
    </div>
    <div>
      <img
        className="image-person"
        src={itinerary.itinerary.imagePerson}
        alt={itinerary.itinerary.namePerson}
      />
    </div>
    <div>
      <p>{itinerary.itinerary.namePerson}</p>{" "}
    </div>
     <div className="price-likes-duration">
      <div className="likes">
        {user ? (<div onClick={likeOrDislike}> {itinerary.itinerary.likes.includes(user.id) ?
        <span style={{color: "#EA839B", fontSize: 30, cursor: "pointer" }}><FavoriteIcon/></span> :
        <span style={{color: "#EA839B", fontSize: 30, cursor: "pointer"}}><FavoriteBorderIcon/></span>}</div>)
      
      : (<span onClick={messageLikes} style={{ fontSize: 30, cursor: "pointer"}}><FavoriteBorderIcon/></span>)}

      <h3 style={{color: "black", fontSize: 30}}>{itinerary?.itinerary.likes.length}</h3>
      </div>
      <p className="billetes">Price: {drawBill(itinerary.itinerary.price)}</p>
      <p>Duration: {itinerary.itinerary.duration} hours</p>
    </div> 
    <div>
      <p>{itinerary.itinerary.hashtags}</p>
    </div>
    <div className="accordion">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Show More</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="activities-div">
            <h2>Activities</h2>
            <div className="activities-div-items">
              {itinerary.itinerary.activities?.map((item) => (
                <div className="activities" key={item.nameActivity}>
                  <p>{item.nameActivity}</p>
                  <img
                    className="img-activities"
                    src={item.imageActivity}
                    alt={item.nameActivity}
                  />
                </div>
              ))}
            </div>
          </div>
          <h1 style={{textAlign: "center"}}>Comments</h1>
            {itinerary.itinerary.comments.map(comment =>
        <div key={comment._id}>
          {comment.userId._id !== user?.id ?
            <div className='div-comments'>
                <div className="user-info">
                <div className="photo-name">
                <img className='photo-user-commentary' src={comment.userId.urlImage} alt="img-user"/>
                <div className='modify-name-date-div'>
                <p className='modify-name'>{comment.userId.firstName}</p> 
                <p className='modify-date'>{new Date(comment.date).toUTCString()}</p>
                </div>
                </div>
              </div>
              <div >
                <p>{comment.comment}</p>
              </div>
            </div> :

            <div className='div-comments' >
                <div className='div-modify-delete'>
                {/* <div className='button-modify' id={comment._id} onClick={ () => modifyComment(comment._id)}><EditIcon/></div> */}
                <EditIcon className='button-edit' onClick={() => renderTextArea()}/>
                <div className='button-delete' id={comment._id} onClick={() => deleteComment(comment._id)} ><DeleteIcon/></div>
                </div>
               <div className="user-info">
                <div className="photo-name">
                <img className='photo-user-commentary' src={comment.userId.urlImage} alt="img-user"/>
                <div className='modify-name-date-div'>
                <p className='modify-name'>{comment.userId.firstName}</p> 
                <p className='modify-date'>{new Date(comment.date).toUTCString()}</p>
                </div>
                </div>
              </div>
              <div className='modify-commentary-div'>
                {editable === false ?
                <div>{comment.comment}</div> :
                <div className='div-span-modify'> 
                    <textarea spellCheck="false" className='textarea-modify-commentary' onChange={(event) => setModify(event.target.value)}>{comment.comment}</textarea>
                    <div className='button-modify' id={comment._id} onClick={ () => modifyComment(comment._id)}><SendIcon/></div>
                </div>}
              </div> 
            </div>
          }
        </div>
      )}

      {user ?
        <div className='div-leave-comment'>
          <div className="card-header">
            Leave us a comment
          </div>
          <div className="new-commentary-div">
            <textarea value={inputText} rows="2" id="newComentary" placeholder="Write your comment here..." onChange={(event) => setInputText(event.target.value)}></textarea>
            <div className='post-div'>
            <span className='post-button' onClick={addCommentary}><SendIcon/></span>
            </div>
          </div>
        </div> :
        <h3>To leave us a comment please <Link to="/login" className='login-link'>Log In</Link></h3>
      }
        </AccordionDetails>
      </Accordion>
    </div>
  </div>
)}

  


export default Itineraries