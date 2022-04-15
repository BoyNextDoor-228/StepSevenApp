import React, {useContext, useEffect, useState }  from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Context from "../context";
import { ITraining } from "../types/mainSystem";
import Loader from "./Others/Loader";
import MyCourseCard from "./Cards/MyCourseCard";

const MyCourses: React.FC = () => {
    const stateIsLoggedIn = useTypedSelector(state => state.user.isLoggedIn)
    const { setisloggedin, trainings, user, loading, sysLoading } = useContext(Context)
    const [isWithTrainer, setIsWithTrainer] = useState(true)
    const [stateTrainings, setStateTrainings] = useState<ITraining[]>()
    const navigate = useNavigate()
    const inprogressTrainings: ITraining[] = []
    const passedTrainings: ITraining[] = []


    const init = (): ITraining[] => {
        trainings.forEach((training: ITraining) => { 
            user.sports.forEach((sport: { s_id: number, counter: number }) => { 
                if ((training.id === sport.s_id) && (training.trainingsAmount > sport.counter)) { inprogressTrainings.push(training) }
             })
         })
         return inprogressTrainings
    }

    const initPassedTrainings = (): ITraining[] => {
        trainings.forEach((training: ITraining) => { 
            user.sports.forEach((sport: { s_id: number, counter: number }) => { 
                if ((training.id === sport.s_id) && (training.trainingsAmount <= sport.counter) ) { passedTrainings.push(training) }
             })
         })
         return passedTrainings
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
    useEffect(() => { navigate('/mycourses'); checkIfValid(); filterCourses(inprogressTrainings) }, [isWithTrainer])

    while (loading || sysLoading) { return  <Loader/> }
    init()
    initPassedTrainings()

    if (stateTrainings?.length)
    {
        return (
            <div className="row m-0" style={{height: "100%"}}>
                <div style={{height: "15%", paddingLeft: "5%"}}>
                    <h2 className="fw-bold">Мои курсы</h2>
                    <p style={{fontSize: "12px"}}>Здесь представлены курсы, на которые вы записаны</p>
                </div>
                <div className="row" style={{height: "85%"}}>
                    
                    <div className="col-9 pt-2" style={{overflow: "hidden", overflowY: "scroll", height: "100%", paddingLeft: "6%" }}>
                    <h4 className="fw-bold" style={{height: "5%", marginBottom: "20px"}} >В процессе</h4>
                        {stateTrainings?.map((course:ITraining) => { return <MyCourseCard key={course.id} training={ course } arePassed={false}/> })}
                        <h4 className="fw-bold" style={{height: "5%" , marginBottom: "20px"}} >Выполненные</h4>
                        {passedTrainings?.map((course:ITraining) => { return <MyCourseCard key={course.id} training={ course } arePassed={true}/> })}
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
    else
    {
        return (
            <div className="row m-0" style={{height: "100%"}}>
                <div style={{height: "20%", paddingLeft: "5%"}}>
                    <h2 className="fw-bold">Мои курсы</h2>
                    <p style={{fontSize: "12px"}}>Здесь представлены курсы, на которые вы записаны</p>
                    <h4 className="fw-bold" >Вы не записаны ни на один курс</h4>
                </div>
            </div>
        )
    }
}

export default MyCourses;