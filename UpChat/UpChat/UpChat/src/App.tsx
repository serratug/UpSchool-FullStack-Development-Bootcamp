import './App.css';
import React, {useState} from "react";
import ChatPage from "./pages/ChatPage.tsx";


function App() {
    const [userName, setUserName] = useState<string>('');

    const [buttonClicked, setButtonClicked] = useState<boolean>(false);


    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handleJoinChat = () => {
        if (userName.trim() !== '') {
            setUserName(userName);
            setButtonClicked(true);
        }

    }


  return (

      <div className="App">
          {buttonClicked ? (
              <ChatPage userName={userName} />
          ) : (
              <div className="join-chat-screen">
                  <div className="join-chat-content">
                      <h2>UpStorage Chat</h2>
                      <form className='join-chat-form'>
                          <input
                              type="text"
                              placeholder="Enter your username"
                              value={userName}
                              onChange={handleUserNameChange}
                              className="join-chat-input"
                          />
                          <button
                              className="join-chat-button"
                              onClick={handleJoinChat}
                              disabled={userName.trim() === ""}
                          >
                              Join Chat
                          </button>
                      </form>
                  </div>
              </div>
          )}
      </div>


  );
}

export default App;