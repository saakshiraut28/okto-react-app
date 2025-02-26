import {
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
        <div>{isloggedIn ? (<button className="px-12 py-2 text-black bg-gray-200 hover:bg-gray-400 transition" onClick={handleLogout}>Logout</button>) : (<>Login</>)}</div>

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
          <div className="bg-white p-2">
            <button className="px-12 py-2 text-black bg-gray-200 hover:bg-gray-400 transition" onClick={() => { navigate('/explorer') }}>
              Explorers
            </button>
          </div>
          <div className="bg-white p-2">
            <button className="px-12 py-2 text-black bg-gray-200 hover:bg-gray-400 transition" onClick={() => { navigate('/intent') }}>
              Intent
            </button>
          </div>
          <div className="bg-white p-2">
            <button className="px-12 py-2 text-black bg-gray-200 hover:bg-gray-400 transition" onClick={() => { navigate('/userop') }}>
              UserOp
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
