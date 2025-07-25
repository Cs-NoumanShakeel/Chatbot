import { createContext, useState } from "react";
import axios from "axios";

// Create the context
export const context = createContext();

// Provider function
export function ContextProvider({ children }) {
  const [input, setInput] = useState("");
  const [resultData, setResultData] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);

  const newChat = () => {
    setResultData("");
    setInput("");
    setRecentPrompt("");
    setShowResult(false);
    setLoading(false);
  };

  // Typing effect
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  // Send input to backend and display result word by word
  const onSend = async (customPrompt) => {
    try {
      setLoading(true);
      setResultData(""); // clear previous result

      const promptToUse = customPrompt || input;

      // ✅ Updated Django API endpoint
      const res = await axios.post("http://127.0.0.1:8000/api/generate/", {
        prompt: promptToUse,
      });

      // ✅ Gemini response is in plain text already
      let responseArray = res.data.response.split("**");
      let newResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      let finalResponse = newResponse.split("*").join("<br>");
      let newResponseArray = finalResponse.split(" ");

      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
      }

      setRecentPrompt(promptToUse);
      if (!customPrompt) {
        setPrevPrompts((prev) => [...prev, promptToUse]);
      }

      setShowResult(true);
      setInput("");
    } catch (err) {
      console.error("❌ Error in onSend:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Provide all state and functions to the app
  return (
    <context.Provider
      value={{
        onSend,
        input,
        setinput: setInput,
        resultData,
        loading,
        showResult,
        recentPrompt,
        prevPrompts,
        setrecentPrompt: setRecentPrompt,
        newChat,
      }}
    >
      {children}
    </context.Provider>
  );
}

export default ContextProvider;
