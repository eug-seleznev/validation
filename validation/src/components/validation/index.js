import { useEffect, useState } from "react";
import ValidationForm from "./Validation";
import axios from 'axios'

//1 . validate link from qr, and render form on success
const ip = process.env.REACT_APP_IP;

const Validation = ({match}) => {
    const {link} = match.params;
    const [loaded, setLoaded] = useState(false)
    useEffect(() => 
    {
        ValidateLink(link).then(res => {
            setLoaded(res)
        })
    },
    
    [link]);
    
    return (
      <div>
        {loaded ? (
          <div>
            <h3> Итак, вы почти выиграли - осталось ввести валидационный код</h3>
            <ValidationForm link={link} />
          </div>
        ) : (
          <div>
            <p> Страница не найдена!</p>
          </div>
        )}
      </div>
    );
}



export default Validation




const ValidateLink = async (link) => {
    try {
        const res = await axios.get(ip + `codes/qr/${link}`);
        return true
    } catch (err) {
        // let msg = err.response.data.err
        return false
    
    }
//   alert(res.data.msg);
};