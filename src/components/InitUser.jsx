/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import InitUserMessage from "./InitUserMessage"
import camerIcon from "../assets/images/camera.svg"
import sendIcon from "../assets/images/send.svg"


const InitUser = ({ user, messages, openHandler, sendHandler }) => {
    const [text, setText] = useState("");

    const sendMessage = (user, text) => {
        if (!text) return;
        sendHandler(user, text, null);
        setText("");
    }


    return (
        <div className="chat__user user">
            <div className="user__header">
                <img className="user__avatar" src={user.avatar} alt="avatar" />
                <div className="user__info">
                    <h4 className="user__name">{user.username}</h4>
                    <span className="user__status">{user.isOnline ? "Онлайн" : "Был(а) недавно"}</span>
                </div>
            </div>
            <div className="user__messages">
                {
                    messages.length ? (
                        messages.map(message => (
                            <InitUserMessage
                                key={message.id}
                                userID={user.id}
                                message={message}
                            />
                        ))
                    ) : (
                        <h4 className="empty-message">Сообщений пока нет...</h4>
                    )
                }
            </div>
            <div className="user__footer">
                <input placeholder="Написать сообщение..."
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="user__text-field" />

                <button className="user__photo-btn" onClick={() => openHandler(user)}>
                    <img src={camerIcon} alt="cameraIcon" />
                </button>
                <button className="user__send-btn" onClick={() => sendMessage(user, text)}>
                    <img src={sendIcon} alt="send icon" />
                </button>
            </div>
        </div>
    )
}

export default InitUser