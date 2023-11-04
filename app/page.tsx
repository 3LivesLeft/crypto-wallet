"use client";

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
import useWallet from "./hooks/useWallet";
import styles from "./page.module.scss";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userBalance, setUserBalance] = useState("0.0");
  const [value, copy] = useCopyToClipboard();
  const { wallet, walletProvider } = useWallet();

  if (wallet && walletProvider) {
    walletProvider
      .getBalance(wallet.address)
      .then((balance) => {
        setUserBalance(ethers.formatEther(balance));
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (localStorage.getItem("pkey")) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <main className={styles.main}>
      <h1>Wallet</h1>

      {loggedIn ? (
        <section className={styles.container}>
          <div className={styles.column}>
            <p className={styles.description}>Wallet address</p>
            <button
              className={styles.button}
              onClick={() => copy(wallet?.address ?? "")}
            >
              {wallet?.address}
            </button>
            <p className={styles.description}>Account balance</p>
            <p className={(styles.description, styles.balance)}>
              {userBalance}
            </p>
            <a href="/send" className={styles.button}>
              Send Ether
            </a>
          </div>
        </section>
      ) : (
        <section className={styles.container}>
          <a href="/create" className={styles.button}>
            Create Wallet
          </a>
          <a href="/login" className={styles.button}>
            Login
          </a>
        </section>
      )}
    </main>
  );
}
