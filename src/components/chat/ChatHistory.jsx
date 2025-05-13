// src/components/chat/ChatHistory.jsx
import React, { useState } from "react";
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import ThumbsUp_fill from "../../assets/Thumbsup_fill.png";
import Thumbsdown_fill from "../../assets/Thumbsdown_fill.png";
import Thumbsup_outline from "../../assets/Thumbsup_outline.png";
import Thumbsdownoutline from "../../assets/Thumbsdownoutline.png";
import "../../index.css";

const ChatHistory = ({ messages, npcName = "Avatar", userName = "You", history }) => {
  const [feedbacks, setFeedbacks] = useState(
    () => Array(messages?.length || 0).fill(0)
  );

  return (
    <section>
      <div className="chat-Historyo">
        <div
          className="container-chat1"
          style={{
            width: "95%",
            height: "90%",
            overflowX: "hidden",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages?.map((message, idx) => {
            const next = messages[idx + 1];
            const showUser = message.sender === "user" &&
              (!next || next.sender === "npc") &&
              history;
            const showNpc = message.sender === "npc" &&
              (!next || next.sender === "user") &&
              history;

            const messageTextStyle = {
              color: "#FFFFFF",
              margin: 0,
            };

            const FeedbackIcons = (
              <div style={{ display: "flex", gap: "12px", marginLeft: 12 }}>
                <img
                  src={feedbacks[idx] === 1 ? ThumbsUp_fill : Thumbsup_outline}
                  alt="thumbs up"
                  height={17}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const fb = [...feedbacks];
                    fb[idx] = fb[idx] === 1 ? 0 : 1;
                    setFeedbacks(fb);
                  }}
                />
                <img
                  src={feedbacks[idx] === 2 ? Thumbsdown_fill : Thumbsdownoutline}
                  alt="thumbs down"
                  height={17}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const fb = [...feedbacks];
                    fb[idx] = fb[idx] === 2 ? 0 : 2;
                    setFeedbacks(fb);
                  }}
                />
              </div>
            );

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "12px",
                  gap: "8px",
                }}
              >
                {showUser && (
                  <>
                    {/* User Message Bubble */}
                    <div
                      style={{
                        backgroundColor: "rgba(146,22,22,0.7)",
                        padding: "12px",
                        borderRadius: "8px",
                        width: "80%",             // ← fixed width
                        minWidth: "80%",
                      }}
                    >
                      <p style={messageTextStyle}>{message.content}</p>
                    </div>
                    {/* User Icon */}
                    <PermIdentityTwoToneIcon
                      style={{
                        color: "rgba(146,22,22,0.7)",
                        border: "2px solid rgba(146,22,22,0.7)",
                        padding: 4,
                        borderRadius: "50%",
                        fontSize: "24px",
                        flexShrink: 0,
                      }}
                    />
                  </>
                )}

                {showNpc && (
                  <>
                    {/* NPC Icon */}
                    <SmartToyTwoToneIcon
                      style={{
                        color: "rgba(37,158,98,0.7)",
                        border: "2px solid rgba(37,158,98,0.7)",
                        padding: 4,
                        borderRadius: "50%",
                        fontSize: "24px",
                        flexShrink: 0,
                      }}
                    />
                    {/* NPC Message Bubble */}
                    <div
                      style={{
                        backgroundColor: "rgba(37,158,98,0.7)",
                        padding: "12px",
                        borderRadius: "8px",
                        width: "80%",            // ← fixed width
                        minWidth: "80%",
                      }}
                    >
                      <p style={messageTextStyle}>{message.content}</p>
                    </div>
                    {/* Feedback */}
                    {FeedbackIcons}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChatHistory;
