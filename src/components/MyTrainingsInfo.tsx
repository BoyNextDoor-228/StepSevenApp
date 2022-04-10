import React, { useContext, useEffect } from 'react'
import { NavLink, Route, useNavigate, useParams } from 'react-router-dom'
import Context from '../context'
import { ITraining } from '../types/mainSystem'

const MyTrainingInfo = () => {
    const { stateIsLoggedIn, setisloggedin, trainings, user, loading, sysLoading } = useContext(Context)
    const navigate = useNavigate()
    const urlParams = useParams()
    const trnng: ITraining = trainings.find( (training:ITraining) => { if(training.id.toString() === urlParams.id) return true } )
    const isUserSubscribedThisTraining: boolean = user.sports.find( (sport:number) => { if(sport.toString() === urlParams.id) return true  } )

    const checkIfValid = () => { if (stateIsLoggedIn === false) setisloggedin(false)  }
    useEffect(() => { checkIfValid(); navigate(`/mytraininginfo/${urlParams.id}`);  }, [user])

    while (loading || sysLoading) return (<h1>Loading...</h1>)

    console.log(trnng)
    if(trnng && isUserSubscribedThisTraining)
    {
        return (<div className="mt-5 text-center">
                    <h1>"{trnng.title}" - занятия с тренером</h1>
                    <h2>Время следующей тренировки: <u>{trnng.nextTrainingTime}</u>, ссылка: <a className="text-decoration-none" href={trnng.link} target="_blank">Нажми меня!</a></h2>
                    
                </div>)
    }
    else return (
        <div className="mt-5 text-center">
            <h1>Вам недоступна эта тренировка или вы перешли на несуществующую страницу.</h1>
            <NavLink to="/" className="fs-3 text-decoration-none">Перейти на главную страницу</NavLink>
        </div>
        )
}

export default MyTrainingInfo