// src/components/chat/ChatBubblev1.jsx
import React, { useState } from "react";
import "../../index.css";
import ThumbsUp_fill from "../../assets/Thumbsup_fill.png";
import Thumbsdown_fill from "../../assets/Thumbsdown_fill.png";
import Thumbsup_outline from "../../assets/Thumbsup_outline.png";
import Thumbsdownoutline from "../../assets/Thumbsdownoutline.png";

const ChatBubblev1 = (props) => {
  const { userText, npcText, keyPressed } = props;
  const [feedback, setFeedback] = useState(0);

  return (
    <div style={{ width: "100%" }}>
      {/* only show the whole chat box once the user has spoken */}
      {userText !== "" && (
        <section
          className="container"
          style={{
            position: "absolute",
            top: "2vh",
            left: "0vw",
            width: "12vw",
            height: "auto",
            borderRadius: "10px",
            background: "rgba(0, 0, 0, 0.7)",
            display: "none",
          }}
        >
          <section
            className="container-chat"
            style={{
              borderRadius: "10px",
              marginBottom: "15px",
              marginTop: "25px",
            }}
          >
            {keyPressed && (
              <div className="icon">
                <span className="span-prop" />
                <span className="span-prop" />
                <span className="span-prop" />
              </div>
            )}

            {/* user & NPC messages */}
            <div style={{ width: "100%" }}>
              <p
                style={{
                  maxHeight: "300px",
                  width: "95%",
                  color: "#FFFFFF",
                  paddingLeft: "20px",
                  marginBottom: "-10px",
                  marginTop: "10px",
                }}
              >
                {userText}
              </p>
              <p
                style={{
                  maxHeight: "38px",
                  width: "95%",
                  color: "#39FF14",
                  paddingLeft: "20px",
                }}
              >
                {npcText}
              </p>
            </div>

            {/* thumbs feedback */}
            <div
              className="item-review"
              style={{ display: "flex", marginLeft: "10px", marginTop: "25px" }}
            >
              <img
                style={{ marginRight: "10px", cursor: "pointer" }}
                src={feedback === 1 ? ThumbsUp_fill : Thumbsup_outline}
                alt="thumbs up"
                height="20px"
                onClick={() => setFeedback(feedback === 1 ? 0 : 1)}
              />
              <img
                style={{ cursor: "pointer" }}
                src={feedback === 2 ? Thumbsdown_fill : Thumbsdownoutline}
                alt="thumbs down"
                height="20px"
                onClick={() => setFeedback(feedback === 2 ? 0 : 2)}
              />
            </div>
            
          </section>
        </section>
      )}
    </div>
  );
};

export default ChatBubblev1;
