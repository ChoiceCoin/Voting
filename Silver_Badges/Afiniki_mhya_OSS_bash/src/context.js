import React, { useContext, useState } from "react";

const AppContext = React.createContext();
export const AppProvider = ({ children }) => {
  const [ objectProperties,setObjectProperties] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConnected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [name, setName] = useState("");
  const [discordID, setDiscordID] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [message, setMessage] = useState({
    open: false,
    message: "default message",
    isError: false,
  });
  const handleMessagePopup = (_open, _message, _isError) => {
    setMessage({ open: _open, message: _message, isError: _isError });

    setTimeout(() => setMessage({ ...message, open: false }), 3000);
  };

  return (
    <AppContext.Provider
      value={{
        handleMessagePopup,
        message,
        setMessage,
        setObjectProperties, objectProperties,
        isModalOpen,
        setModalOpen,
        isConnected,
        setConnected,
        walletAddress,
        setWalletAddress,
        name,
        setName,
        discordID,
        setDiscordID,
        githubURL,
        setGithubURL,
        twitterHandle,
        setTwitterHandle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useContextObject = () => useContext(AppContext);
