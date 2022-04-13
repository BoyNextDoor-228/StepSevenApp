import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IExercise } from '../../types/mainSystem';

interface I_ExerciseCard_Props 
{
    exerciseInfo: IExercise;
    seqNumber: number;
    trainingType: string;
    redirectable: boolean;
}

const ExerciseCard: React.FC<I_ExerciseCard_Props> = (props:I_ExerciseCard_Props) => {
    const navigate = useNavigate()
    const picPath = require(`../../images/anims/${props.trainingType}/pics/${props.exerciseInfo.pic}.png`)

    return (
        <div style={{ height: "25vh", width: "85%" }}
             onClick={() => { if(props.redirectable) navigate(`/exercise/${props.exerciseInfo.path}`)  } }>
            <div className="d-flex h-75 w-100 p-2" style={{ borderRadius: "10px", backgroundImage: `url(${picPath})`, backgroundSize: "cover" }}>
                <div className="bg-white ps-1" 
                     style={{ height: "25%", width: "45%", borderRadius: "10px" }}>
                         <img src={require('../../images/icons/video.png')}/>
                         <span style={{ fontSize: "12px", fontWeight: "bold", marginLeft: "3px" }}>
                             {props.exerciseInfo.duration} мин.
                         </span>
                </div>
            </div>

            <div className="h-25 w-100 pt-1 ">
                <h5 className="text-secondary d-inline">{props.seqNumber + 1}.</h5>
                <h5 className="d-inline">{props.exerciseInfo.desc}</h5>
            </div>
        </div>
    )
}

export default ExerciseCard;