import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./ChatOnline.module.css";
import avatar from "../../images/userCard.svg";
import UserCard from "../UserCard/UserCard";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        URL + `/conversation/find/${currentId}/${user.username}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.chatOnline}>
      <h4>Online Users</h4>
      {onlineUsers?.map((online) => (
        <div
          className={styles.chatOnlineFriend}
          onClick={() => handleClick(online)}
        >
          <div className={styles.chatOnlineImgContainer}>
            <img
              className={styles.chatOnlineImg}
              src={
                online.imageData
                  ? `data:${online.imageType};base64, ${online.imageData}`
                  : avatar
              }
              alt=""
            />
            <div className={styles.chatOnlineBadge}></div>
          </div>
          <span className={styles.chatOnlineName}>{online?.username}</span>
        </div>
      ))}
    </div>
  );
}
