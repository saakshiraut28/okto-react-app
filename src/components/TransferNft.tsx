"use client";
import { useState } from "react";
import { Address, nftTransfer, useOkto } from "@okto_web3/react-sdk";
import { useNavigate } from "react-router-dom";

function TransferNFT() {
    const oktoClient = useOkto();

    const [networkId, setNetworkId] = useState("");
    const [collectionAddress, setCollectionAddress] = useState("");
    const [nftId, setNftId] = useState("");
    const [recipientWalletAddress, setRecipientWalletAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [userOp, setUserOp] = useState<any | null>(null);
    const [userOpString, setUserOpString] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const transferParams = {
            caip2Id: networkId,
            collectionAddress: collectionAddress as Address,
            nftId,
            recipientWalletAddress: recipientWalletAddress as Address,
            amount: Number(amount),
            nftType: type as "ERC721" | "ERC1155",
        };

        console.log("NFT transfer params", transferParams);

        try {
            const userOpTmp = await nftTransfer(oktoClient, transferParams);
            setUserOp(userOpTmp);
            setUserOpString(JSON.stringify(userOpTmp, null, 2));
        } catch (error: any) {
            console.error("NFT Transfer failed:", error);
            setModalMessage("Error: " + error.message);
            setModalVisible(true);
        }
    };

    const handleSubmitUserOp = async () => {
        if (!userOpString) return;
        try {
            const editedUserOp = JSON.parse(userOpString);
            const signedUserOp = await oktoClient.signUserOp(editedUserOp);
            const tx = await oktoClient.executeUserOp(signedUserOp);
            setModalMessage("NFT Transfer Submitted: " + JSON.stringify(tx, null, 2));
            setModalVisible(true);
        } catch (error: any) {
            console.error("NFT Transfer failed:", error);
            setModalMessage("Error: " + error.message);
            setModalVisible(true);
        }
    };

    const handleCloseModal = () => setModalVisible(false);

    return (
        <main className="flex min-h-screen flex-col items-center p-6 md:p-12 bg-white w-full">
            <button className="text-md text-black underline" onClick={() => { navigate('/') }}>Back to home</button>

            <h1 className="text-black font-bold text-3xl my-4">Transfer NFT</h1>
            <div className="flex flex-col gap-4 w-full max-w-2xl">
                <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow-xl border border-black">
                    <input
                        className="w-full p-1 m-2  border border-black text-black placeholder-gray-600 focus:border-black transition-colors"
                        value={networkId}
                        onChange={(e) => setNetworkId(e.target.value)}
                        placeholder="Enter Network ChainId"
                    />

                    <input
                        className="w-full p-1 m-2  border border-black text-black placeholder-gray-600 focus:border-black transition-colors"
                        value={collectionAddress}
                        onChange={(e) => setCollectionAddress(e.target.value)}
                        placeholder="Enter Collection Address"
                    />

                    <input
                        className="w-full p-1 m-2  border border-black text-black placeholder-gray-600 focus:border-black transition-colors"
                        value={nftId}
                        onChange={(e) => setNftId(e.target.value)}
                        placeholder="Enter NFT ID"
                    />

                    <input
                        className="w-full p-1 m-2  border border-black text-black placeholder-gray-600 focus:border-black transition-colors"
                        value={recipientWalletAddress}
                        onChange={(e) => setRecipientWalletAddress(e.target.value)}
                        placeholder="Enter Recipient Wallet Address"
                    />

                    <input
                        className="w-full p-1 m-2  border border-black text-black placeholder-gray-600 focus:border-black transition-colors"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter Amount"
                    />

                    <input
                        className="w-full p-1 m-2  border border-black text-black placeholder-gray-600 focus:border-black transition-colors"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Enter NFT Type (nft or empty string)"
                    />

                    <button
                        className="w-[300px] px-8 py-1 bg-gray-200 text-black hover:bg-gray-400 transition-colors focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-black"
                        onClick={handleSubmit}
                    >
                        Create Transfer
                    </button>

                    {userOp && (
                        <>
                            <div className="w-full mt-4">
                                <textarea
                                    className="w-full p-4 border-black border border-gray-700 rounded text-black font-mono text-sm resize-vertical focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    value={userOpString}
                                    onChange={(e) => setUserOpString(e.target.value)}
                                    rows={10}
                                />
                            </div>
                            <button
                                className="w-full p-3 mt-4 bg-green-500 text-black rounded hover:bg-green-600 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
                                onClick={handleSubmitUserOp}
                            >
                                Sign and Send Transaction
                            </button>
                        </>
                    )}

                    {modalVisible && (
                        <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
                            <div className="bg-white rounded-lg w-11/12 max-w-2xl p-6 border border-black shadow-xl">
                                <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
                                    <div className="text-black text-lg font-semibold">
                                        NFT Transfer Status
                                    </div>
                                    <button
                                        className="text-gray-400 hover:text-gray-200 transition-colors text-2xl"
                                        onClick={handleCloseModal}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <div className="text-left">
                                    <pre className="whitespace-pre-wrap break-words bg-white p-4 rounded text-black">
                                        {modalMessage}
                                    </pre>
                                </div>
                                <div className="mt-4 text-right">
                                    <button
                                        className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-400 transition-colors"
                                        onClick={handleCloseModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default TransferNFT;
