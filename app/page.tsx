"use client";

import axios, { AxiosError } from "axios";
import styles from "./page.module.css";

export default function Home() {
  /** 送信ボタン押下時 */
  const handleRequestData: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    /** 入力内容をフォームデータにまとめる */
    const formData = new FormData(e.currentTarget);

    // データを送る
    axios
      .post("/api/mail", formData)
      .then((response) => console.log(response.data))
      .catch((error: AxiosError) =>
        console.error(`Status:${error.status}, Message:${error.response?.data}`)
      );
  };

  return (
    <main className={styles.main}>
      <p>フォーム</p>
      <form onSubmit={handleRequestData}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", gap: "20px" }}>
            <label htmlFor="name">名前</label>
            <input type="text" id="name" name="name" />
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <label htmlFor="email">メールアドレス</label>
            <input type="email" id="email" name="email" />
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <label htmlFor="subject">題名</label>
            <input type="text" id="subject" name="subject" />
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <label htmlFor="content">内容</label>
            <textarea id="content" name="content" />
          </div>
          <input type="submit" value="送信" />
        </div>
      </form>
    </main>
  );
}
