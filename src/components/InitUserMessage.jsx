import { clsx } from "clsx";
import DOMPurify from "dompurify";

const InitUserMessage = ({ userID, message }) => {
    let { text } = message;
    text = text.replace(/\n/g, '<br/>');

    const cleanText = DOMPurify.sanitize(text);
    const isReceiver = userID == message.senderID;

    const clsxText = clsx("user__text", {
        "receiver": isReceiver,
        "sender": !isReceiver,
        "image-on": message.photo
    });
    const clsxMessage = clsx("user__message", {
        "receiver-message": isReceiver,
        "sender-message": !isReceiver
    });

    return (
        <div className={clsxMessage}>
            {
                message.photo ? (
                    <p className={clsxText} >
                        <img src={message.photo} alt="" />
                        <span dangerouslySetInnerHTML={{ __html: cleanText }}></span>
                    </p>
                ) : (
                    <p className={clsxText} dangerouslySetInnerHTML={{ __html: cleanText }} />
                )
            }
            <span className="user__time">{message.time}</span>
        </div>
    )
}

export default InitUserMessage