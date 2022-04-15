import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Context from "../context";
import { userSubsribedNewTraining } from "../store/actions/userActions";
import { IExercise, ITraining } from "../types/mainSystem";
import ExerciseCard from "./Cards/ExerciseCard";

const TrainigFullInfo: React.FC = () => {
    const { stateIsLoggedIn, setisloggedin, trainings, user, loading, sysLoading } = useContext(Context)
    const navigate = useNavigate()
    const urlParams = useParams()
    const dispatch = useDispatch()
    const trnng: ITraining = trainings.find( (training:ITraining) => { if(training.id.toString() === urlParams.id) return true } )

    var hasSubscribed: boolean = user.sports.find( (sport: { s_id: number, counter: number }) => { if(sport.s_id.toString() === urlParams.id) return true  } )
    const [stateHasSubscribed, setHasSubscribed] = useState(hasSubscribed)
    
    const processRequest = () => 
    {
      dispatch(userSubsribedNewTraining(user.id, trnng.id))
      setHasSubscribed(true)
    }
    

    const checkIfValid = () => { if (stateIsLoggedIn === false) setisloggedin(false)  }
    useEffect(() => { checkIfValid(); navigate(`/training/${urlParams.id}`);  }, [user])

    while (loading || sysLoading) return (<h1>Loading...</h1>)

    if(trnng)
    {
      const backgroundImageURL = require(`../images/coursePics/course${trnng.picture}.jpg`);
      const containerStyle = {
        backgroundImage:
          `url(${backgroundImageURL})`,
        width: "90%",
        height: "80%",
        paddingLeft: "7%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex", 
        alignItems: "flex-end",
        fontSize: "12px",
        fontWeight: "bold",
        borderRadius: "15px",
        lineHeight: "1"
      };

        return (
            <div className="row m-0" style={{height: "100%"}}>
              <h2 style={{ height: "5%", paddingLeft: "5%" , fontWeight: "bold"}}> <span onClick={() => { navigate("/trainings") } }>&lt;</span> {trnng.title}</h2>
              <p style={{ height: "5%", paddingLeft: "7%", fontSize: "12px" }} >Здесь вы можете подробнее узнать о курсе тренировок</p>

              <div className="row m-0 p-0" style={{ height: "80%" }}>
                <div className="col-9 h-100" style={{ paddingLeft: "5%", overflow: "hidden", overflowY: "scroll" }}> 
                  <div className="p-0 m-0" style={containerStyle}>
                        <div className="opacity-75 bg-light px-1 position-relative" style={{ width: "100%", height: "40%" }}>
                            <p className="pt-4 text-center d-block">{trnng.description}</p>
                            { stateHasSubscribed ? 
                              <h1>Вы записаны на этот курс</h1> :
                              <button className="btn btn-dark d-block mx-auto px-4 position-absolute bottom-0 start-50 translate-middle-x mb-2" style={{ fontSize: "12px" }} onClick={() => processRequest()}>Записаться</button>  
                            } 
                        </div>
                  </div>

                  {!trnng.isWithTrainer ? 
                                    <div className="m-0" style={{overflow: "hidden", overflowY: "scroll" }}>
                                    <h3 className="pt-3 fw-bold">Тренировки</h3>
                                    <Container style={{  paddingLeft: "7%" }}>
                                      <Row xs={3} className="g-4">
                                          {trnng.exercises.map((exercise:IExercise) => {return <Col key={exercise.id}><ExerciseCard key={exercise.id} exerciseInfo={exercise} seqNumber={trnng.exercises.indexOf(exercise)} trainingType={trnng.kindOfSport} trainingId={trnng.id} redirectable={false}/> </Col>})}
                                      </Row>
                                    </Container>
                                  </div> 
                                  : 
                                  null}


                </div>
                
                <div className="col-3 h-100 pe-2 ">
                  <div className="w-100 text-white text-center fs-5 pt-2 mb-4" style={{ borderRadius: "5px", backgroundColor: "#767B91", height: "50px" }}>
                    {trnng.isWithTrainer ? <>С тренером</> : <>Без тренера</> }
                  </div>
                  <div className="w-100 text-white text-center fs-5 pt-2 mb-4" style={{ borderRadius: "5px", backgroundColor: "#2A324B", height: "50px" }}>
                    <img src={require('../images/icons/workout-selected.png')} className="pe-3"/>{trnng.kindOfSport}
                  </div>
                  <div className="w-100 text-white text-center fs-5 pt-2 mb-4" style={{ borderRadius: "5px", backgroundColor: "#2A324B", height: "50px" }}>
                  <img src={require('../images/icons/timeW.png')} className="pe-3"/>{trnng.trainingsAmount} занятий
                  </div>
                  <div className="w-100 text-white text-center fs-5 pt-2" style={{ borderRadius: "5px", backgroundColor: "#2A324B", height: "50px" }}>
                  <img src={require('../images/icons/loadW.png')} className="pe-3"/>{trnng.load} нагрузка
                  </div>
                </div>


              </div>                               
            </div>)
            
    }
    else return (
        <div className="text-center" style={{ height: "100%" }}>
            <h1>Похоже, вы перешли на несуществующую страницу!</h1>
            <NavLink to="/" className="h-50 fs-3 text-decoration-none">Перейти на главную страницу</NavLink>
        </div>
        )

}

export default TrainigFullInfo;