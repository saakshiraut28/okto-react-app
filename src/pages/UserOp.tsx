import React, { useState } from 'react';
import { useOkto } from '@okto_web3/react-sdk';
import { useNavigate } from 'react-router-dom';
import { getOrdersHistory } from '@okto_web3/react-sdk';

// Define a type for Ethereum hex strings
type HexString = `0x${string}`;

// Define types for the UserOperation based on what the SDK expects
interface UserOp {
    sender: HexString;
    nonce: HexString;
    paymaster: HexString;
    callGasLimit: HexString;
    verificationGasLimit: HexString;
    preVerificationGas: HexString;
    maxFeePerGas: HexString;
    maxPriorityFeePerGas: HexString;
    paymasterPostOpGasLimit: HexString;
    paymasterVerificationGasLimit: HexString;
    callData: HexString;
    paymasterData: HexString;
}

// Define type for the signed operation
interface SignedUserOp extends UserOp {
    signature: HexString;
}

export default function UserOperationExplorer() {
    const navigate = useNavigate();
    const oktoClient = useOkto();
    const [signedUserOp, setSignedUserOp] = useState<SignedUserOp | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalData, setModalData] = useState<string>("");

    // Sample UserOp before signing
    const userOp: UserOp = {
        sender: "0xa9F6b3A5a718754979dbA78113f3614Dd4524c53",
        nonce: "0x000000000000000000000000000000006c3581e0bd4f42d4a16294410c439e7a",
        paymaster: "0x5408fAa7F005c46B85d82060c532b820F534437c",
        callGasLimit: "0x493e0",
        verificationGasLimit: "0x30d40",
        preVerificationGas: "0xc350",
        maxFeePerGas: "0x77359400",
        maxPriorityFeePerGas: "0x77359400",
        paymasterPostOpGasLimit: "0x186a0",
        paymasterVerificationGasLimit: "0x186a0",
        callData: "0x8dd7712f000...", // truncated for brevity
        paymasterData: "0x000000000..." // truncated for brevity
    };

    // Function to show results in modal
    const showResult = (title: string, data: any) => {
        setModalTitle(title);
        setModalData(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
        setModalVisible(true);
    };

    // Function to show error in modal
    const showError = (title: string, error: any) => {
        setModalTitle(`${title} Error`);
        setModalData(error.message || JSON.stringify(error, null, 2));
        setModalVisible(true);
    };

    // Handler functions for buttons
    const handleSignUserOperation = async () => {
        try {
            const signedOp = await oktoClient.signUserOp(userOp) as SignedUserOp;
            setSignedUserOp(signedOp);
            showResult('Sign Operation', signedOp);
            return signedOp;
        } catch (error) {
            console.error('Error signing operation:', error);
            showError('Sign Operation', error);
            throw error;
        }
    };

    const handleExecuteUserOperation = async () => {
        if (!signedUserOp) {
            const error = "No signed operation available. Please sign the operation first.";
            showError('Execute Operation', { message: error });
            return;
        }

        try {
            const response = await oktoClient.executeUserOp(signedUserOp) as unknown;
            let jobId: string;

            if (typeof response === 'string') {
                jobId = response;
            } else if (response && typeof response === 'object' && 'jobId' in response) {
                jobId = (response as { jobId: string }).jobId;
            } else {
                throw new Error("Unexpected response format");
            }

            showResult('Execute Operation', { jobId });
            return { jobId };
        } catch (error) {
            console.error('Error executing operation:', error);
            showError('Execute Operation', error);
            throw error;
        }
    };

    const handleFetchOrderHistory = async () => {
        try {
            const history = await getOrdersHistory(oktoClient);
            console.log('Order history:', history);
            showResult('Order History', history);
        } catch (error) {
            console.error('Error fetching order history:', error);
            showError('Order History', error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <div className="w-1/2 p-4 border-r border-gray-300">
                <button className="text-md text-black underline" onClick={() => navigate('/')}>
                    Back to home
                </button>

                <h2 className="text-black font-semibold text-2xl mb-6 text-center">
                    User Operation
                </h2>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        className="bg-gray-200 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded transition-colors"
                        onClick={handleSignUserOperation}
                    >
                        Sign Operation
                    </button>

                    <button
                        className="bg-gray-200 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded transition-colors"
                        onClick={handleExecuteUserOperation}
                    >
                        Execute Operation
                    </button>

                    <button
                        className="bg-gray-200 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded transition-colors"
                        onClick={handleFetchOrderHistory}
                    >
                        getOrdersHistory
                    </button>
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
                                className="px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                                onClick={() => setModalVisible(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                {!modalVisible && (
                    <div className="text-center text-gray-500">
                        <p className="text-lg mb-2">No data to display</p>
                        <p>Click on a function to see the result here</p>
                    </div>
                )}
            </div>
        </div>
    );
}