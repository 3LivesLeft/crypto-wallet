import { ethers } from "ethers";
import { useEffect, useState } from "react";

type UseWalletProps = {
  wallet: ethers.Wallet | undefined;
  walletProvider: ethers.providers.Provider | undefined;
};

const useWallet = (): UseWalletProps => {
  const [key, setKey] = useState<string | null>(null);
  const [wallet, setWallet] = useState<ethers.Wallet | undefined>();
  const [walletProvider, setWalletProvider] = useState<
    typeof ethers.providers | undefined
  >();

  useEffect(() => {
    const endpointUrl = process.env.API_ENDPOINT;
    const provider = new ethers.providers.JsonRpcProvider(endpointUrl);
    setWalletProvider(provider);
    const signer = provider.getSigner();
    setKey(localStorage.getItem("pkey"));
    if (key) {
      setWallet(new ethers.Wallet(key, provider));
    }
  }, [key]);
  return { wallet, walletProvider };
};

export default useWallet;
