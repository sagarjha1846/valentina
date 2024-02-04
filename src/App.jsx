import axios from "axios";
import {useEffect} from "react";

export default function App() {
  useEffect(() => {
    const url = 'https://api.giphy.com/v1/stickers/search?api_key=5DNgDXpjT6Wki0CHdHkML3QneF0H3b7V&q=Sad&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips'
    axios.get(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      // Handle errors
      console.error('Error fetching data:', error);
    });
  }, [])
 
  return (
   <div className=" font-pop w-[100vw] h-[100vh] bg-blue-900 grid place-items-center">
    <img alt="something" src=""/>
    <h1 className="text-5xl">
      Hello?
    </h1>
    <div className="flex">
      <button className=" bg-green-100 px-10 py-4 m-2 gap-10 rounded-md shadow-xl border-1 border-green-400">Yes</button>
      <button className=" bg-red-100 px-10 py-4 m-2 gap-10 rounded-md shadow-xl border-1 border-red-400">No</button>
    </div>
   </div>
  )
}