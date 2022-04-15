import React from 'react'
import { useNavigate } from 'react-router-dom';

import { ITraining } from '../../types/mainSystem';

interface I_MyCourseCard_Props 
{
    training: ITraining;
    arePassed: boolean;
}

const MyCourseCard: React.FC<I_MyCourseCard_Props> = (props: I_MyCourseCard_Props) => {
    const navigate = useNavigate()
    const picPath = require(`../../images/coursePics/course${props.training.picture}.jpg`)

      return (
    <div className="row mb-4" 
         style={{width: "90%", height: "30%", borderRadius: "15px", backgroundColor: props.arePassed ? "#E1E5EE" : "#F5EFED"}}
         onClick={() => { if(!props.training.isWithTrainer) navigate(`/exerciselist/${props.training.id}`) } }>
        <div className="col-7 pt-1 ps-4 d-flex flex-wrap align-content-around">
            <div className="">
                <h4>{props.training.title}</h4>
                <p style={{ fontSize: "10px" }}>{props.training.short_desc}</p>
            </div>
            <div className="d-flex justify-content-between flex-row w-100 align-items-end">
                <div style={{ fontSize: "12px", fontWeight: "bold" }}><img src={require('../../images/icons/video.png')} style={{ marginRight: "5px" }} />{props.training.trainingsAmount} занятий</div>
                <div className="px-3 py-1 fw-bold" style={{ backgroundColor: "#BFA99E", borderRadius: "5px", fontSize: "12px" }}>{props.training.trainer.name}</div>
            </div>
        </div>
        
        <div className="col-5" style={{ backgroundImage: `url(${picPath})`, backgroundSize: "cover", borderRadius: " 0px 15px 15px 0px" }}>
        </div>
    </div>
    )
}

export default MyCourseCard;