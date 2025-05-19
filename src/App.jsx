import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Loader } from "@react-three/drei";
import { useConvaiClient } from "./hooks/useConvaiClient";
import { Experience } from "./components/Experience";
import ChatBubble from "./components/chat/Chat";
import { FaMicrophone } from "react-icons/fa";
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import backgroundImg from './assets/background.jpg';


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
    <div style={styles.pageContainer}>
      {/* Toggle Button */}
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

      {/* Transparent Chat Panel Body Only */}
      {panelOpen && (
        <div style={styles.panelBodyContainer}>
          <div style={styles.panelBody}>
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
                    style={{ width: "100%", height: "100%", background: "transparent" }}
                    shadows
                    gl={{ alpha: true }}
                    camera={{ position: [0, 0.026, 0.8], fov: 10 }}
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

                {/* Chat Box Transparent */}
                <div style={styles.chatContainer}>
                  <ChatBubble client={client} chatHistory="Show" />
                </div>
              </div>
            </KeyboardControls>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  pageContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
backgroundImage: `url(${backgroundImg})`,

    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
  },

  panelBodyContainer: {
    position: "absolute",
    right: 25,
    bottom: 75,
    width: "32vw",
    height: "65vh",
    background: "transparent",
    border: "none",
    boxShadow: "none",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    padding: "30px 0",
  },

  panelBody: {
    flex: 1,
    padding: "0.75rem 2rem",
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "none",
  },

  openBtn: {
    position: "absolute",
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
    borderBottom: "none",
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
    backgroundColor: "#e74c3c",
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
    flex: 2.8,
    paddingLeft: "8px",
    background: "transparent",
  },
};