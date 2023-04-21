import { useEffect, useState } from 'react'
import background from '../public/bg.jpg';

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
  const [play, setPlay] = useState(false);
  const [audio] = useState(new Audio('https://www.myinstants.com/media/sounds/mlg-horns-sound-effect.mp3'))

  function mlg() {
    setPlay(() => {
      audio.play();
      return true;
    })
  }

  useEffect(() => {
    audio.addEventListener('ended', () => setPlay(false));
  }, [])

  useEffect(() => {
    fetchPolls().then((res) => {
      console.log(res);
      setData(res.reverse());
    });
  }, []);

  return (
    <div className="flex flex-col items-center" >
      {data.map((poll) => {
        const total = poll.agree + poll.disagree
        const ratioAgree = (poll.agree / total);
        const ratioDisagree = (poll.disagree / total);

        return (
          <div onClick={mlg} className="flex flex-col items-center bg-white shadow-md rounded-md m-2 p-5 hover:animate-bounce">
            <span className="text-xl font-bold">{poll.question}</span>
            <div className="w-full flex text-lg">
              {ratioAgree !== 0 && (<div
                className={`w-full bg-green-900 hover:animate-spin`}
                style={{ flex: isNaN(ratioAgree) ? '0.5' : ratioAgree.toString() }}
              >
                👍 {poll.agree}
              </div>)}
              {ratioDisagree !== 0 && (<div
                className={`w-full bg-red-900 hover:animate-spin`}
                style={{ flex: isNaN(ratioDisagree) ? '0.5' : ratioDisagree.toString() }}
              >
                👎 {poll.disagree}
              </div>)}
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default App
