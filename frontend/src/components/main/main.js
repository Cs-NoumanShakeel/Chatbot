import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { context } from "../../context/context";

export default function Main() {
  const {
    onSend,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setinput,
    input,
  } = useContext(context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can I help today?</p>
            </div>

            <div className="cards">
              <div
                className="card"
                onClick={() => {
                  setinput("Plan my wedding");
                  onSend();
                }}
              >
                 <p>Plan for a wedding</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div
                className="card"
                onClick={() => {
                  setinput("Briefly summarize this concept: urban planning");
                  onSend();
                }}
              >
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div
                className="card"
                onClick={() => {
                  setinput(
                    "Brainstorm team bonding activities for our work retreat"
                  );
                  onSend();
                }}
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>

              <div
                className="card"
                onClick={() => {
                  setinput("Argue between Theologist and an Atheist");
                  onSend();
                }}
              >
                <p>Argue between Theologist and an Atheist</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              onChange={(e) => setinput(e.target.value)}
              value={input}
            />
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            <img
              src={assets.send_icon}
              alt=""
              onClick={() => {
                if (input.trim()) {
                  console.log("Sending prompt:", input);
                  onSend();
                }
              }}
            />
          </div>
        </div>

        <p className="bottom-info">
          Gemini may display incorrect info, including about people, so
          double-check its responses.
        </p>
      </div>
    </div>
  );
}
