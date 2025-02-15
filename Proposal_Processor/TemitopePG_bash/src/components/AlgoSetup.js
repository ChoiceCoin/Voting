const addWallet = () => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });

    if (!connector.connected) {
      connector.createSession();
    }

    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      const { accounts } = payload.params[0];

      const addresses = accounts.map((item) => item);
      const address = accounts[0];

      localStorage.setItem("wallet-type", "walletconnect");
      localStorage.setItem("address", address);
      localStorage.setItem("addresses", addresses);

      window.location.reload();
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      const { accounts } = payload.params[0];

      const addresses = accounts.map((item) => item);
      const address = accounts[0];

      localStorage.setItem("wallet-type", "walletconnect");
      localStorage.setItem("address", address);
      localStorage.setItem("addresses", addresses);

      window.location.reload();
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        console.log(error);
      }
    });
  };