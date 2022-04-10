import React, {useContext, useEffect }  from "react";
import { useDispatch }      from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import TrainingCard from "./Cards/TrainingCard";
import Context from "../context";
import { updateUser } from "../store/actions/userActions";
import { ITraining } from "../types/mainSystem";

const UserList: React.FC = () => {
    const stateIsLoggedIn = useTypedSelector(state => state.user.isLoggedIn)
    const { setisloggedin, trainings, user, loading, sysLoading } = useContext(Context)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const amogus: ITraining[] = []


    const init = (): ITraining[] => {
        trainings.forEach((training: ITraining) => { 
            user.sports.forEach((sport:number) => { 
                if (training.id === sport) { amogus.push(training) }
             })
         })
         return amogus
    }

    
    



    const checkIfValid = () => { if (stateIsLoggedIn === false) setisloggedin(false)  }

    useEffect(() => { navigate('/home'); checkIfValid(); dispatch(updateUser(user.email))}, [])

    while (loading || sysLoading) { return  <h1>Loading...</h1> }
    init()

    return ( /*100vh??*/
        <div className="row m-0" style={{height: "100%"}}>
            <div className="col-6" style={{ overflow: "hidden", height: "100%", overflowY: "scroll" }}>
            <p className="text-center m-0 fw-bold">Занятия с тренером</p>
                <hr/>
                <Link to={{ pathname: "/trainings" }}
                      
                      className="btn btn-primary d-flex justify-content-center my-1">
                          Записаться на курс
                </Link>          
                { amogus.length !== 0 ? amogus.map((sport: ITraining) => { if (sport.isWithTrainer) { return <TrainingCard key={sport.id} training={sport} text={"Перейти к занятию..."} leadsTo={"mytraininginfo"}/> }} ) : <h1>Вы не записаны ни на одно занятие </h1> }    
            </div>
            <div className="col-6" style={{ overflow: "hidden", height: "100%", overflowY: "scroll" }}>
                <p className="text-center m-0 fw-bold">Занятия без тренера</p>
                <hr/>
                { amogus.length !== 0 ? amogus.map((sport: ITraining) => { return <TrainingCard key={sport.id} training={sport} text={"Перейти к занятию..."} leadsTo={"apap"}/> }) : <h1>Вы не записаны ни на одно занятие </h1> }    
            </div>
        </div>
    )
}

export default UserList;