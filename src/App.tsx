
import "./App.css";
import { AuthData, useOkto } from "@okto_web3/react-sdk";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Homepage from "./pages/Homepage";
import ExplorerFunctions from "./pages/ExplorerFunctions";
import Intent from "./pages/IntentFunctions";
import TransferNFT from "./components/TransferNft";
import RawTransaction from "./components/RawTransaction";
import TransferTokens from "./components/TransferTokens";
import UserOp from "./pages/UserOp";


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
        <Route path="/userop" element={<UserOp />} />
        <Route path="/transfertoken" element={<TransferTokens />} />
        <Route path="/transfernft" element={<TransferNFT />} />
        <Route path="/rawtransaction" element={<RawTransaction />} />
      </Routes>
    </>
  );
}

export default App;
