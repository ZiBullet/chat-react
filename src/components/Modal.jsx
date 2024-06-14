/* eslint-disable no-unused-vars */
import { useState } from "react"


const Modal = ({ selectedUser, sendHandler, closeHandler }) => {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState("");

  const closeModal = () => {
    setText("");
    setPhoto("");
    closeHandler()
  }

  const sendPhoto = (user, text, photo) => {
    if (!photo) return;
    sendHandler(user, text, photo)
    closeModal();
  }

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal__wrapper" onClick={e => e.stopPropagation()}>
        <h2 className="modal__title">Отправить картинку</h2>
        <div className="modal__fields">
          <label>
            <input
              className='modal__field'
              placeholder='URL'
              type="url"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
            <span>URL</span>
          </label>
          <label>
            <input
              className='modal__field'
              placeholder='Комментарий'
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <span>Комментарий</span>
          </label>
        </div>
        <div className="modal__btns">
          <button className="modal__btn btn-cancel" onClick={closeModal}>Отмена</button>
          <button className="modal__btn btn-send" onClick={() => sendPhoto(selectedUser, text, photo)}>ОТПРАВИТЬ</button>
        </div>
      </div>
    </div>
  )
}

export default Modal