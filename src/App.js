import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [mail, setMail] = useState("");
    const [code, setCode] = useState("");
    const [dataCode, setDataCode] = useState("")
    const [dataMail, setDataMail] = useState("")
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if (dataMail === "success") {
            window.location.reload();
        }
    });

    const sendCode = async () => {
        if (mail !== "") {
            return await axios.get(`https://api.vagoweb3.com/api/v1.1/send/email/code?email=${mail}`)
                .then(function (response) {
                    setDataCode(response.data.message)
                })
        }
    }

    const register = async () => {
        return await axios.post("https://api.vagoweb3.com/api/v1/register",{
            "email": mail,
            "password": "minhhiep",
            "emailCode": code,
            "inviteCode": "bca8e29b"
        })
            .then(function (response) {
                setDataMail(response.data.message)
            })
    }

    const handleChangeMail = (e) => {
        setMail(e.target.value);
        console.log(mail)
    }

    const handleChangeCode = (e) => {
        setCode(e.target.value);
    }

    const checkCode = async () => {
        setDisabled(true)
        for (let i = 0; i < 3   ; i++) {
            if (dataCode !== "success") {
                await sendCode()
            } if (dataCode === "success") {
                break;
            }
            console.log(i)
        }
        if(dataCode !== "success") setDisabled(false)
    }

    const regSuccess = async () => {
        await register().then(() => {
            if (dataMail === "success") {
                setMail("")
                setCode("")
                setDataMail("null")
                setDataCode("null")
            }
        })
    }

    return (
        <div className={"container mt-5"}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" value={mail} className="form-control"
                           onChange={handleChangeMail}
                           placeholder="Enter email"/>
                        <small className="form-text text-muted"> {dataCode} </small>
                </div>
                <button className="btn btn-primary mt-3" onClick={checkCode} disabled={disabled}>Submit</button>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Code</label>
                    <input type="number" value={code} className="form-control"
                           placeholder="Code" onChange={handleChangeCode}/>
                    <small className="form-text text-muted"> {dataMail} </small>
                </div>

                <button className="btn btn-primary mt-3" onClick={regSuccess}>Reg</button>
        </div>
    );
}

export default App;
