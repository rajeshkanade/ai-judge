import React, { useState } from "react";
import ChatBox from "../../../components/ChatBox"
import JudgePanel from "../../../components/JudgePanel";

const Home = () => {
  const [sideAChats, setSideAChats] = useState([]);
  const [sideBChats, setSideBChats] = useState([]);
  const [judgeResponse, setJudgeResponse] = useState("");

  return (
   <>
    <div className="flex h-full">
      {/* Side A */}
      <div className="flex-1 bg-white p-4 border-r">
        <h2 className="text-xl font-bold mb-2 text-blue-600 text-center">Side A (Lawyer 1)</h2>
        <ChatBox
          side="A"
          chats={sideAChats}
          setChats={setSideAChats}
          setJudgeResponse={setJudgeResponse}
          opponentChats={sideBChats}
        />
      </div>

      {/* Judge Panel */}
      <div className="w-1/3 bg-gray-50 p-4 border-x">
        <JudgePanel response={judgeResponse} />
      </div>

      {/* Side B */}
      <div className="flex-1 bg-white p-4">
        <h2 className="text-xl font-bold mb-2 text-red-600 text-center">Side B (Lawyer 2)</h2>
        <ChatBox
          side="B"
          chats={sideBChats}
          setChats={setSideBChats}
          setJudgeResponse={setJudgeResponse}
          opponentChats={sideAChats}
        />
      </div>
    </div>
   </>
  );
};

export default Home;
