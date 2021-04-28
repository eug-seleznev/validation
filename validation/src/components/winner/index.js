import axios from "axios";
import { useEffect, useState } from "react"


const ip = process.env.REACT_APP_IP;

const WinAnimation = ({win, code}) => {
    const [animationSettings, setAnimationSettings] = useState(1000)
    const [loaded, setLoaded] = useState(false)
  const [registret, setRegistret] = useState(false)
    const [formData, setFormData] = useState({
      firstname: "",
      email: "Email",
      lastname: "Фамилия",
      phone: "7965",
      code: code,
    });
    useEffect(() => {
        //animation
    },[] )



         //user info handlers
        const submitUserInfo = (e) => {
          e.preventDefault();
            
          NewUser(formData).then((res) => {
            if(res.status){
              setRegistret(res.status);
              setLoaded(false)
            }
         
          })
          // console.log(formData, code)
          //server call

        };

        const userHandler = (e) => {
            setFormData({...formData, [e.target.name]: e.target.value})
        };
    return (
      <div>
        <h1>Вы выиграли {win} рублей!</h1>
        <p> Для вывода денег осталось заполнить форму</p>
        <button onClick={() => setLoaded(true)}> Заполнить</button>

        {loaded && (
          <form
            onSubmit={submitUserInfo}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div>
              <label>Имя </label>
              <input
                type="text"
                name="firstname"
                defaultValue={formData.firstname}
                onChange={userHandler}
              />
            </div>
            <div>
              <label>Фамилия </label>

              <input
                type="text"
                name="lastname"
                placeholder={formData.lastname}
                onChange={userHandler}
              />
            </div>

            <div>
              <label>Телефон: </label>

              <input
                type="phone"
                name="phone"
                placeholder={formData.phone}
                onChange={userHandler}
              />
            </div>

            <div>
              <label>Email </label>

              <input
                type="email"
                name="email"
                placeholder={formData.email}
                onChange={userHandler}
              />
            </div>

            <button>Получить выигрыш</button>
          </form>
        )}

        {registret && (
          <p>Пользователь создан, деньги отправлены</p>
        )}
      </div>
    );
}



export default WinAnimation







//reg new user
const NewUser = async (formData) => {
  try {
    
    const res = await axios.put(ip + `codes/claim`, formData);
    console.log(res.data);
    const data = {
      msg: res.data,
      status: true
    }
    return data;
  } catch (err) {
    const res = {
      msg: err.response.data.err,
      status: false,
    };
    return res;
  }
};