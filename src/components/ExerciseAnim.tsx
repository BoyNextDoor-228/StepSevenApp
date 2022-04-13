import React, { useContext, useEffect } from "react";
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, useFBX } from "@react-three/drei"
import Test from './Test'
import Brakedance1 from '../images/anims/Аэробика/Brakedance1'
import Brakedance2 from '../images/anims/Аэробика/Brakedance2'
import Jazz1 from '../images/anims/Аэробика/Jazz1'
import Jazz2 from '../images/anims/Аэробика/Jazz2'
import Rumba from '../images/anims/Аэробика/Rumba'
import Samba from '../images/anims/Аэробика/Samba'
import Context from "../context";
import { NavLink, useNavigate, useParams, } from "react-router-dom";
import { ITraining } from "../types/mainSystem";


const Plane = () => {
    return (
        <mesh position={[0,-0.5,0]} rotation={[- Math.PI / 2, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[300, 300]}/>
            <meshLambertMaterial attach="material" color="#aaaaaa"/>
        </mesh>
    )
}



const ExerciseAnim = () => {

    const { stateIsLoggedIn, setisloggedin, trainings, user, loading, sysLoading } = useContext(Context)
    const navigate = useNavigate()
    const urlParams = useParams()
    //const trnng: ITraining = trainings.find( (training:ITraining) => { if(training.id.toString() === urlParams.id) return true } )
    //const isUserSubscribedThisTraining: boolean = user.sports.find( (sport:number) => { if(sport.toString() === urlParams.id) return true  } )

    const checkIfValid = () => { if (stateIsLoggedIn === false) setisloggedin(false)  }
    useEffect(() => { checkIfValid(); navigate(`/exercise/${urlParams.id}`);  }, [user])

    

    const renderAnimFromProps = (anim: string): JSX.Element | null => {
        switch (anim)
        {
            case "Brakedance1": { return <Brakedance1 scale={10}/> }
            case "Brakedance2": { return <Brakedance2 scale={10}/> }
            case "Jazz1": { return <Jazz1 scale={10}/> }
            case "Jazz2": { return <Jazz2 scale={10}/> }
            case "Rumba": { return <Rumba scale={10}/> }
            case "Samba": { return <Samba scale={10}/> }
            default: return null
        }
    }

    while (loading || sysLoading) return (<h1>Loading...</h1>)
    
    //if(trnng && isUserSubscribedThisTraining)
    //{
        return (<div className="" style={{height: "100%", padding: "65px"}}>
        <h1>1. Exercise Name</h1>
        <span className="fw-bold fs-5">Курс от trainer.name</span>
        <div className="bg-dark w-75 h-75 mt-2">
            <Canvas camera={{ fov: 75, position: [25, 150, 100] }}>
                <OrbitControls addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} />
                <ambientLight intensity={0.5}/>
                <spotLight position={[10,15,10]} angle={0.04}/>
                    <Stars />
                    {renderAnimFromProps(urlParams.id!!.toString())}
                    <Plane/>
                
            </Canvas>
        </div>
    </div>)
    //}
    // else return (
    //     <div className="mt-5 text-center">
    //         <h1>Вам недоступна эта тренировка или вы перешли на несуществующую страницу.</h1>
    //         <NavLink to="/" className="fs-3 text-decoration-none">Перейти на главную страницу</NavLink>
    //     </div>
    //     )
    
}

export default ExerciseAnim; 