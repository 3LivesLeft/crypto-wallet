"use client";

import { Wallet, ethers } from "ethers";
import Button from "../components/Button/Button";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import styles from "../page.module.scss";

export default function Create() {
  const [value, copy] = useCopyToClipboard();
  const userWalletKeys = Wallet.createRandom().mnemonic;
  const userWallert = ethers.Wallet.fromMnemonic(
    userWalletKeys ? userWalletKeys.phrase : ""
  );

  const keyPhrase = userWallert.mnemonic?.phrase.split(" ");

  const createWallet = () => {
    if (window.localStorage) {
      localStorage.setItem("pkey", userWallert.privateKey);
      window.location.href = "/";
    }
  };

  return (
    <main className={styles.main}>
      <h1>Create Wallet</h1>
      <section className={styles.container}>
        {keyPhrase?.map((phrase, idx) => {
          return (
            <input
              className={styles.input}
              type="text"
              value={`${idx + 1}: ${phrase}`}
              disabled
              key={idx}
            />
          );
        })}
      </section>
      <div className={styles.buttonWrapper}></div>
      <Button
        text="Create Wallet"
        onClick={() => {
          copy(userWalletKeys.phrase);
          createWallet();
        }}
      />
    </main>
  );
}
