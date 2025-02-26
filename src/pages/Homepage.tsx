import GetButton from "./../components/GetButton";
import {
  getAccount,
  getChains,
  getOrdersHistory,
  getPortfolio,
  getPortfolioActivity,
  getPortfolioNFT,
  getTokens,
  useOkto,
} from "@okto_web3/react-sdk";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const oktoClient = useOkto();
  const navigate = useNavigate();
  const isloggedIn = oktoClient.isLoggedIn();
  const envconfig = oktoClient.env;
  const userSWA = oktoClient.userSWA;

  async function handleLogout() {
    try {
      googleLogout();
      localStorage.removeItem("googleIdToken");
      navigate("/");
      return { result: "logout success" };
    } catch (error) {
      return { result: "logout failed" };
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[600px] space-y-6">
        <h1 className="text-center text-2xl font-bold text-black underline">
          Okto v2 SDK Demo
        </h1>

        {/* Env Config */}
        <div className="bg-white w-full p-2 rounded-xl border border-black shadow-lg">
          <h2 className="text-black font-bold text-lg mb-2">Env Config</h2>
          <pre className="whitespace-pre-wrap break-words bg-gray-100 p-2 rounded-md text-gray-800 border border-black text-left">
            {isloggedIn ? JSON.stringify(envconfig, null, 2) : "not signed in"}
          </pre>
        </div>

        {/* User Details */}
        <div className="bg-white w-full p-2 rounded-xl border border-black shadow-lg">
          <h2 className="text-black font-bold text-lg mb-2">User Details</h2>
          <pre className="whitespace-pre-wrap break-words bg-gray-100 p-2 rounded-md text-gray-800 border border-black text-left">
            {isloggedIn ? `Logged in. userSWA: ${userSWA}` : "not signed in"}
          </pre>
        </div>

        <div className="flex justify-center gap-4">
          <div className="bg-white p-6">
            <button className="px-4 py-2 text-black bg-gray-200 hover:bg-gray-400 transition" onClick={() => { navigate('/explorer') }}>
              Explorers
            </button>
          </div>

          <div className="bg-white p-6">
            <button className="px-4 py-2 text-black bg-gray-200 hover:bg-gray-400 transition" onClick={() => { navigate('/intent') }}>
              Intents
            </button>
          </div>

          <div className="bg-white p-6">
            <button className="px-4 py-2 text-black bg-gray-200 hover:bg-gray-400 transition">
              UserOp
            </button>
          </div>
        </div>

        {/* Explorer Functions
        <div className="bg-white w-full p-6 rounded-xl border border-black shadow-lg">
          <h2 className="text-black font-semibold text-2xl mb-6">
            Explorer Functions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <GetButton title="Okto Log out" apiFn={handleLogout} />
            <GetButton title="getAccount" apiFn={getAccount} />
            <GetButton title="getChains" apiFn={getChains} />
            <GetButton title="getOrdersHistory" apiFn={getOrdersHistory} />
            <GetButton title="getPortfolio" apiFn={getPortfolio} />
            <GetButton
              title="getPortfolioActivity"
              apiFn={getPortfolioActivity}
            />
            <GetButton title="getPortfolioNFT" apiFn={getPortfolioNFT} />
            <GetButton title="getTokens" apiFn={getTokens} />
          </div>
        </div>


        <div className="bg-white w-full p-6 rounded-xl border border-black shadow-lg">
          <h2 className="text-black font-semibold text-2xl mb-6">Intents</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/transfertoken")}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-center font-medium"
            >
              Transfer Token
            </button>
            <button
              onClick={() => navigate("/transfernft")}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-center font-medium"
            >
              Transfer NFT
            </button>
            <button
              onClick={() => navigate("/rawtransaction")}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-center font-medium"
            >
              Raw Transaction
            </button>
          </div>
        </div> */}
      </div>
    </main>
  );
}
