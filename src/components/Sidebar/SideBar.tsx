import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { logout } from "../../store/actions/userActions";


const Sidebar = () => { 
    const dispatch = useDispatch()
    const LinkStyles = "text-decoration-none d-flex my-4"
    const imgStyles = { width: "10%", height: "10%" }

    const [activeTab, setActiveTab] = useState({homeLink: false, secondLink: false, thirdLink: false, trnngsLink: false, fourthLink: false})
                                                
    const activateLink = (linkTab: number) => {
        switch (linkTab)
        {
            case 1:
                setActiveTab({homeLink: true, secondLink: false, thirdLink: false, trnngsLink: false, fourthLink: false});
                break;
            case 2: 
                setActiveTab({homeLink: false, secondLink: true, thirdLink: false, trnngsLink: false, fourthLink: false});
                break;
            case 3: 
                setActiveTab({homeLink: false, secondLink: false, thirdLink: true, trnngsLink: false, fourthLink: false});
                break;
            case 4:
                setActiveTab({homeLink: false, secondLink: false, thirdLink: false, trnngsLink: true, fourthLink: false});
                break;
            case 5:
                setActiveTab({homeLink: false, secondLink: false, thirdLink: false, trnngsLink: false, fourthLink: true});
                break;
            default:
                setActiveTab({homeLink: true, secondLink: false, thirdLink: false, trnngsLink: false, fourthLink: false})
        }
    }

    return (<div className="" style={{height: "100%", backgroundColor: "#2A314B"  }}> 
                <div className="d-block  h-25 img-wrap">
                    <img className=" d-block p-3" style={{maxWidth: "100%", maxHeight: "100%"}} src={require('../../images/icons/logo.png')}/>
                </div>
                <div className="d-block  h-50 text-center pt-4">
                    <Link to={{ pathname: "/home" }} 
                          className="text-decoration-none d-flex m-4 bg-light py-3 rounded-3 fw-bold"
                          style={{color: "#2A314B"}}
                          onClick={() => { activateLink(1) }}><img className="ps-4  h-25 w-25" src={require('../../images/icons/home.png')} style={imgStyles}/><span className="ps-3" style={{fontSize: "14px"}}>Главная</span></Link>
                    <Link to={{ pathname: "/exercise" }} 
                          className={LinkStyles}
                          style={ activeTab.secondLink ? {color: "#F0F6FF"} : {color: "#767C94"} }
                          onClick={() => { activateLink(2) }}><img className="ms-5" src={require(`../../images/icons/${activeTab.secondLink ? "courses-selected" : "courses"}.png`)} style={imgStyles}/><span className="ps-3" style={{fontSize: "14px"}}>Мои курсы</span></Link>
                    <Link to={{ pathname: "/trags" }} 
                          className={LinkStyles}
                          style={ activeTab.thirdLink ? {color: "#F0F6FF"} : {color: "#767C94"} }
                          onClick={() => { activateLink(3) }}><img className="ms-5" src={require(`../../images/icons/${activeTab.thirdLink ? "clients-selected" : "clients"}.png`)} style={imgStyles}/><span className="ps-3" style={{fontSize: "14px"}}>Мои клиенты</span></Link>
                    <Link to={{ pathname: "/trainings" }} 
                          className={LinkStyles}
                          style={ activeTab.trnngsLink ? {color: "#F0F6FF"} : {color: "#767C94"} }
                          onClick={() => { activateLink(4) }}><img className="ms-5" src={require(`../../images/icons/${activeTab.trnngsLink ? "workout-selected" : "workout"}.png`)} style={imgStyles}/><span className="ps-3" style={{fontSize: "14px"}}>Тренировки</span></Link>
                    <Link to={{ pathname: "/oaa" }} 
                          className={LinkStyles}
                          style={ activeTab.fourthLink ? {color: "#F0F6FF"} : {color: "#767C94"} }
                          onClick={() => { activateLink(5) }}><img className="ms-5" src={require(`../../images/icons/${activeTab.fourthLink ? "settings-selected" : "settings"}.png`)} style={imgStyles}/><span className="ps-3" style={{fontSize: "14px"}}>Настройки</span></Link>
                </div>
                <div className="d-block h-25 pt-5 w-100 px-4">
                    <div>
                        <a href="https://vk.com/stepseven2022" target="_blank" className="text-decoration-none d-inline" style={{ paddingInlineStart: "40%" }}><img src={require('../../images/icons/vk.png')}/></a>
                    </div>
                    <hr className="bg-white "/>
                    <button className="btn btn-link p-0 text-decoration-none ps-3" style={{color: "#767C94"}} onClick={() => dispatch(logout())}><img className="ps-1" src={require('../../images/icons/exit.png')} /><span className="ps-3" style={{fontSize: "14px"}}>Выйти</span></button>
                </div>
            </div >)
}

export default Sidebar;