import React from "react";
import { useState } from "react";
//import logo from "../../assets/ConvaiLogo.png";
import "../../index.css";
import ThumbsUp_fill from "../../assets/Thumbsup_fill.png";
import Thumbsdown_fill from "../../assets/Thumbsdown_fill.png";
import Thumbsup_outline from "../../assets/Thumbsup_outline.png";
import Thumbsdownoutline from "../../assets/Thumbsdownoutline.png";
import { PiClockClockwiseBold } from "react-icons/pi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const ChatHistory = (props) => {
  const { history, showHistory, messages, npcName, userName } = props;
  const [feedbacks, setFeedbacks] = useState(Array(messages?.length).fill(0));
  return (
    <section>
      <div className="chat-Historyo">
        <div
          className="container-chat1"
          style={{
            width: "95%",
            height: "80%",
            overflow: "auto",
            marginBottom: "15px",
            marginTop: "15px",
            marginLeft: "20px",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages?.map((message, idx) => {

            const isUserMessage = message.sender === "user";
            const nextMessage = messages[idx + 1];
            const isNextMessageUser =
              !nextMessage || nextMessage.sender === "user";
            const isNextMessageNpc =
              !nextMessage || nextMessage.sender === "npc";

            const messageStyle = {
              color: "#FFFFFF",
              paddingLeft: "10px",
              // marginBottom: isNextMessageUser ? "0px" : 0,
            };

            return (
              <section key={idx}>
                {message.sender === "user" && isNextMessageNpc && history
                  ? message.content && (
                      <div style={{ marginBottom: "2px" }}>
                        <span
                          style={{
                            color: "rgba(243,167,158,255)",
                            marginRight: "-5px",
                            fontWeight: "bold",
                          }}
                        >
                          {userName}:
                        </span>
                        <span style={messageStyle}>{message.content}</span>
                      </div>
                    )
                  : message.sender === "npc" && isNextMessageUser && history
                  ? message.content && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "15px",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              color: "rgba(127,210,118,255)",
                              marginRight: "-10px",
                              fontWeight: "bold",
                            }}
                          >
                            Avatar:
                          </span>
                          <span style={messageStyle}>{message.content}</span>
                        </div>
                      </div>
                    )
                  : ""}
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChatHistory;
