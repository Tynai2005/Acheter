import { makeStyles, TextField } from '@material-ui/core';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import React from 'react';
import { useState } from 'react';
import { useGames } from '../../contexts/GameContext';

const useStyles = makeStyles(() => ({
    commentsInnerContainer:{
        width:'1000px',
        minHeight:'500px',
        backgroundColor:'white',
        display:'flex',
        justifyContent:'center',
    },
    commentsOuterContainer:{
        display:'flex',
        justifyContent:'center',
        height:'100%',
    },
    comments:{
        width: '60%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'wheat',
        height:'100%',
    },
    inputDiv:{
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: 0,
    }
}))

const GameComments = () => {
    const [newComment,setNewComment] = useState('')
    const [addingComment,setAddingComment] = useState()
    const [editingComment,setEditingComment] = useState()
    const [curId,setCurId] = useState('')
    const [isEditing,setIsEditing] = useState(false)
    const {gameDetails,toggleComment} = useGames()
    const classes = useStyles()
    const sendComment = async (comment) => {
        if(comment.trim()){
            const createdComment = {
                authorNickname: (JSON.parse(localStorage.getItem('user')).nickname),
                authorMail: (JSON.parse(localStorage.getItem('user')).name),
                date: (new Date()).toString().slice(0,24),
                text: comment,
                id: Date.now(),
                isChanged: null
            }
            gameDetails.comments.push(createdComment)
            toggleComment(gameDetails.id, gameDetails)
        }else{
            alert('Comment cannot be empty')
        }
    }

    const deleteComment = async (removableComment) => {
        const newComments = gameDetails.comments.filter((comment) => comment.id != removableComment.id )
        gameDetails.comments = newComments
        toggleComment(gameDetails.id, gameDetails)
    }

    const saveEditedComment = async (id) => {
        if (editingComment.trim()){
            const newComments = await gameDetails.comments.map((comment) => {
                if(comment.id == id){
                    if (!comment.isChanged){
                   return({...comment,text : editingComment, authorNickname : comment.authorNickname, isChanged: ' (changed)'})
                    }
                    return({...comment,text : editingComment, authorNickname : comment.authorNickname })
                }
                return comment
                })
            gameDetails.comments = newComments
            await toggleComment(gameDetails.id, gameDetails)
            setIsEditing(false)
        }else{
            alert('Comment cannot be empty')
        }
    }

    return (
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <div className={classes.comments}>
                    <h5>Comments:</h5>
                    {gameDetails?.comments?.length ? gameDetails?.comments?.map((comment) => {
                        return (
                        <div>
                            <div>{comment.authorNickname}</div>  
                            <div>{comment.isChanged}</div>   
                            <div>{comment.date}</div>
                            {isEditing && curId == comment.id ? <><input type="text" value={editingComment} onChange={(e) => {setEditingComment(e.target.value)}} /><button onClick={() => setIsEditing(false)}>Close</button><button onClick={() => saveEditedComment(comment.id)}>Save</button></> : <>
                            <div>{comment.text}</div>
                            {localStorage.getItem('user') && (JSON.parse(localStorage.getItem('user')).isAdmin) ||
                            localStorage.getItem('user') && (JSON.parse(localStorage.getItem('user')).nickname) == comment.authorNickname ? <button onClick={() => {deleteComment(comment)}}>DELETE</button> : null}
                            {localStorage.getItem('user') && (JSON.parse(localStorage.getItem('user')).name) == comment.authorMail ? <button onClick={() => {setIsEditing(true);setEditingComment(comment.text);setCurId(comment.id)}}>EDIT</button> :null}
                            </>} 
                            <hr size='10px' color="grey" width='100%'/>
                        </div>)
                    }) : null}
                    <div className={classes.inputDiv}>
                    <TextField value={addingComment} onChange={(e) => {setAddingComment(e.target.value)}} id="outlined-basic" label="Add Comment" variant="filled" onChange={(e) => setNewComment(e.target.value)} />
                    <ArrowForwardRoundedIcon onClick={(e) => {sendComment(newComment,e);setAddingComment()}}/>
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default GameComments;