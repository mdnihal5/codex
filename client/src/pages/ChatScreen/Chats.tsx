import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useContext } from 'react'
import userContext, { UserContextType } from "../../utils/userContext";
import { toast } from "react-hot-toast";
import { Send,CircleUserRound } from 'lucide-react';
import {FC} from 'react'
const Chats:FC = () =>{

  const [text,setText]=useState("");
  const userContextValue = useContext(userContext) as UserContextType;
    const { messages, getMessages, user } = userContextValue;

  const handleSendMessage = async (e:any) => {
    e.preventDefault();
    try {
            const res = await fetch("/api/chats/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({text:text}),
            });
            await res.json();
            if (res.ok) {
                toast.success("Message sent successfully");
                getMessages();
            }
        } catch (error) {
            console.log("cannot send messages ",error);
        }
  };

  return <>
    <div className=" mt-16 flex flex-col md:mx-20 h-[90%] mb-24">
      <div className="flex-1 h-full p-4 bg-gray-100 dark:bg-gray-950">
        <div className="grid gap-4 animate-fade-in">
        {messages && messages.length>0 && messages.map((message)=>
            user?._id==message.userId ?<div key={message._id} className="flex items-start gap-3 justify-end animate-slide-in-right">
            <div  className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%] shadow-md transition-all duration-300 hover:shadow-lg">
              <span className="flex gap-2"><CircleUserRound/><p className="text-lg">{message.username}</p></span>
              <p className="text-lg text-black">{message.text}</p>
              <div className="text-xs text-black mt-1">{new Date(message.date).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}</div>
            </div>
          </div>:<div  key={message._id} className="flex items-start gap-3 animate-slide-in-left">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 max-w-[80%] shadow-md transition-all duration-300 hover:shadow-lg">
              <span className="flex gap-2"><CircleUserRound/><p className="text-lg">{message.username}</p></span>
              <p className="text-lg text-black">{message.text}</p>
              <div className="text-xs text-black mt-1">{new Date(message.date).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}</div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
    <div className="flex items-center justify-center">
    <div className="bg-gray-100 mx-auto  dark:bg-gray-950 fixed w-[80%] items-center justify-center flex bottom-4">
        <form onSubmit={handleSendMessage} className="w-full flex">
          <Input
          type="text"
          placeholder="Type your message..."
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setText(e.target.value)}
          className="flex-1 bg-white border-2 rounded-lg border-sky-500 dark:bg-gray-800 rounded-lg px-4  text-sm shadow-sm transition-all duration-300 focus:shadow-md"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSendMessage}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <Send className="h-5 w-5 animate-bounce" />
        </Button>
        </form>
      </div>
    </div></>
}
export default Chats;