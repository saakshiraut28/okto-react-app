import React, { useState } from "react";
import { useOkto } from "@okto_web3/react-sdk";

interface GetButtonProps {
  title: string;
  apiFn: any;
}

const GetButton: React.FC<GetButtonProps> = ({ title, apiFn }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [resultData, setResultData] = useState("");
  const oktoClient = useOkto();

  const handleButtonClick = () => {
    apiFn(oktoClient)
      .then((result: any) => {
        console.log(`${title}:`, result);
        const resultData = JSON.stringify(result, null, 2);
        setResultData(resultData !== "null" ? resultData : "No result"); // Pretty print the JSON
        setModalVisible(true);
      })
      .catch((error: any) => {
        console.error(`${title} error:`, error);
        setResultData(`error: ${error}`); // Pretty print the JSON
        setModalVisible(true);
      });
  };

  const handleClose = () => setModalVisible(false);

  return (
    <div className="text-center">
      <button
        className="w-full p-2 bg-gray-200 text-black rounded hover:bg-gray-400 transition-colors"
        onClick={handleButtonClick}
      >
        {title}
      </button>

      {modalVisible && (
        <div className="fixed inset-0 flex justify-center items-center z-50 hidden">
          <div className="bg-white rounded-lg w-11/12 max-w-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center border-b border-black pb-2 mb-4">
              <h2 className="text-lg font-semibold text-white">{title} Result</h2>
              <button
                className="text-black hover:text-black transition-colors text-2xl"
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            <div className="text-left text-white max-h-96 overflow-y-auto hidden">
              <pre className="whitespace-pre-wrap break-words bg-gray-900 p-4 rounded">
                {resultData}
              </pre>
            </div>
            <div className="mt-4 text-right hidden">
              <button
                className="px-4 py-2 bg-gray-700 text-black rounded hover:bg-gray-600 transition-colors"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetButton;
