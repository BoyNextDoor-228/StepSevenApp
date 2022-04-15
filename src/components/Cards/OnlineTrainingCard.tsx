import React from 'react'
import { ITraining } from '../../types/mainSystem';

interface I_MyOnlineTrainingCard_Props 
{
    training: ITraining;
    isPassed: boolean;
}

const OnlineTrainingCard: React.FC<I_MyOnlineTrainingCard_Props> = (props: I_MyOnlineTrainingCard_Props) => {
    let d = new Date((Date.parse(props.training.nextTrainingTime[props.training.nextTrainingTime.length-1]) + 1000 *3600))

    return ( 
    <div className="row pe-0" style={{ height: "20vh", width: "45%", borderRadius: "15px", marginInlineEnd: "2%", backgroundColor: props.isPassed ? "#E1E5EE" : "#F5EFED", marginTop: "20px" }}>
        <div className="h-100 col-3 d-flex justify-content-center align-items-center">
            <img src={require('../../images/icons/jumpingrope.png')} />
        </div>
        <div className="h-100 col-6 pt-1">
            <h5>{props.training.title}</h5>
            <span className="fw-bold d-block">{props.training.nextTrainingTime[props.training.nextTrainingTime.length-1]} - { d.toLocaleString() }</span>
            <a href={props.training.link} target="_blank" style={{ display: props.isPassed ? "none" : "block", color: "black", textDecoration: "none", fontSize: "12px" }}>Перейти к занятию...</a>
        </div>
        <div className="h-100 col-3 d-flex flex-wrap align-content-between py-2 ps-1 pe-0" style={{ borderRadius: " 0px 15px 15px 0px " }}>
            <p style={{ fontSize: "10px", backgroundColor: "#BFA99E", borderRadius: "5px", padding: "5px", paddingBottom: "5px" }}>{props.training.trainer.name}</p>
            <p style={{ fontSize: "12px", paddingLeft: "20%" }}>{props.training.trainingsAmount} занятий/е</p>
        </div>
    </div> )
}

export default OnlineTrainingCard;