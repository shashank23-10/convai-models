// src/components/chat/ChatHistory.jsx
import React, { useState } from "react";
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
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
            width: "fit-content",
            maxWidth: "100%",
            height: "100%",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}
        >
        {messages?.length > 0 ? (
          messages.map((message, idx) => {
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
                    <div
                      style={{
                        backgroundColor: "rgba(146,22,22,0.7)",
                        padding: "12px",
                        borderRadius: "8px",
                        width: "fit-content",
                        maxWidth: "calc(100% - 40px)",  // leaves room for icon + gap
                        boxSizing: "border-box",
                      }}
                    >
                      <p style={messageTextStyle}>{message.content}</p>
                    </div>
                  </>
                )}

                {showNpc && (
                  <>
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
                    <div
                      style={{
                        backgroundColor: "rgba(37,158,98,0.7)",
                        padding: "12px",
                        borderRadius: "8px",
                        width: "fit-content",
                        maxWidth: "calc(100% - 40px)",  // leaves room for icon + gap
                        boxSizing: "border-box",
                      }}
                    >
                      <p style={messageTextStyle}>{message.content}</p>
                    </div>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "#999",
                textAlign: "center",
                fontStyle: "italic",
                fontSize: "16px",
              }}
            >
              Your conversations will appear here
            </div>
          </div>
        )}

        </div>
      </div>
    </section>
  );
};

export default ChatHistory;
