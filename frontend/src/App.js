// App.js
import Sidebar from "./components/sidebar/sidebar";
import Main from "./components/main/main";
import ContextProvider from "./context/context";

export default function App() {
  return (
    <ContextProvider>
      <Sidebar />
      <Main />
    </ContextProvider>
  );
}
