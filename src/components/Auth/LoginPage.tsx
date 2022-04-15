import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Context from '../../context'
import { getUserByEmail } from '../../store/actions/userActions'
import { useTypedSelector } from "../../hooks/useTypedSelector";
//import logo from "../../images/icons/logo.png"

const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { setisloggedin } = useContext(Context)
    const [loginField, setLoginField] = useState('')
    const [pwdField, setPwdField]     = useState('')
    const [errorText, setErrorText]   = useState('')

    const { error } = useTypedSelector(state => state.user)

    const loginAttempt = async (e: React.FormEvent) => 
    {
        e.preventDefault()
        if (loginField.trim() && pwdField.trim())
        {            
            let result: string = await dispatch(getUserByEmail(loginField, pwdField))
            setErrorText("")
            switch (result) 
            {
                case "NO_SUCH_USER"    : setErrorText("Такого пользователя не существует"); return 0
                case "EVERYTHING_IS_OK": setisloggedin(true); navigate('/home')           ; return 0
                case "WRONG_PWD"       : setErrorText("Неправильный пароль")              ; return 0
                default: setErrorText("")
            }
        }
    }

    useEffect(() => { navigate('/login') }, [error])
    return (
        <div>
            <form className="col-4 d-block mx-auto my-auto p-5 mt-5"
                  onSubmit={ (e: React.FormEvent) =>  loginAttempt(e)}>
                <img src={require('../../images/icons/logo2.png')} alt="Seven step logo"/>
                <div className="mb-2">
                    <label className="form-label" style={{ fontSize: "12px" }}>Введите e-mail и пароль, чтобы войти в аккаунт</label>
                    <input type="email" 
                           className="form-control border-0"
                           style={{backgroundColor: "#f5f5f5"}}
                           placeholder='E-mail'
                           value={ loginField }
                           onChange={ (e) => setLoginField(e.target.value) }
                           required/>
                </div>
                <div className="mb-2">
                    <input type="password"
                           className="form-control border-0"
                           style={{backgroundColor: "#f5f5f5"}} 
                           placeholder='Пароль'
                           value={ pwdField }
                           minLength={6}
                           onChange={ (e) => setPwdField(e.target.value) }
                           required/>
                </div>
                <div className='row justify-content-around'>
                    <button type="submit" 
                            className="btn btn-dark d-inline mt-2 col-5 " >Вход
                    </button>
                    <NavLink to="/register" 
                             className="text-dark text-decoration-none btn border border-dark d-inline mt-2 col-5">Регистрация
                    </NavLink>
                </div>
                    


                <span className="ms-2 align-middle text-danger">{errorText}</span>
            </form>
    </div>
    ) 
}

export default LoginPage;