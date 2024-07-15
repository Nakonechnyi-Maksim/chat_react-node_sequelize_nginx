import "./MainSideBar.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ChatContext from "../context/ChatContext";

export default function SideBar() {
  const [users, setUsers] = useState([]);
  const { setSelectedChatId } = useContext(ChatContext);
  useEffect(() => {
    (async function getUsers() {
      const req = await fetch("http://176.100.124.148:5000/api/allUsers");
      const res = await req.json();
      setUsers(res);
    })();
  }, []);
  // Тудушечка - Разобраться с сохранением состояния после перезагрузки
  return (
    <>
      <div className="mainBlockSideBar">
        <ul className="listUsers">
          {users &&
            users.map((el) => (
              <li data-list-id={el.id} className="user">
                <div className="blockUser">
                  <Link to="/prof" className="link">
                    <img src={el.thumbnail} alt="profile_pic" />
                  </Link>
                  <Link
                    to={`/msg?chat_id=${el.id}`}
                    className="link"
                    onClick={() => setSelectedChatId(el.id)}
                  >
                    <p>{el.username}</p>
                  </Link>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
