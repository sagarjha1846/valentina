import axios from "axios";
import {useEffect, useState} from "react";
import {GifComponent} from "./Component/GifPlayer";

export default function App() {
  const [sadImage, setSadImage] = useState([])
  const [noCounter, setNoCounter] = useState(0)
  const [query, setQuery] = useState("question")
  const [noMessages, setNoMessages] = useState("")
  const [Yes, setYes] = useState(false)
  const discourageNoMessages = [
    "Are you sure? Give it a second thought!",
    "Think about it a bit more before saying no.",
    "Please reconsider before declining.",
    "I believe you can do it! Say yes!",
    "Think positive and say yes!",
    "Don't be too quick to say no. Consider it!",
    "You've got this! Say yes!",
    "I have faith in you. Say yes!",
    "Let's be optimistic and say yes!",
    "You can do anything you set your mind to. Say yes!",
    "Take a moment and think about it before saying no.",
    "Your positive response would mean a lot!",
    "I encourage you to say yes!",
    "I'm confident you can do it. Say yes!",
    "Consider the possibilities and say yes!",
    "I believe in your abilities. Say yes!",
    "Give it a chance and say yes!",
    "Let's go with a positive approach. Say yes!",
    "Think positive thoughts and say yes!",
    "Your positive response will make a difference!",
    "A positive answer can lead to great things. Say yes!",
    "I challenge you to say yes!",
    "Why not give it a try and say yes?",
    "Positive vibes! Say yes!"
  ];

  const getRandomDiscourageNoMessage = () => {
    return discourageNoMessages[Math.floor(Math.random() * discourageNoMessages.length)];
  };

  const fetchData = async (limit,offset,query) => {
    const url = `https://api.giphy.com/v1/stickers/search?api_key=5DNgDXpjT6Wki0CHdHkML3QneF0H3b7V&q=${query}&limit=${limit}&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`
    const response = await axios.get(url)
    return response.data.data
  }

  useEffect(() => {
    (async()=>{
      const data = await fetchData(1,5,"question")
      setSadImage(data)
    })()
  }, [])

  useEffect(() => {
    if(noCounter>0){
      (async()=>{
        const data = await fetchData(200,1,"sad")
        setSadImage(data)
      })()
    }
    
  }, [noCounter])
 
  return (
   <div className=" font-pop w-[100vw] h-[100vh] grid place-items-center justify-center align-middle content-center self-center gap-10">
    {sadImage && <GifComponent yes={Yes} gifData={sadImage} noCounter={noCounter}/>}
    <div>
      <h1 className="text-3xl">
        {!Yes?"Hey, Will you be my valentine?":"I Love You"}
      </h1>
    </div>
    
    {
      Yes ? null: <div className="flex justify-between self-center align-middle content-center items-center gap-10">
      <button
        style={{
          width: noCounter === 0 ? '120' : `${(noCounter * 10)+100}px`,
          height: noCounter === 0 ? 'auto' : `${(noCounter * 2)+56}px`,
          padding: '16px 40px',
        }}
        className="bg-green-400 px-10 !font-pop font-bold text-xl text-center align-middle items-center text-white py-4 rounded-md shadow-xl border-1"
         onClick={() => {
          fetchData(1,1,"iLoveYou").then(res=>setSadImage(res))
          setYes(true)
        }}
      >
        Yes
      </button>

      <button
        className="bg-red-400 h-14 !font-pop font-bold text-xl text-center align-middle items-center text-white px-10 py-4 rounded-md shadow-xl border-1"
        onClick={() => {
          setNoCounter(prev => prev + 1)
          setQuery("sad")
          setNoMessages(getRandomDiscourageNoMessage())
        }}
      >
         {noCounter===0?"No":noMessages}
      </button>
    </div>
    }
   

   </div>
  )
}