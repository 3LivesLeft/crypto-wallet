"use client";

import { ethers } from "ethers";
import { useState } from "react";
import Button from "../components/Button/Button";
import styles from "../page.module.scss";

export default function Login() {
  const keys = Array.from({ length: 12 }, (_, i) => i + 1);
  const [inputValues, setInputValues] = useState(keys.map(() => ""));

  const login = () => {
    const phrase = inputValues.toString().replaceAll(",", " ");
    const userWallet = ethers.Wallet.fromPhrase(phrase);
    localStorage.setItem("pkey", userWallet.privateKey);
    window.location.href = "/";
  };

  function handleChange(e: React.KeyboardEvent<HTMLInputElement>, id: number) {
    const newValue = e.currentTarget.value;
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[id] = newValue;
      return newValues;
    });
  }

  return (
    <main className={styles.main}>
      <h1>Login page</h1>
      <section className={styles.container}>
        {keys?.map((key, idx) => {
          return (
            <input
              className={styles.input}
              type="text"
              value={inputValues[idx]}
              onChange={(e) => handleChange(e, idx)}
              key={idx}
            />
          );
        })}
      </section>
      <div className={styles.buttonWrapper}>
        <Button text="Login" onClick={login} />
      </div>
    </main>
  );
}
