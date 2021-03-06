import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Container, Row } from 'react-bootstrap'
import TrainingCard from "./Cards/TrainingCard";
import Context from "../context";
import { ITraining } from "../types/mainSystem";
import Loader from "./Others/Loader";

const TrainingList: React.FC = () => {
    var { trainings, sysLoading } = useContext(Context)
    const immutableTrainings: ITraining[] = trainings
    const [stateTrainings, setStateTrainings] = useState(trainings)
    const [filter, setFilter] = useState({isWithTrainer: true, trainingType: "ALL", isInit: true})


    const filterTrainingsList = () => {
        if (filter.isInit)
        {
            setStateTrainings(immutableTrainings)
            return
        }
        if (filter.isWithTrainer === true)
        {
            trainings = immutableTrainings.filter( (training:ITraining) => ( (training.kindOfSport === filter.trainingType) && (training.isWithTrainer === true) ) )
            setStateTrainings(trainings)
        }
        else if (filter.isWithTrainer === false) 
        {
            trainings = immutableTrainings.filter( (training:ITraining) => ( (training.kindOfSport === filter.trainingType) && (training.isWithTrainer === false) ) )
            setStateTrainings(trainings)
        }
        if (filter.trainingType === "ALL")
        {
            trainings = immutableTrainings.filter( (training:ITraining) => ( training.isWithTrainer === filter.isWithTrainer ) )
            setStateTrainings(trainings)
        }
    }

    useEffect(() => { filterTrainingsList() }, [filter])

    if (sysLoading) return (<Loader/>)

    return(
        <div className="m-0 row" style={{height: "100%"}}>
            <div style={{height: "10%", paddingLeft: "5%"}}>
                { filter.isWithTrainer ? <h2 className="fw-bold">Курсы с тренером</h2> : <h2 className="fw-bold">Курсы без тренера</h2> }
                <p style={{fontSize: "12px"}}>Здесь вы можете найти интересующие вас курсы</p>
            </div>
            <div className="col-9 pt-1" style={{overflow: "hidden", height: "90%", overflowY: "scroll" }}>
                <Container>
                    <Row xs={3} className="g-4">
                        {stateTrainings.map((training:ITraining) => {return <Col key={training.id}><TrainingCard training={training} text={"Подробнее"} leadsTo={"training"}/> </Col>})}
                    </Row>
                </Container>
            </div>
            <div className="col-3 pt-2">
                <div className="w-100"
                     style={{borderRadius: "15px", backgroundColor: "#E1E5EE", height: "22%" }} >
                        <h5 className="p-3 fw-bold">Вид курса</h5>
                        <div className="h-50 d-flex justify-content-around">
                            <div className="d-inline h-50 px-3 py-1"
                                style={{borderRadius: "15px", fontSize: "12px", backgroundColor: filter.isWithTrainer ? "#FFF" : "#767B91", color: filter.isWithTrainer ? "#767B91" : "#FFF" }}
                                onClick={ () => setFilter({...filter, isWithTrainer: true, isInit: false}) }>
                                С тренером
                            </div>
                            <div className="d-inline h-50 px-3 pt-1"
                                style={{borderRadius: "15px", fontSize: "12px", backgroundColor: filter.isWithTrainer ? "#767B91" : "#FFF", color: filter.isWithTrainer ? "#FFF" : "#767B91" }}
                                onClick={ () => setFilter({...filter, isWithTrainer: false, isInit: false}) }> 
                                Без тренера
                            </div>
                        </div>
                </div>
                <div className="w-100 mt-3"
                     style={{borderRadius: "15px", backgroundColor: "#E1E5EE", height: "34%" }} >
                        <h5 className="ps-3 d-inline fw-bold">Направление</h5>
                        <span className="d-inline ps-3 fw-bold"
                              style={{ fontSize: "12px", color: "#767B91" }}
                              onClick={ () => { setFilter({...filter, trainingType: "ALL", isInit: true}) } }> 
                                        Сбросить
                                </span>
                        <div className="h-50 pt-4">
                            <div className="d-block h-25 mt-2 ps-2">
                                <div className="d-inline px-3 py-2 ms-2"
                                    style={{borderRadius: "15px", backgroundColor: filter.trainingType === "Йога" ? "#FFF" : "#767B91", fontSize: "12px", color: filter.trainingType === "Йога" ? "#767B91" : "#FFF" }}
                                    onClick={ () => setFilter({...filter, trainingType: "Йога", isInit: false}) }>
                                    Йога
                                </div>
                                <div className="d-inline px-3 py-2 ms-2"
                                    style={{borderRadius: "15px", backgroundColor: filter.trainingType === "Пилатес" ? "#FFF" : "#767B91", fontSize: "12px", color: filter.trainingType === "Пилатес" ? "#767B91" : "#FFF" }}
                                    onClick={ () => setFilter({...filter, trainingType: "Пилатес", isInit: false}) }> 
                                    Пилатес
                                </div>
                            </div>
                            <div className="d-block h-25 mt-4 ps-2">
                                <div className="d-inline px-3 py-2 ms-2"
                                        style={{borderRadius: "15px", backgroundColor: filter.trainingType === "Кардио" ? "#FFF" : "#767B91", fontSize: "12px", color: filter.trainingType === "Кардио" ? "#767B91" : "#FFF" }}
                                        onClick={ () => setFilter({...filter, trainingType: "Кардио", isInit: false}) }>
                                        Кардио
                                </div>
                                <div className="d-inline px-3 py-2 ms-2"
                                        style={{borderRadius: "15px", backgroundColor: filter.trainingType === "Стретчинг" ? "#FFF" : "#767B91", fontSize: "12px", color: filter.trainingType === "Стретчинг" ? "#767B91" : "#FFF" }}
                                        onClick={ () => setFilter({...filter, trainingType: "Стретчинг", isInit: false}) }> 
                                        Стретчинг
                                </div>
                            </div>
                            <div className="d-block h-25 mt-4 ps-2">
                                <div className="d-inline px-3 py-2 ms-2"
                                            style={{borderRadius: "15px", backgroundColor: filter.trainingType === "Аэробика" ? "#FFF" : "#767B91", fontSize: "12px", color: filter.trainingType === "Аэробика" ? "#767B91" : "#FFF" }}
                                            onClick={ () => setFilter({...filter, trainingType: "Аэробика", isInit: false}) }> 
                                            Аэробика
                                </div>

                            </div>
                        </div>
                </div>
            </div>
            
        </div>
    )
}

export default TrainingList;