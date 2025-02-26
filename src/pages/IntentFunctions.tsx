import React, { useState } from "react";
import GetButton from "./../components/GetButton";
import { useOkto, nftTransfer, Address } from "@okto_web3/react-sdk";
import { useNavigate } from "react-router-dom";


type ComponentType = "TransferToken" | "TransferNFT" | "RawTransaction" | null;
type NFTType = "ERC721" | "ERC1155";

interface UserOperation {
    // Define the structure based on your actual UserOperation type
    [key: string]: any;
}

export default function Intent() {
    const oktoClient = useOkto();
    const navigate = useNavigate();
    const isloggedIn = oktoClient.isLoggedIn();
    const [selectedComponent, setSelectedComponent] = useState<ComponentType>(null);

    return (
        <main className="min-h-screen flex">
            <div className="w-full p-4 border-r border-gray-300">
                <button className="text-md text-black underline" onClick={() => navigate('/')}>Back to home</button>
                <h2 className="text-black font-semibold text-2xl mb-6 text-center">
                    Intent Functions
                </h2>
                <div className="bg-white text-center p-2 rounded-xl my-4 flex-1 justify-center items-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate("/transfertoken")}
                            className="px-6 py-1 bg-gray-200 text-black rounded-lg hover:bg-gray-400 transition-colors text-center font-medium"
                        >
                            Transfer Token
                        </button>
                        <button
                            onClick={() => navigate("/transfernft")}
                            className="px-6 py-1 bg-gray-200 text-black rounded-lg hover:bg-gray-400 transition-colors text-center font-medium"
                        >
                            Transfer NFT
                        </button>
                        <button
                            onClick={() => navigate("/rawtransaction")}
                            className="px-6 py-1 bg-gray-200 text-black rounded-lg hover:bg-gray-400 transition-colors text-center font-medium"
                        >
                            Raw Transaction
                        </button>
                    </div>
                </div> 
            </div>
        </main>
    );
}
