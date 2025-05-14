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
      <div style={styles.openBtn} onClick={() => setPanelOpen(!panelOpen)}>
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
        {/* Header */}
        <div style={styles.header}>
          <span>Chatbot</span>
          <button onClick={() => setPanelOpen(false)} style={styles.closeBtn}>
            <CloseIcon />
          </button>
        </div>

        <div style={styles.panelBody}>
          <div style={styles.panel}>

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
                  <div style={{
                    ...styles.talkBox,
                    backgroundColor: listening ? "rgba(159, 158, 156, 0.8)" : "rgba(159, 158, 156, 0.6)"
                  }}>
                    <div style={styles.micWrapper}>
                      <FaMicrophone style={listening ? styles.micActive : styles.micInActive} />
                    </div>
                    <span style={styles.talkText}>
                      Press <strong>[T]</strong> to talk
                    </span>
                  </div>
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
  display: "flex",
  flexDirection: "column",
  width: "32vw",
  height: "85vh",
  background: "#1d2935",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
},

panelBody: {
  flex: 1,
  padding: "0.75rem 2rem",
  background: "black",
  display: "flex",
  flexDirection: "column",
},

panel: {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderTop: "1px solid #ccc",
  background: "black",
},

header: {
  flexShrink: 0,
  padding: "8px 12px",
  background: "#e8b403",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "bold",
  borderBottom: "1px solid #ddd",
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
  bottom: 12,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 5,
},

talkBox: {
  display: "flex",
  alignItems: "center",
  gap: 8,
  borderRadius: 30,
  padding: "6px 12px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  transition: "background-color 0.3s ease",
},

micWrapper: {
  width: 24,
  height: 24,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#e74c3c", // mic background
},

micInActive: {
  color: "#fff",
  fontSize: "14px",
},

micActive: {
  color: "#fff",
  fontSize: "14px",
  animation: "pulse 1s infinite",
},

talkText: {
  fontSize: "0.85rem",
  color: "#fff",
},
chatContainer: {
    flex: 1.8,
    paddingLeft: "8px",
    background: "#fafafa", 
  },
};
