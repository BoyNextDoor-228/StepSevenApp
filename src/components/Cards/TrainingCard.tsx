import React from "react";
import { Link } from "react-router-dom";
import { ITraining } from "../../types/mainSystem";
//import pic from '../../images/coursePics/course1_1.jpg' card-image

interface I_TrainingCard_Props 
{
    training: ITraining;
    text: string;
    leadsTo: string;
}

const TrainingCard: React.FC<I_TrainingCard_Props> = (props: I_TrainingCard_Props) => {
    return (
        <div className="m-2" style={{width: "16rem", borderRadius: "20px", height: "22rem", backgroundColor: "#F5EDEF"}}>
            <img src={require(`../../images/coursePics/course${props.training.picture}.jpg`)} 
                 className=" p-2 mt-2"
                 style={{borderRadius: "30px", objectFit: "cover" , maxHeight: "150px", minWidth: "250px"}} 
                 alt={props.training.title + " picture"}/>
            <div className="card-body h-50">
                <div className="h-75">
                    <h6 className="card-title">{props.training.title}</h6>
                    <p className="card-text" style={{ fontSize: "10px" }}>{props.training.short_desc}</p>
                </div>
                <div className="d-flex justify-content-end align-self-end">
                    <Link to={{ pathname: `/${props.leadsTo}/${props.training.id}` }}
                        className="btn  w-50 text-white"
                        style={{backgroundColor: "#8A786C", borderRadius: "30px", fontSize: "14px"}}>{props.text}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TrainingCard;