"use client";

import { ethers } from "ethers";
import { useState } from "react";
import Button from "../components/Button/Button";
import useWallet from "../hooks/useWallet";
import styles from "../page.module.scss";

export default function Send() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const { wallet } = useWallet();

  const handleAdress = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setAddress(e.currentTarget.value);
  };

  const handleAmount = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setAmount(e.currentTarget.value);
  };

  const sendEth = () => {
    const tx = {
      to: address,
      value: ethers.parseEther(amount),
    };
    wallet?.sendTransaction(tx).then((txhash) => console.log(txhash));
  };
  return (
    <main className={styles.main}>
      <h1>Send Ether</h1>
      <section className={styles.container}>
        <div className={styles.block}>
          <p className={styles.description}>Amount</p>
          <input
            className={styles.input}
            type="number"
            placeholder="0.0"
            onChange={(e) => handleAmount(e)}
          />
        </div>
        <div className={styles.block}>
          <p className={styles.description}>Recipient address</p>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => handleAdress(e)}
          />
        </div>
      </section>
      <div className={styles.buttonWrapper}>
        <Button text="Send" onClick={sendEth} />
      </div>
    </main>
  );
}
