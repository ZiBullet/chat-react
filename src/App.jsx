/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import ava1 from './assets/images/ava1.png'
import ava2 from './assets/images/ava2.png'
import InitUser from './components/InitUser'
import Modal from './components/Modal'
import { v4 } from "uuid"


function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "Александр",
      isOnline: true,
      avatar: ava1,
    },
    {
      id: 2,
      username: "Евгения",
      isOnline: true,
      avatar: ava2,
    }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Привет. Как дела? 
      Где ты изучаешь программирование?`,
      time: "12:21",
      photo: null,
      senderID: 2
    },
    {
      id: 2,
      text: `Привет. Нормально. Как у тебя дела? Я учусь в учебном центре PROWEB`,
      time: "12:41",
      photo: null,
      senderID: 1
    },
    {
      id: 3,
      text: `Это PROWEB?`,
      time: "13:00",
      photo: "https://kursy.uz/components/com_mtree/img/listings/m/6290.jpg",
      senderID: 2
    },
  ]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("messages"));

    if (storedMessages) setMessages(storedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages])
  

  const closeHandler = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }
  const openHandler = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  const sendHandler = (user, text, photo) => {
    const fullTime = new Date().toLocaleTimeString().split(":");
    const editedTime = fullTime[0] + ":" + fullTime[1];

    const newMessage = {
      id: v4(),
      senderID: user.id,
      text: text,
      time: editedTime,
      photo: photo
    };

    setMessages([...messages, newMessage])
  }

  return (
    <>
      <section className="chat container">
        {
          users.map(user => (
            <InitUser
              user={user}
              messages={messages}
              sendHandler={sendHandler}
              openHandler={openHandler}
              key={user.id}
            />
          ))
        }
      </section>

      {
        isModalOpen &&
        <Modal
          selectedUser={selectedUser}
          sendHandler={sendHandler}
          closeHandler={closeHandler}
        />

      }

    </>
  )
}

export default App
