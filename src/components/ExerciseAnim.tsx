import React, { useContext, useEffect } from "react";
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars} from "@react-three/drei"

import Brakedance1 from '../images/anims/Аэробика/Brakedance1'
import Brakedance2 from '../images/anims/Аэробика/Brakedance2'
import Jazz1 from '../images/anims/Аэробика/Jazz1'
import Jazz2 from '../images/anims/Аэробика/Jazz2'
import Rumba from '../images/anims/Аэробика/Rumba'
import Samba from '../images/anims/Аэробика/Samba'

import Cat from '../images/anims/Йога/Cat'
import Mountain from '../images/anims/Йога/Mountain'
import Semibridge from '../images/anims/Йога/Semibridge'
import Tree from '../images/anims/Йога/Tree'
import Wind from '../images/anims/Йога/Wind'

import Crossjump from '../images/anims/Кардио/Crossjump'
import Crossjumprotation from '../images/anims/Кардио/Crossjumprotation'
import Crunch from '../images/anims/Кардио/Crunch'
import Pistol from '../images/anims/Кардио/Pistol'
import Pushups from '../images/anims/Кардио/Pushups'
import Quickjumps from '../images/anims/Кардио/Quickjumps'
import Sitdownsbendarms from '../images/anims/Кардио/Sitdownsbendarms'
import Sitdownsstraightarms from '../images/anims/Кардио/Sitdownsstraightarms'
import Situps from '../images/anims/Кардио/Situps'
import Starjumps from '../images/anims/Кардио/Starjumps'

import Hundred from '../images/anims/Пилатес/Hundred'
import Pendulum from '../images/anims/Пилатес/Pendulum'
import Planklegups from '../images/anims/Пилатес/Planklegups'
import Roundcrunch from '../images/anims/Пилатес/Roundcrunch'

import Absbend from '../images/anims/Стретчинг/Absbend'
import Armscheststretching from '../images/anims/Стретчинг/Armscheststretching'
import Bendarmscheststretching from '../images/anims/Стретчинг/Bendarmscheststretching'
import Headbend from '../images/anims/Стретчинг/Headbend'
import Shouldersstretching from '../images/anims/Стретчинг/Shouldersstretching'
import Spinestretching from '../images/anims/Стретчинг/Spinestretching'

import Context from "../context";
import { useNavigate, useParams, } from "react-router-dom";
import { IExercise, ITraining, KindsOfSport } from "../types/mainSystem";


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

    let trainingInfo: ITraining = {
        id: 0,
        kindOfSport: KindsOfSport.CARDIO,
        isWithTrainer: false,
        title: "",
        short_desc: "",
        description: "",
        trainingsAmount: 0,
        picture: "",
        trainer: {
            t_id: 0,
            name: ""
        },
        exercises: [],
        load: "",
        users: [],
        link: "",
        nextTrainingTime: []
    }
    trainings.forEach( (training:ITraining) => {
        training.exercises.forEach( (exercise:IExercise) => { if (exercise.path === urlParams.id!!.toString() ) trainingInfo = training } )
    });

    const renderAnimFromProps = (anim: string): JSX.Element | null => {
        switch (anim)
        {
            case "Brakedance1": { return <Brakedance1 scale={10}/> }
            case "Brakedance2": { return <Brakedance2 scale={10}/> }
            case "Jazz1": { return <Jazz1 scale={10}/> }
            case "Jazz2": { return <Jazz2 scale={10}/> }
            case "Rumba": { return <Rumba scale={10}/> }
            case "Samba": { return <Samba scale={10}/> }
            case "Cat":        { return <Cat scale={10}/> }
            case "Mountain":   { return <Mountain scale={10}/> }
            case "Semibridge": { return <Semibridge scale={10}/> }
            case "Tree": { return <Tree scale={10}/> }
            case "Wind": { return <Wind scale={10}/> }
            case "Crossjump": { return <Crossjump scale={10}/> }
            case "Crossjumprotation": { return <Crossjumprotation scale={10}/> }
            case "Crunch": { return <Crunch scale={10}/> }
            case "Pistol": { return <Pistol scale={10} /> }
            case "Pushups": { return <Pushups scale={10}/> }
            case "Quickjumps": { return <Quickjumps scale={10}/> }
            case "Sitdownsbendarms": { return <Sitdownsbendarms scale={10}/> }
            case "Sitdownsstraightarms": { return <Sitdownsstraightarms scale={10}/> }
            case "Situps": { return <Situps scale={10}/> }
            case "Starjumps": { return <Starjumps scale={10}/> }
            case "Hundred": { return <Hundred scale={10}/> }
            case "Pendulum": { return <Pendulum scale={10}/> }
            case "Planklegups": { return <Planklegups scale={10}/> }
            case "Roundcrunch": { return <Roundcrunch scale={10}/> }
            case "Absbend": { return <Absbend scale={10}/> }
            case "Armscheststretching": { return <Armscheststretching scale={10}/> }
            case "Bendarmscheststretching": { return <Bendarmscheststretching scale={10}/> }
            case "Headbend": { return <Headbend scale={10}/> }
            case "Shouldersstretching": { return <Shouldersstretching scale={10}/> }
            case "Spinestretching": { return <Spinestretching scale={10}/> }
            default: return null
        }
    }

    while (loading || sysLoading) return (<h1>Loading...</h1>)
    
    //if(trnng && isUserSubscribedThisTraining)
    //{
        return (<div className="" style={{height: "100%", padding: "65px"}}>
        <h1>{trainingInfo.exercises.findIndex( (exercise:IExercise) => ( exercise.path === urlParams.id!!.toString() ) ) + 1}. {trainingInfo.exercises[trainingInfo.exercises.findIndex( (exercise:IExercise) => ( exercise.path === urlParams.id!!.toString() ) )].desc}</h1>
        <span className="fw-bold fs-5">Курс от {trainingInfo.trainer.name}</span>
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