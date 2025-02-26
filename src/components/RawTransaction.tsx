"use client";
import { useState } from "react";
import { useOkto, evmRawTransaction, Address, UserOp } from "@okto_web3/react-sdk";
import { useNavigate } from "react-router-dom";

function EVMRawTransaction() {
    const oktoClient = useOkto();
    const [caip2Id, setcaip2Id] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [value, setValue] = useState("");
    const [data, setData] = useState("");
    const [userOp, setUserOp] = useState<any | null>(null);
    const [signedUserOp, setSignedUserOp] = useState<any | null>(null);
    const [editableUserOp, setEditableUserOp] = useState<string>("");
    const [responseMessage, setResponseMessage] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleCreateUserOp = async () => {
        try {
            const rawTransactionIntentParams = {
                caip2Id: caip2Id,
                transaction: {
                    from: from as Address,
                    to: to as Address,
                    value: BigInt(value),
                    data: (data ? data : undefined) as any,
                },
            };
            console.log("Creating UserOp with params:", rawTransactionIntentParams);
            const createdUserOp = await evmRawTransaction(
                oktoClient,
                rawTransactionIntentParams
            );
            setUserOp(createdUserOp);
            const formattedUserOp = JSON.stringify(createdUserOp, null, 2);
            setEditableUserOp(formattedUserOp);
            setResponseMessage(`UserOp created:\n${formattedUserOp}`);
        } catch (error: any) {
            console.error("Error creating UserOp:", error);
            setResponseMessage(`Error creating UserOp: ${error.message}`);
        }
    };

    const handleSignUserOp = async () => {
        if (!editableUserOp) {
            setResponseMessage("Error: Create UserOp first!");
            return;
        }
        try {
            const parsedUserOp = JSON.parse(editableUserOp);
            const signedOp = await oktoClient.signUserOp(parsedUserOp);
            setSignedUserOp(signedOp);
            const formattedSignedOp = JSON.stringify(signedOp, null, 2);
            setResponseMessage(`UserOp signed:\n${formattedSignedOp}`);
        } catch (error: any) {
            console.error("Error signing UserOp:", error);
            setResponseMessage(`Error signing UserOp: ${error.message}`);
        }
    };

    const handleExecuteUserOp = async () => {
        if (!signedUserOp) {
            setResponseMessage("Error: Sign UserOp first!");
            return;
        }
        try {
            const result = await oktoClient.executeUserOp(signedUserOp);
            const formattedResult = JSON.stringify(result, null, 2);
            setResponseMessage(`Execution Result:\n${formattedResult}`);
        } catch (error: any) {
            console.error("Error executing UserOp:", error);
            setResponseMessage(`Error executing UserOp: ${error.message}`);
        }
    };

    const handleEVMRawTransaction = async () => {
        try {
            const rawTransactionIntentParams = {
                caip2Id,
                transaction: {
                    from: from as Address,
                    to: to as Address,
                    value: BigInt(value),
                    data: (data ? data : undefined) as any,
                },
            };
            console.log(
                "Executing EVM Raw Transaction with params:",
                rawTransactionIntentParams
            );
            const createdUserOp = await evmRawTransaction(
                oktoClient,
                rawTransactionIntentParams
            );
            const signedOp = await oktoClient.signUserOp(createdUserOp as UserOp);
            const result = await oktoClient.executeUserOp(signedOp);
            const formattedResult = JSON.stringify(result, null, 2);
            setResponseMessage(
                `EVM Raw Transaction executed successfully!\nResult:\n${formattedResult}`
            );
        } catch (error: any) {
            console.error("Error executing EVM Raw Transaction:", error);
            setResponseMessage(`Error: ${error.message}`);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(responseMessage);
            setModalVisible(true);
        } catch (error) {
            console.error("Clipboard copy failed", error);
        }
    };

    const closeModal = () => setModalVisible(false);

    return (
        <main className="flex min-h-screen flex-col items-center p-6 md:p-12 bg-white w-full">
            <button className="text-md text-black underline" onClick={() => { navigate('/') }}>Back to home</button>
            <h1 className="text-black font-bold text-3xl mb-8">
                EVM Raw Transaction
            </h1>
            <div className="flex flex-col gap-4 w-full max-w-2xl">
                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-xl border border-black">
                    <input
                        className="w-full p-1 my-2 bg-gray-200 border border-gray-800 text-black placeholder-gray-700 focus:border-black transition-colors"
                        value={caip2Id}
                        onChange={(e) => setcaip2Id(e.target.value)}
                        placeholder="Enter Network (ChainId/CAIP2)"
                    />

                    <input
                        className="w-full p-1 my-2 bg-gray-200 border border-gray-800 text-black placeholder-gray-700 focus:border-black transition-colors"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder="Enter Sender Address"
                    />

                    <input
                        className="w-full p-1 my-2 bg-gray-200 border border-gray-800 text-black placeholder-gray-700 focus:border-black transition-colors"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="Enter Recipient Address"
                    />

                    <input
                        className="w-full p-1 my-2 bg-gray-200 border border-gray-800 text-black placeholder-gray-700 focus:border-black transition-colors"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter Value in Wei"
                    />

                    <input
                        className="w-full p-1 my-2 bg-gray-200 border border-gray-800 text-black placeholder-gray-700 focus:border-black transition-colors"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder="Enter Data (optional)"
                    />

                    <button
                        className="w-[300px] px-8 py-1 bg-gray-200 text-black rounded hover:bg-gray-400 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black mb-4"
                        onClick={handleEVMRawTransaction}
                    >
                        Execute EVM Raw Transaction
                    </button>

                    <div className="w-full flex flex-col space-y-4 items-center justify-center">
                        <button
                            className="w-[300px] px-8 py-1 bg-gray-200 text-black rounded hover:bg-gray-400 transition-colors focus:ring-1 focus:ring-offset-black"
                            onClick={handleCreateUserOp}
                        >
                            Create UserOp
                        </button>

                        {userOp && (
                            <textarea
                                className="w-full p-4 bg-white border border-gray-700 rounded text-black font-mono text-sm resize-vertical focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                value={editableUserOp}
                                onChange={(e) => setEditableUserOp(e.target.value)}
                                rows={10}
                                placeholder="Edit UserOp JSON here"
                            />
                        )}

                        <button
                            className="w-[300px] px-8 py-1 bg-gray-200 text-black rounded hover:bg-gray-400 transition-colors focus:ring-1 focus:ring-offset-black"
                            onClick={handleSignUserOp}
                        >
                            Sign UserOp
                        </button>

                        <button
                            className="w-[300px] px-8 py-1 bg-gray-200 text-black rounded hover:bg-gray-400 transition-colors focus:ring-offset-black"
                            onClick={handleExecuteUserOp}
                        >
                            Execute UserOp
                        </button>
                    </div>

                    {responseMessage && (
                        <div className="w-full mt-4">
                            <textarea
                                className="w-full p-4 bg-white border border-gray-700 rounded text-black font-mono text-sm resize-vertical focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                value={responseMessage}
                                readOnly
                                rows={6}
                            />
                            <button
                                className="w-[300px] px-8 py-1 bg-gray-200 text-black rounded hover:bg-gray-400 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                                onClick={copyToClipboard}
                            >
                                Copy Response to Clipboard
                            </button>
                        </div>
                    )}

                    {modalVisible && (
                        <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
                            <div className="bg-white rounded-lg w-11/12 max-w-2xl p-6 border border-black shadow-xl">
                                <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
                                    <div className="text-black text-lg font-semibold">
                                        Transaction Status
                                    </div>
                                    <button
                                        className="text-gray-400 hover:text-gray-200 transition-colors text-2xl"
                                        onClick={closeModal}
                                    >
                                        &times;
                                    </button>
                                </div>
                                <div className="text-left">
                                    <pre className="whitespace-pre-wrap break-words bg-white p-4 rounded text-black">
                                        {responseMessage}
                                    </pre>
                                </div>
                                <div className="mt-4 text-right">
                                    <button
                                        className="px-4 py-2 bg-gray-700 text-black rounded hover:bg-gray-600 transition-colors"
                                        onClick={closeModal}
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

export default EVMRawTransaction;
