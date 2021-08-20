import { makeStyles, TextField, Button } from "@material-ui/core";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import React from "react";
import { useState } from "react";
import { useProducts } from "../../contexts/ProductContext";

const useStyles = makeStyles(() => ({
  commentsInnerContainer: {
    maxWidth: "1000px",
    minHeight: "500px",
  },

  inps: {
    margin: "10px 0",
    borderBottom: "1px white solid",
  },
  comments: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  inputDiv: {
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: 0,
    flexDirection: "column",
    width: "100%",
  },
  inpColor: {
    color: "white",
  },
  secondaryText: {
    color: "grey",
    lineHeight: "20px",
    fontSize: "14px",
  },
  commentDelete: {
    border: "0",
    borderRadius: "5px",
    backgroundColor: "red",
    color: "white",
  },
  commentEdit: {
    backgroundColor: "inherit",
    color: "white",
    border: "1px white solid",
    borderRadius: "5px",
    marginLeft: "10px",
  },
  commmentSave: {
    backgroundColor: "inherit",
    color: "green",
    border: "1px white solid",
    borderRadius: "5px",
    marginLeft: "10px",
  },
  commentClose: {
    backgroundColor: "inherit",
    color: "red",
    border: "1px white solid",
    borderRadius: "5px",
  },
  usersComment: {
    color: "white",
    width: "100%",
    wordWrap: "break-word",
  },
  editInput: {
    marginBottom: "10px",
  },
  arrow: {
    color: "white",
    marginLeft: "10px",
  },
  inpAndArrowDiv: {
    display: "flex",
    alignItems: "center",
  },
  addComment: {
    backgroundColor: "inherit",
    backgroundColor: "green",
    borderRadius: "5px",
    marginBottom: "10px",
    color: "white",
  },
}));

const ProductComments = () => {
  const [newComment, setNewComment] = useState("");
  const [addingComment, setAddingComment] = useState();
  const [editingComment, setEditingComment] = useState();
  const [curId, setCurId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { productDetails, toggleComment } = useProducts();
  const classes = useStyles();
  const sendComment = async (comment) => {
    if (comment.trim()) {
      const createdComment = {
        authorNickname: JSON.parse(localStorage.getItem("user")).nickname,
        authorMail: JSON.parse(localStorage.getItem("user")).name,
        date: new Date().toString().slice(0, 24),
        text: comment,
        id: Date.now(),
        isChanged: null,
      };
      productDetails.comments.push(createdComment);
      toggleComment(productDetails.id, productDetails);
    } else {
      alert("Comment cannot be empty");
    }
  };

  const deleteComment = async (removableComment) => {
    const newComments = productDetails.comments.filter(
      (comment) => comment.id != removableComment.id
    );
    productDetails.comments = newComments;
    toggleComment(productDetails.id, productDetails);
  };

  const saveEditedComment = async (id) => {
    if (editingComment.trim()) {
      const newComments = await productDetails.comments.map((comment) => {
        if (comment.id == id) {
          if (!comment.isChanged) {
            return {
              ...comment,
              text: editingComment,
              authorNickname: comment.authorNickname,
              isChanged: " (changed)",
            };
          }
          return {
            ...comment,
            text: editingComment,
            authorNickname: comment.authorNickname,
          };
        }
        return comment;
      });
      productDetails.comments = newComments;
      await toggleComment(productDetails.id, productDetails);
      setIsEditing(false);
    } else {
      alert("Comment cannot be empty");
    }
  };

  return (
    <div className={classes.commentsOuterContainer}>
      <div className={classes.commentsInnerContainer}>
        <div className={classes.comments}>
          <h5 className={classes.inpColor}>Comments:</h5>
          <div className={classes.inputDiv}>
            <div className={classes.inpAndArrowDiv}>
              {isAdding ? (
                <>
                  <TextField
                    InputProps={{
                      className: classes.inpColor,
                    }}
                    InputLabelProps={{
                      style: { color: "#fff" },
                    }}
                    className={classes.inps}
                    value={addingComment}
                    onChange={(e) => {
                      setAddingComment(e.target.value);
                    }}
                    id="outlined-basic"
                    label="Add Comment"
                    variant="filled"
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <ArrowForwardRoundedIcon
                    className={classes.arrow}
                    onClick={(e) => {
                      sendComment(newComment, e);
                      setIsAdding(!isAdding);
                    }}
                  />
                </>
              ) : (
                <Button
                  onClick={() => setIsAdding(true)}
                  className={classes.addComment}
                >
                  Add Comment
                </Button>
              )}
            </div>

            {productDetails?.comments?.length
              ? productDetails?.comments?.map((comment) => {
                  return (
                    <div className={classes.usersComment}>
                      <h5>{comment.authorNickname}</h5>
                      <div className={classes.secondaryText}>
                        {comment.isChanged}
                      </div>
                      <div className={classes.secondaryText}>
                        {comment.date}
                      </div>
                      {isEditing && curId == comment.id ? (
                        <>
                          <input
                            className={classes.editInput}
                            type="text"
                            value={editingComment}
                            onChange={(e) => {
                              setEditingComment(e.target.value);
                            }}
                          />
                          <br />
                          <Button
                            className={classes.commentClose}
                            onClick={() => setIsEditing(false)}
                          >
                            Close
                          </Button>
                          <Button
                            className={classes.commmentSave}
                            onClick={() => saveEditedComment(comment.id)}
                          >
                            Save
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className={classes.usersComment}>
                            {comment.text}
                          </div>
                          {(localStorage.getItem("user") &&
                            JSON.parse(localStorage.getItem("user")).isAdmin) ||
                          (localStorage.getItem("user") &&
                            JSON.parse(localStorage.getItem("user")).nickname ==
                              comment.authorNickname) ? (
                            <Button
                              className={classes.commentDelete}
                              onClick={() => {
                                deleteComment(comment);
                              }}
                            >
                              DELETE
                            </Button>
                          ) : null}
                          {localStorage.getItem("user") &&
                          JSON.parse(localStorage.getItem("user")).name ==
                            comment.authorMail ? (
                            <Button
                              className={classes.commentEdit}
                              onClick={() => {
                                setIsEditing(true);
                                setEditingComment(comment.text);
                                setCurId(comment.id);
                              }}
                            >
                              EDIT
                            </Button>
                          ) : null}
                        </>
                      )}
                      <hr size="10px" color="grey" width="100%" />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComments;
