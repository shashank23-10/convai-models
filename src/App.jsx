import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Loader } from "@react-three/drei";
import { useConvaiClient } from "./hooks/useConvaiClient";
import { Experience } from "./components/Experience";
import ChatBubble from "./components/chat/Chat";
import { FaMicrophone } from "react-icons/fa";
import CloseIcon from '@mui/icons-material/Close';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

export default function App() {
  const convaiApiKey = "40fb8118ec1dbc8b4b76a13208efdd0d";
  const characterId = "ad24dcfc-2f15-11f0-b949-42010a7be01f";
  const { client } = useConvaiClient(characterId, convaiApiKey);

  const [panelOpen, setPanelOpen] = useState(true);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "t" || e.key === "T") setListening(true);
    };
    const up = (e) => {
      if (e.key === "t" || e.key === "T") setListening(false);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return (
    <>
      {/* Always-visible Open Button */}
      <div style={styles.openBtn} onClick={() => setPanelOpen(true)}>
        <InsertCommentIcon
          style={{
            width: "50%",
            height: "50%",
            padding: "12px",
            border: "2px solid #e8b403",
            borderRadius: "50%",
            color: "#e8b403",
          }}
        />
      </div>

      {/* Chat Panel */}
      <div
        style={{
          ...styles.panelContainer,
          display: panelOpen ? "flex" : "none",
        }}
      >
        <div style={styles.panel}>
          {/* Header */}
          <div style={styles.header}>
            <span>Chatbot</span>
            <button onClick={() => setPanelOpen(false)} style={styles.closeBtn}>
              <CloseIcon />
            </button>
          </div>

          {/* Body */}
          <KeyboardControls
            map={[
              { name: "forward", keys: ["ArrowUp", "w", "W"] },
              { name: "backward", keys: ["ArrowDown", "s", "S"] },
              { name: "left", keys: ["ArrowLeft", "a", "A"] },
              { name: "right", keys: ["ArrowRight", "d", "D"] },
              { name: "sprint", keys: ["Shift"] },
              { name: "jump", keys: ["Space"] },
            ]}
          >
            <div style={styles.body}>
              {/* 3D Canvas */}
              <div style={styles.avatarContainer}>
                <Loader />
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
                      <span style={{ marginLeft: 8 }}>
                        Press <strong>[T]</strong> to talk
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Chat Box */}
              <div style={styles.chatContainer}>
                <ChatBubble client={client} chatHistory="Show" />
              </div>
            </div>
          </KeyboardControls>
        </div>
      </div>
    </>
  );
}

const styles = {
  panelContainer: {
    position: "fixed",
    right: 25,
    bottom: 75,
    border: "4px solid #e8b403",
    zIndex: 1000,
  },
  panel: {
    width: "32vw",
    height: "80vh",
    background: "#fff",
    border: "1px solid #ccc",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    zIndex: 2,
    flexShrink: 0,
    padding: "8px 12px",
    background: "#e8b403",
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
    zIndex: 1100,
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
    flex: 1.6,
    overflowY: "auto",
    overflowX: "hidden",
    paddingLeft: "8px",
    background: "#fafafa",
  },
};
