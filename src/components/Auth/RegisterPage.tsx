import React, { useState, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createNewUser } from '../../store/actions/userActions'
import Context from '../../context'
import { NavLink, useNavigate } from 'react-router-dom'


const RegisterPage: React.FC = () => {

    const [errorText, setErrorText] = useState('')
    const [fields, setFields] = useState({ firstnameValue: '', lastnameValue: '', emailValue: '', ageValue: 18, passwordValue: '', confirmpwdValue: '', genderValue: "", kindOfSportValue: "", expValue: 2, achievementsValue: "" })
    const [isTrainer, setIstrainer] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setisloggedin } = useContext(Context)


    const registryAttempt = async (e: React.FormEvent) => 
    {
        e.preventDefault()
        if (fields.firstnameValue.trim() && fields.lastnameValue.trim() && fields.emailValue.trim() && fields.passwordValue.trim() && fields.confirmpwdValue.trim() )
        {
            if (fields.passwordValue.trim() === fields.confirmpwdValue.trim())
            {
                let result = await dispatch(createNewUser(fields.firstnameValue, fields.lastnameValue, fields.emailValue, fields.ageValue, fields.passwordValue, fields.genderValue, fields.kindOfSportValue, fields.expValue, fields.achievementsValue))
                switch (result) 
                {
                    case "USER_EXISTS"     : setErrorText("Пользователь с таким логином уже существует"); return 0
                    case "EVERYTHING_IS_OK": setisloggedin(result)    ; return 0
                    default: setErrorText("")
                }
            }
            else setErrorText("Пароли должны совпадать")
        }
    }

    useEffect(() => { navigate('/register') }, [])

    return (
        <form className="col-5 d-block mx-auto p-5 fs-6"
              onSubmit={ (e: React.FormEvent) =>  registryAttempt(e)}>
            <img src={require('../../images/icons/logo2.png')} alt="Seven step logo" className="ms-5"/>
            <div className="mb-2">
            <label className="form-label" style={{ fontSize: "12px" }}>Если вы уже зарегистрированы, то войдите через обычную форму или зарегестрируйтесь ниже.</label>
                <input type="text" 
                       className="form-control border-0"
                       style={{backgroundColor: "#f5f5f5"}}
                       placeholder="Ваше имя"
                       value={ fields.firstnameValue }
                       onChange={ (e) => setFields({...fields, firstnameValue: e.target.value }) }
                       required/>
            </div>
            <div className="mb-2">
                <input type="text"
                       className="form-control border-0"
                       style={{backgroundColor: "#f5f5f5"}}
                       placeholder="Ваша фамилия"
                       value={ fields.lastnameValue }
                       onChange={ (e) => setFields({...fields, lastnameValue: e.target.value }) }
                       required/>
            </div>
            <div className="input-group mb-2">
            {/* <span className="input-group-text w-50">Ваш возраст</span> */}
                <input type="number"
                       className="form-control border-0"
                       style={{backgroundColor: "#f5f5f5"}}
                       placeholder='Ваш возраст'
                       min={18}
                       max={120}
                       step={1}
                       onChange={ (e) => setFields({...fields, ageValue: e.target.valueAsNumber }) }
                       required/>
            </div>

            <div className="input-group mb-2">
                        <select className="form-select border-0"
                                style={{backgroundColor: "#f5f5f5"}}
                                required 
                                value={fields.genderValue} 
                                onChange={event => setFields({...fields, genderValue:event.target.value })} >
                            <option value="" disabled selected>Ваш пол</option>
                            <option value='Мужской'>Мужской</option>
                            <option value='Женский'>Женский</option>
                        </select>
                    </div>

            <div className={isTrainer ? "input-group mb-2" : "d-none"}>
                <select className="form-select border-0"
                        style={{backgroundColor: "#f5f5f5"}}
                        value={isTrainer ? fields.kindOfSportValue : "NONE"} 
                        onChange={event => setFields({...fields, kindOfSportValue:event.target.value }) }
                        required={isTrainer} 
                        >
                    <option value="" disabled selected>Направление</option>
                    <option value='Йога'>Йога</option>
                    <option value='Кардио'>Кардио</option>
                    <option value='Пилатес'>Пилатес</option>
                    <option value='Стретчинг'>Стретчинг</option>
                    <option value='Аэробика'>Аэробика</option>
                </select>
            </div>
            
            <div className={isTrainer ? "mb-2" : "d-none"}>
                <input type="number"
                       className="form-control border-0"
                       style={{backgroundColor: "#f5f5f5"}}
                       placeholder="Ваш опыт тренинга (в годах)" 
                       
                       min={2}
                       max={100}
                       step={1}
                       required={isTrainer}
                       onChange={ (e) => setFields({...fields, expValue: e.target.valueAsNumber }) }
                       />
            </div>

            <div className={isTrainer ? "mb-2" : "d-none"}>
                <textarea className="form-control border-0"
                        style={{backgroundColor: "#f5f5f5"}}
                        placeholder="Ваши достижения" 
                        value={isTrainer ? fields.achievementsValue : "NONE" }
                        onChange={ (e) => setFields({...fields, achievementsValue: e.target.value }) }
                        required={isTrainer}
                        ></textarea>
            </div>

            <div className="mb-2">
                <input type="email"
                       className="form-control border-0"
                       style={{backgroundColor: "#f5f5f5"}}
                       placeholder="Ваш e-mail (будет использоваться как логин)" 
                       value={ fields.emailValue }
                       onChange={ (e) => setFields({...fields, emailValue: e.target.value }) }
                       required/>
            </div>
            <div className="mb-2">
                <input type="password"
                       className="form-control border-0"
                       style={{backgroundColor: "#f5f5f5"}}
                       placeholder="Пароль" 
                       value={ fields.passwordValue }
                       onChange={ (e) => setFields({...fields, passwordValue: e.target.value }) }
                       minLength={6}
                       required/>
            </div>
            <div className="mb-2">
                <input type="password"
                       className="form-control border-0"
                       style={{backgroundColor: "#f5f5f5"}}
                       placeholder="Повторите пароль" 
                       value={ fields.confirmpwdValue }
                       onChange={ (e) => setFields({...fields, confirmpwdValue: e.target.value }) }
                       minLength={6}
                       required/>
            </div>
            <div className='row justify-content-around'>
                <NavLink to="/login" 
                         className="text-dark text-decoration-none btn border border-dark d-inline mt-2 col-5">Вход
                </NavLink>
                <button type="submit" 
                        className="btn btn-dark text-center d-inline fs-6 mt-2 col-5">
                            Зарегестрироваться
                </button>
            </div>
 
            <span className="ms-2 align-middle text-danger">{errorText}</span>
        
            <div className='row justify-content-around'>
                <div className="form-check d-inline col-5">
                    <input className="form-check-input bg-dark" 
                           type="radio"
                           onChange={() => { setIstrainer(false) }}
                           checked={!isTrainer}/>
                    <label className="form-check-label">Профиль клиента</label>
                </div>
                <div className="form-check d-inline col-5">
                    <input className="form-check-input bg-dark" 
                           type="radio"
                           onChange={() => { setIstrainer(true) }}
                           checked={isTrainer}/>
                    <label className="form-check-label">Профиль тренера</label>
                </div>
            </div>

            

        </form>
        )
}

export default RegisterPage;