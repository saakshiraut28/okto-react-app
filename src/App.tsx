import { useState } from "react";
import { useOkto } from "@okto_web3/react-sdk";
import { GoogleLogin } from "@react-oauth/google";
import { UserDashboard } from "./components/UserDashboard";
 
function App() {
    const oktoClient = useOkto();
    const [isLoading, setIsLoading] = useState(false);
 
    async function handleGoogleLogin(credentialResponse: any) {
        try {
            setIsLoading(true);
            await oktoClient.loginUsingOAuth({
                idToken: credentialResponse.credential,
                provider: "google",
            });
        } catch (error) {
            console.error("Authentication error:", error);
        } finally {
            setIsLoading(false);
        }
    }
 
    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : oktoClient.userSWA ? (
                <UserDashboard />
            ) : (
                <GoogleLogin onSuccess={handleGoogleLogin} />
            )}
        </div>
    );
}
 
export default App;