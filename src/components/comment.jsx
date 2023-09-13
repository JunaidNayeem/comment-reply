import React, { useState, useEffect } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  DislikeOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Alert, message } from "antd";

function Comment({ comment }) {
  // State to handle comments and replies
  const [replies, setReplies] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState([]); // Added state for comments

  useEffect(() => {
    // Load comments and replies from localStorage on component mount
    const storedComments = localStorage.getItem("comments");
    const storedReplies = localStorage.getItem("replies");

    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }

    if (storedReplies) {
      setReplies(JSON.parse(storedReplies));
    }
  }, []);

  // Function to handle adding a reply
  const addReply = () => {
    setIsEdit(true); // Set isEdit to true to show the input
  };

  const postReply = () => {
    setIsEdit(false);
    if (replyText.trim() === "") return;

    // Create a new reply object
    const newReply = {
      text: replyText,
      likes: 0,
      dislikes: 0,
    };

    // Add the reply to the replies state
    const updatedReplies = [...replies, newReply];
    setReplies(updatedReplies);
    setReplyText("");

    // Save the updated replies to local storage
    localStorage.setItem("replies", JSON.stringify(updatedReplies));
  };

  // Function to handle deleting a reply
  const deleteReply = (index) => {
    const updatedReplies = [...replies];
    updatedReplies.splice(index, 1);
    setReplies(updatedReplies);

    // Save the updated replies to local storage
    localStorage.setItem("replies", JSON.stringify(updatedReplies));
  };

  // Function to handle editing a reply
  const editReply = (index, newText) => {
    if (newText === "") {
      return message.error("This field cannot be empty");
    }
    const updatedReplies = [...replies];
    updatedReplies[index].text = newText;
    setReplies(updatedReplies);

    // Save the updated replies to local storage
    localStorage.setItem("replies", JSON.stringify(updatedReplies));
  };

  // Function to handle liking or disliking a reply
  const reactToReply = (index, type) => {
    const updatedReplies = [...replies];
    if (type === "like") {
      updatedReplies[index].likes++;
    } else if (type === "dislike") {
      updatedReplies[index].dislikes++;
    }
    setReplies(updatedReplies);

    // Save the updated replies to local storage
    localStorage.setItem("replies", JSON.stringify(updatedReplies));
  };

  return (
    <div className="comment">
      <p>{comment.text}</p>
      <div className="inputPost">
        <input
          style={{ display: isEdit ? "block" : "none", marginBlock: "20px" }}
          type="text"
          placeholder="Write a reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button
          style={{ display: isEdit ? "block" : "none" }}
          onClick={postReply}
        >
          Post
        </button>
      </div>
      <button className="replybtn" onClick={addReply}>
        Reply
      </button>
      {replies.map((reply, index) => (
        <div key={index} className="reply">
          <p>{reply.text}</p>
          <div className="btnDistribution">
            <div>
              <button onClick={() => reactToReply(index, "like")}>
                <LikeOutlined /> ({reply.likes})
              </button>
              <button onClick={() => reactToReply(index, "dislike")}>
                <DislikeOutlined /> ({reply.dislikes})
              </button>
            </div>
            <div>
              <button
                onClick={() =>
                  editReply(index, prompt("Edit your reply", reply.text))
                }
              >
                <EditOutlined />
              </button>
              <button onClick={() => deleteReply(index)}>
                <DeleteOutlined />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
