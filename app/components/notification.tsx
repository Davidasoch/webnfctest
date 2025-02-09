import {useState} from 'react'
import  '@/app/styles/notifications.css';

const Notification = (message) => {

 const [display, setDisplay] = useState(true);

setDisplay(true)

 setTimeout(() => {
    setDisplay(false);
 }, 2000);

const text = JSON.stringify(message)

return(

    <div className="toast-area" id="toasts" style={{ display: display ? "block" : "none" }}>
    <div className="toast" id="clonemother">
      <div className="toast-content">
      <div className="before"></div>
      <div className="icon">&#x2714</div>
      <div className="text"><p>Success</p><p className="message">{text}</p></div>
      <div onClick={() => setDisplay((prevDisplay) => !prevDisplay)} className="close">x</div>
      </div>
    </div>
  </div>
)
}

export default Notification;