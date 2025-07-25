import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { context } from "../../context/context";

export default function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { onSend, prevPrompts, setrecentPrompt } = useContext(context);
  const { newChat } = useContext(context);


  const loadPrompt = async (prompt) => {
    setrecentPrompt(prompt);         // Set prompt in UI
    await onSend(prompt);            // Trigger prompt processing
  };

  return (
    <div className="sidebar">
      <div className="top">
        {/* Toggle sidebar */}
        <img
          onClick={() => setExtended((prev) => !prev)}
          src={assets.menu_icon}
          className="menu"
          alt="menu"
        />

        {/* New Chat Button */}
        <div className={`new-chat ${extended ? "active" : ""}`} onClick={newChat}>
          <img src={assets.plus_icon} alt="new chat" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {/* Recent Prompts */}
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.length === 0 ? (
              <p className="recent-empty">No recent prompts</p>
            ) : (
              prevPrompts.map((item, index) => (
                <div
                  className="recent-entry"
                  key={index}
                  onClick={() => loadPrompt(item)}
                >
                  <img src={assets.message_icon} alt="msg" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer Options */}
      <div className="bottom">
        <div className={`bottom-item ${extended ? "active" : ""}`}>
          <img src={assets.question_icon} alt="help" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className={`bottom-item ${extended ? "active" : ""}`}>
          <img src={assets.history_icon} alt="history" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className={`bottom-item ${extended ? "active" : ""}`}>
          <img src={assets.setting_icon} alt="settings" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}
