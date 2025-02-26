import React, { useState } from "react";
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

interface LogoutResult {
    result: string;
}

export default function Explorer() {
    const oktoClient = useOkto();
    const navigate = useNavigate();
    const [modalData, setModalData] = useState<string | null>(null);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    async function handleLogout(): Promise<LogoutResult> {
        try {
            googleLogout();
            localStorage.removeItem("googleIdToken");
            navigate("/");
            return { result: "logout success" };
        } catch (error) {
            return { result: "logout failed" };
        }
    }

    const handleButtonClick = async (title: string, apiFn: (client: ReturnType<typeof useOkto>) => Promise<any>): Promise<void> => {
        try {
            const result = await apiFn(oktoClient);
            setModalTitle(title);
            setModalData(JSON.stringify(result, null, 2) || "No result");
            setModalVisible(true);
        } catch (error) {
            setModalTitle(title);
            setModalData(`error: ${error}`);
            setModalVisible(true);
        }
    };

    return (
        <main className="min-h-screen flex">

            <div className="w-1/2 p-4 border-r border-gray-300">

                <button className="text-md text-black underline" onClick={() => { navigate('/') }}>Back to home</button>

                <h2 className="text-black font-semibold text-2xl mb-6 text-center">
                    Explorer Functions
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <GetButton title="getAccount" apiFn={() => handleButtonClick("getAccount", getAccount)} />
                    <GetButton title="getChains" apiFn={() => handleButtonClick("getChains", getChains)} />
                    <GetButton title="getOrdersHistory" apiFn={() => handleButtonClick("getOrdersHistory", getOrdersHistory)} />
                    <GetButton title="getPortfolio" apiFn={() => handleButtonClick("getPortfolio", getPortfolio)} />
                    <GetButton title="getPortfolioActivity" apiFn={() => handleButtonClick("getPortfolioActivity", getPortfolioActivity)} />
                    <GetButton title="getPortfolioNFT" apiFn={() => handleButtonClick("getPortfolioNFT", getPortfolioNFT)} />
                    <GetButton title="getTokens" apiFn={() => handleButtonClick("getTokens", getTokens)} />
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center">
                {modalVisible && (
                    <div className="bg-white rounded-sm border border-black w-11/12 max-w-2xl p-6">
                        <div className="flex justify-between items-center border-b border-black pb-2 mb-4">
                            <h2 className="text-lg font-semibold text-black">{modalTitle} Result</h2>
                            <button
                                className="text-black transition-colors text-2xl"
                                onClick={() => setModalVisible(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="text-left text-black max-h-96 overflow-y-auto">
                            <pre className="whitespace-pre-wrap break-words bg-gray-100 p-4 rounded">
                                {modalData}
                            </pre>
                        </div>
                        <div className="mt-4 text-right">
                            <button
                                className="px-4 py-2 bg-white text-white rounded hover:bg-gray-100 transition-colors"
                                onClick={() => setModalVisible(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}