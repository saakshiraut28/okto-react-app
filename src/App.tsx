
import "./App.css";
import { AuthData, useOkto } from "@okto_web3/react-sdk";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Homepage from "./pages/Homepage";
import ExplorerFunctions from "./pages/ExplorerFunctions";
import Intent from "./pages/IntentFunctions";


function App() {
  const oktoClient = useOkto();

  //check if user is already logged in 
  const isloggedIn = oktoClient.isLoggedIn();
  console.log(isloggedIn);
  console.log(oktoClient);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/explorer" element={<ExplorerFunctions />} />
        <Route path="/intent" element={<Intent />} />
      </Routes>
    </>
  );
}

export default App;
