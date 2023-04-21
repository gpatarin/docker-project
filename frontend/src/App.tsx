import { useEffect, useState } from 'react'

import { fetchPolls } from "./api/poll/poll"

interface Poll {
  id: string;
  question: string;
  agree: number;
  disagree: number;
  result: string;
}

// 👎 👍

function App() {
  const [data, setData] = useState<Poll[]>([]);

  useEffect(() => {
    fetchPolls().then((res) => {
      console.log(res);
      setData(res);
    });
  }, []);

  return (
    <div className="flex flex-col" >
      {data.map((poll) => (
        <div className="flex flex-col items-center bg-white shadow-md rounded-md m-2 p-5">
          <span className="text-xl font-bold">{poll.question}</span>
          <div className="w-full flex justify-around text-lg">
            <div>👍 {poll.agree}</div>
            <div>👎 {poll.disagree}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
