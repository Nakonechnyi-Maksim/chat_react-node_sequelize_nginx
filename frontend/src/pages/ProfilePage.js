import Users from "../mock/testUsers";
import "./ProfilePage.css";

export default function ProfilePage() {
  return (
    <>
      <div className="mainBlock">
        <div className="profile">
          <div className="wrapperProf">
            <img className="avatar" src={Users[0].profilePic} alt="avatar" />
            <div className="status">
              <p>{Users[0].status}</p>
            </div>
          </div>
          <div className="aboutMe">
            <span className="name">Имя {Users[0].name}</span>
            <span className="login">Логин {Users[0].login}</span>
            <span className="birthDate">
              Дата рождения {Users[0].birthDate}
            </span>
          </div>
        </div>
        <div className="posts">
          <div className="newPost">
            <input type="text" name="" id="" />
          </div>
          <div className=""></div>
        </div>
      </div>
    </>
  );
}
