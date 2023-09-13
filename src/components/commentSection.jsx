import React, { useState, useEffect } from "react";
import { Layout, message, theme } from "antd";
const { Header, Content, Footer } = Layout;
import Comment from "./comment";
import "./comment.scss";

const commentSection = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const storedComments = localStorage.getItem("comments");
  const [comments, setComments] = useState(
    storedComments ? JSON.parse(storedComments) : []
  );
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const addComment = () => {
    if (commentText.trim() === "") return;

    // Create a new comment object
    const newComment = {
      text: commentText,
    };

    // Add the comment to the comments state
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setCommentText("");

    // Save the updated comments to local storage
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  // Rest of your code remains the same...

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
      >
        <h1>Comment System</h1>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        <div className="App">
          <div className="comment-section">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={addComment}>Post Comment</button>
          </div>
          {comments.map((comment, index) => (
            <div key={index} className="comment-container">
              <Comment comment={comment} />
              <div className="conatinerEditDelete">
                <button onClick={() => deleteComment(index)}>Delete</button>
                <button
                  onClick={() =>
                    editComment(
                      index,
                      prompt("Edit your comment", comment.text)
                    )
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </Content>
    </Layout>
  );
};
export default commentSection;
