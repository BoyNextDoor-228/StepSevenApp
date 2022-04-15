import React from "react";
import { IUser } from "../../types/user";

interface I_MyClientCard_Props 
{
    clientInfo: IUser;
}

const MyClientCard: React.FC<I_MyClientCard_Props> = (props: I_MyClientCard_Props) => {
    var picPath: string = ''

    if (props.clientInfo.pic === "")
    {
        picPath = "https://images.theconversation.com/files/443350/original/file-20220131-15-1ndq1m6.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C3354%2C2464&q=45&auto=format&w=926&fit=clip"
    }
    else 
    {
        picPath = require(`../../images/clients/client${props.clientInfo.pic}.jpg`)
    }

    
    return (
        <div className=" d-flex align-items-end px-0" style={{ height: "35vh", width: "25%", margin: "20px", borderRadius: "10px", backgroundImage: `url(${picPath})`, backgroundSize: "cover" }}>
            <div className="w-100 p-2 d-flex align-items-center justify-content-center" style={{ borderRadius: "10px", height: "30%", backgroundColor: "#F5EFED" }}>
                <span className="fw-bold">{props.clientInfo.firstname} {props.clientInfo.lastname}</span>
            </div>
        </div>
    )
}

export default MyClientCard;