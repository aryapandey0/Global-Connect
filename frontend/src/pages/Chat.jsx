import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [contacts] = useState([
    { id: 1, name: "Alice Johnson", lastMessage: "See you tomorrow!" },
    { id: 2, name: "Bob Smith", lastMessage: "Got it, thanks!" },
    { id: 3, name: "Charlie Davis", lastMessage: "Let’s meet at 5pm." }
  ]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedContact]);

  const handleSend = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const chatId = selectedContact.id;
    const updatedMessages = {
      ...messages,
      [chatId]: [
        ...(messages[chatId] || []),
        { sender: "me", text: newMessage, time: new Date().toLocaleTimeString() }
      ]
    };

    setMessages(updatedMessages);
    setNewMessage("");
  };

  return (
    <div className="flex h-[80vh] bg-gray-100 rounded shadow">
      {/* Contacts Sidebar */}
      <div className="w-1/4 bg-white border-r overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
              selectedContact?.id === contact.id ? "bg-gray-100" : ""
            }`}
            onClick={() => setSelectedContact(contact)}
          >
            <h3 className="font-semibold">{contact.name}</h3>
            <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex flex-col flex-1">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b font-semibold">
              Chat with {selectedContact.name}
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {(messages[selectedContact.id] || []).map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 flex ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg max-w-xs ${
                      msg.sender === "me"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-xs opacity-75 block">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-l px-3 py-2 outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-orange-500 text-white px-4 py-2 rounded-r"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
