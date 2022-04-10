import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Context from "../context";
import { userSubsribedNewTraining } from "../store/actions/userActions";
import { ITraining } from "../types/mainSystem";

const TrainigFullInfo: React.FC = () => {
    const { stateIsLoggedIn, setisloggedin, trainings, user, loading, sysLoading } = useContext(Context)
    const navigate = useNavigate()
    const urlParams = useParams()
    const dispatch = useDispatch()
    const trnng: ITraining = trainings.find( (training:ITraining) => { if(training.id.toString() === urlParams.id) return true } )

    var hasSubscribed: boolean = user.sports.find( (sport:number) => { if(sport.toString() === urlParams.id) return true  } )
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
              <p style={{ height: "5%", paddingLeft: "5%", fontSize: "12px" }} >Здесь вы можете подробнее узнать о курсе тренировок</p>

              <div className="row m-0 p-0" style={{ height: "80%" }}>
                <div className="col-9 h-100" style={{ paddingLeft: "5%" }}> 
                  <div className="p-0 m-0" style={containerStyle}>
                      <div className="opacity-75 bg-light px-1 position-relative" style={{ width: "100%", height: "40%" }}>
                          <p className="pt-4 text-center d-block">{trnng.description}</p>
                          { stateHasSubscribed ? 
                          <h1>Вы записаны на этот курс</h1> :
                          <button className="btn btn-dark d-block mx-auto px-4 position-absolute bottom-0 start-50 translate-middle-x mb-2" style={{ fontSize: "12px" }} onClick={() => processRequest()}>Записаться</button>  
                    } 
                      </div>
                  </div>


                </div>
                
                <div className="col-3 h-100 p-0">
                  <div className="w-100 text-white text-center fs-5 pt-2 mb-4" style={{ borderRadius: "10px", backgroundColor: "#2A324B", height: "50px" }}>
                    {trnng.kindOfSport}
                  </div>
                  <div className="w-100 text-white text-center fs-5 pt-2 mb-4" style={{ borderRadius: "10px", backgroundColor: "#2A324B", height: "50px" }}>
                    {trnng.exercises.length} занятий
                  </div>
                  <div className="w-100 text-white text-center fs-5 pt-2 mb-4" style={{ borderRadius: "10px", backgroundColor: "#2A324B", height: "50px" }}>
                    {trnng.isWithTrainer ? <>С тренером</> : <>Без тренера</> }
                  </div>
                  <div className="w-100 text-white text-center fs-5 pt-2" style={{ borderRadius: "10px", backgroundColor: "#2A324B", height: "50px" }}>
                    TODO: НАГРУЗКА!!
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


{/* <div className="row m-0" style={{height: "100%"}}>

<h1 style={{ height: "5%"}}>{trnng.title}</h1>
<h6 style={{ height: "5%"}}>Здесь вы можете подробнее узнать о курсе тренировок</h6>

<div className="p-0" style={containerStyle}>
    <div className="opacity-75 bg-light h-25 px-1" style={{ width: "100%" }}>
        <p className="mt-4">{trnng.description}</p>
    </div>
</div>

<div style={{ height: "10%" }}>
  { stateHasSubscribed ? 
    <h1>Вы записаны на этот курс</h1> :
    <button className="btn btn-dark" onClick={() => processRequest()}>Записаться</button>  
  }  
</div>
    
</div> */}