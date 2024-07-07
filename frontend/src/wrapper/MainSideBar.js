import "./MainSideBar.css";
import Users from "../mock/testUsers";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <>
      <div className="mainBlockSideBar">
        <ul className="listUsers">
          {Users.map((el) => (
            <li className="user">
              <div className="blockUser">
                <Link to="/msg" className="link">
                  <img src={el.profilePic} alt="profile_pic" />
                  <p>{el.name}</p>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
