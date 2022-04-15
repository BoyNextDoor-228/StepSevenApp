import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Context from "../../context";
import { logout } from "../../store/actions/userActions";


const Sidebar = () => { 
    const dispatch = useDispatch()
    const { user } = useContext(Context)
    const LinkStyles = "text-decoration-none d-flex my-4"
    const imgStyles = { width: "10%", height: "10%" }

    const [activeTab, setActiveTab] = useState({homeLink: false, mycoursesLink: false, myclientsLink: false, trnngsLink: false, fourthLink: false})
                                                
    const activateLink = (linkTab: number) => {
        switch (linkTab)
        {
            case 1:
                setActiveTab({homeLink: true, mycoursesLink: false, myclientsLink: false, trnngsLink: false, fourthLink: false});
                break;
            case 2: 
                setActiveTab({homeLink: false, mycoursesLink: true, myclientsLink: false, trnngsLink: false, fourthLink: false});
                break;
            case 3: 
                setActiveTab({homeLink: false, mycoursesLink: false, myclientsLink: true, trnngsLink: false, fourthLink: false});
                break;
            case 4:
                setActiveTab({homeLink: false, mycoursesLink: false, myclientsLink: false, trnngsLink: true, fourthLink: false});
                break;
            case 5:
                setActiveTab({homeLink: false, mycoursesLink: false, myclientsLink: false, trnngsLink: false, fourthLink: true});
                break;
            default:
                setActiveTab({homeLink: true, mycoursesLink: false, myclientsLink: false, trnngsLink: false, fourthLink: false})
        }
    }

    return (<div style={{height: "100%", backgroundColor: "#2A314B"  }}> 
                <div className="d-block  h-25 img-wrap">
                    <img className=" d-block p-3" style={{maxWidth: "100%", maxHeight: "100%"}} src={require('../../images/icons/logo.png')}/>
                </div>
                <div className="d-block  h-50 text-center pt-4">
                    <Link to={{ pathname: "/home" }} 
                          className="text-decoration-none d-flex m-4 bg-light py-3 rounded-3 fw-bold"
                          style={{color: "#2A314B"}}
                          onClick={() => { activateLink(1) }}><img className="ps-4  h-25 w-25" src={require('../../images/icons/home.png')} style={imgStyles}/><span className="ps-3" style={{fontSize: "14px"}}>Главная</span></Link>
                    <Link to={{ pathname: "/mycourses" }} 
                          className={LinkStyles}
                          style={ activeTab.mycoursesLink ? {color: "#F0F6FF"} : {color: "#767C94"} }
                          onClick={() => { activateLink(2) }}><img className="ms-5" src={require(`../../images/icons/${activeTab.mycoursesLink ? "courses-selected" : "courses"}.png`)} style={imgStyles}/><span className="ps-3" style={{fontSize: "14px"}}>Мои курсы</span></Link>
                    { user.exp > 1 ? <Link to={{ pathname: "/myclients" }} 
                          className={LinkStyles}
                          style={{ color: activeTab.myclientsLink ? "#F0F6FF" : "#767C94"}}
                          onClick={() => { activateLink(3) }}><img className="ms-5" src={require(`../../images/icons/${activeTab.myclientsLink ? "clients-selected" : "clients"}.png`)} style={imgStyles}/><span className="ps-3" style={{fontSize: "14px"}}>Мои клиенты</span></Link> : null }
                    <Link to={{ pathname: "/mytrainings" }} 
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