import { useState } from "react";
import userConversation from "../../zustand/useConversation";
import axios from "axios";

const SendMessage = () => {
    const { selectedConversation } = userConversation();
    const [msg, setMsg] = useState("");

    const sendMessage = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!msg.trim() || !selectedConversation) return;

        try {
            const res = await axios.post(`/api/message/send/${selectedConversation._id}`, { message: msg });
            console.log(res);
            setMsg("");
        } catch (err) {
            console.error("Failed to send message", err);
        }
    };

    return (
        <div>
            <form onSubmit={sendMessage}>
                <input 
                    type="text" 
                    placeholder="Type a message" 
                    value={msg} 
                    onChange={(event) => setMsg(event.target.value)} 
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default SendMessage;
