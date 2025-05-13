// src/App.jsx
import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Loader } from "@react-three/drei";
import { useConvaiClient } from "./hooks/useConvaiClient";
import { Experience } from "./components/Experience";
import ChatBubble from "./components/chat/Chat";
import chatIcon from "./assets/chatIcon.jpg";     
import { FaMicrophone } from "react-icons/fa";           

export default function App() {
  const convaiApiKey = "40fb8118ec1dbc8b4b76a13208efdd0d";
  const characterId  = "ad24dcfc-2f15-11f0-b949-42010a7be01f";
  const { client }   = useConvaiClient(characterId, convaiApiKey);

  const [panelOpen, setPanelOpen] = useState(true);
  const [listening, setListening] = useState(false);

  // listen for T key down/up
  useEffect(() => {
    const down = (e) => {
      if (e.key === "t" || e.key === "T") {
        setListening(true);
      }
    };
    const up = (e) => {
      if (e.key === "t" || e.key === "T") {
        setListening(false);
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup",   up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup",   up);
    };
  }, []);


  return (
    <>
      {panelOpen ? (
        <div style={styles.panelContainer}>
          <div style={styles.panel}>
            {/* Header */}
            <div style={styles.header}>
              <span>Chatbot</span>
              <button
                onClick={() => setPanelOpen(false)}
                style={styles.closeBtn}
              >
                Close
              </button>
            </div>

            {/* Body: Avatar + Chat */}
            <KeyboardControls
              map={[
                { name: "forward",  keys: ["ArrowUp", "w", "W"] },
                { name: "backward", keys: ["ArrowDown", "s", "S"] },
                { name: "left",     keys: ["ArrowLeft", "a", "A"] },
                { name: "right",    keys: ["ArrowRight", "d", "D"] },
                { name: "sprint",   keys: ["Shift"] },
                { name: "jump",     keys: ["Space"] },
              ]}
            >
              <div style={styles.body}>
                {/* 3D Canvas */}
                <div style={styles.avatarContainer}>
                  <Loader/> 
                  <Canvas
                    style={{ width: "100%", height: "100%" }}
                    shadows
                    camera={{ position: [0, 0.02, 0.8], fov: 15 }}
                  >
                    <Experience client={client} />
                  </Canvas>
                  <div style={styles.talkHint}>
                    {listening ? (
                      <>
                        <FaMicrophone style={styles.micActive} />
                        <span style={{ marginLeft: 8 }}>Listening</span>
                      </>
                    ) : (
                      <>
                        <FaMicrophone style={styles.micInActive} />
                        <span style={{ marginLeft: 8 }}>Press <strong>[T]</strong> to talk</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Chat Bubble under Avatar */}
                <div style={styles.chatContainer}>
                  <ChatBubble client={client} chatHistory="Show" />
                </div>
              </div>
            </KeyboardControls>
          </div>
        </div>
      ) : (
        <div
          style={styles.openBtn}
          onClick={() => setPanelOpen(true)}
        >
          <img
            src={chatIcon}
            alt="Open Chatbot"
            style={{ width: "100%", height: "100%", border: "2px solid ", borderRadius: "50%",  }}
          />
        </div>
      )}
    </>
  );
}

const styles = {
  panelContainer:{
    position: "fixed",
    right: 20,
    bottom: 20,
    border: " 10px solid #000",
    padding:"2px"
  },
  panel: {
    width: "32vw",
    height: "80vh",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 1000,
  },
  header: {
    zIndex: 2,
    flexShrink: 0,
    padding: "8px 12px",
    background: "#f5f5f5",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
  },
  closeBtn: {
    border: "none",
    background: "#e74c3c",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: 4,
    cursor: "pointer",
  },
  openBtn: {
    position: "fixed",
    right: 20,
    bottom: 20,
    width: 48,
    height: 48,
    background: "transparent",
    borderRadius: 24,
    cursor: "pointer",
    zIndex: 1000,
  },
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  avatarContainer: {
    flex: 1,
    position: "relative",
    borderBottom: "1px solid #eee",
  },
  talkHint: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    textAlign: "center",
    fontSize: "0.9rem",
    background: "rgba(255,255,255,0.7)",
    padding: "4px 0",
    color: "#333",
  },
  micInActive: {
    color: "#e74c3c",
    fontSize: "0.8rem",
  },
  micActive: {
    color: "#e74c3c",
    fontSize: "0.8rem",
    animation: "pulse 1s infinite",
  },
  chatContainer: {
    flex: 1.6,      /* control the chat height */
    overflowY: "auto",
    overflowX: "hidden",
    paddingLeft: "8px",
    background: "#fafafa",
  },
};
