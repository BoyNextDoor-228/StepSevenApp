import React, {useContext, useEffect, useState }  from "react";
import { useDispatch }      from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Context from "../context";
import { updateUser } from "../store/actions/userActions";
import { ITraining } from "../types/mainSystem";
import Loader from "./Others/Loader";
import MyCourseCard from "./Cards/MyCourseCard";

const MyCourses: React.FC = () => {
    const stateIsLoggedIn = useTypedSelector(state => state.user.isLoggedIn)
    const { setisloggedin, trainings, user, loading, sysLoading } = useContext(Context)
    const [isWithTrainer, setIsWithTrainer] = useState(true)
    const [stateTrainings, setStateTrainings] = useState<ITraining[]>()
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
    const filterCourses = (courses: ITraining[]) => {
        if (isWithTrainer)
        {
            courses = courses.filter( (course:ITraining ) => ( course.isWithTrainer === true ) )
            setStateTrainings(courses)
        }
        else 
        {
            courses = courses.filter( (course:ITraining ) => ( course.isWithTrainer === false ) )
            setStateTrainings(courses)
        }
        
    }

    
    



    const checkIfValid = () => { if (stateIsLoggedIn === false) setisloggedin(false)  }
    // dispatch(updateUser(user.email)) |||
    //                                  vvv
    useEffect(() => { navigate('/mycourses'); checkIfValid(); filterCourses(amogus) }, [isWithTrainer])

    while (loading || sysLoading) { return  <Loader/> }
    init()

    return (
        <div className="row m-0" style={{height: "100%"}}>
            <div style={{height: "20%", paddingLeft: "5%"}}>
                <h2 className="fw-bold">Мои курсы</h2>
                <p style={{fontSize: "12px"}}>Здесь представлены курсы, на которые вы записаны</p>
                <h4 className="fw-bold" >В процессе</h4>
            </div>
            <div className="row" style={{height: "80%"}}>
                <div className="col-9 pt-2" style={{overflow: "hidden", overflowY: "scroll", paddingLeft: "6%" }}>
                    {stateTrainings?.map((course:ITraining) => { return <MyCourseCard key={course.id} training={ course }/> })}
                </div>
                <div className="col-3 pt-2">
                    <div className="w-100"
                        style={{borderRadius: "15px", backgroundColor: "#E1E5EE", height: "22%" }} >
                            <h5 className="p-3 fw-bold">Вид курса</h5>
                            <div className="h-50 d-flex justify-content-around">
                                <div className="d-inline h-50 px-3 py-1"
                                    style={{borderRadius: "15px", fontSize: "12px", backgroundColor: isWithTrainer ? "#FFF" : "#767B91", color: isWithTrainer ? "#767B91" : "#FFF" }}
                                    onClick={ () => setIsWithTrainer(true) }>
                                    С тренером
                                </div>
                                <div className="d-inline h-50 px-3 pt-1"
                                    style={{borderRadius: "15px", fontSize: "12px", backgroundColor: isWithTrainer ? "#767B91" : "#FFF", color: isWithTrainer ? "#FFF" : "#767B91" }}
                                    onClick={ () => setIsWithTrainer(false) }> 
                                    Без тренера
                                </div>
                            </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MyCourses;

            // <div className="col-6" style={{ overflow: "hidden", height: "100%", overflowY: "scroll" }}>
            // <p className="text-center m-0 fw-bold">Занятия с тренером</p>
            //     <hr/>
            //     <Link to={{ pathname: "/trainings" }}
                      
            //           className="btn btn-primary d-flex justify-content-center my-1">
            //               Записаться на курс
            //     </Link>          
            //     { amogus.length !== 0 ? amogus.map((sport: ITraining) => { if (sport.isWithTrainer) { return <TrainingCard key={sport.id} training={sport} text={"Перейти к занятию..."} leadsTo={"mytraininginfo"}/> }} ) : <h1>Вы не записаны ни на одно занятие </h1> }    
            // </div>
            // <div className="col-6" style={{ overflow: "hidden", height: "100%", overflowY: "scroll" }}>
            //     <p className="text-center m-0 fw-bold">Занятия без тренера</p>
            //     <hr/>
            //     { amogus.length !== 0 ? amogus.map((sport: ITraining) => { return <TrainingCard key={sport.id} training={sport} text={"Перейти к занятию..."} leadsTo={"apap"}/> }) : <h1>Вы не записаны ни на одно занятие </h1> }    
            // </div>