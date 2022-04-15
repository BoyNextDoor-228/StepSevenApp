import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Context from '../context';
import { ITraining } from '../types/mainSystem';
import OnlineTrainingCard from './Cards/OnlineTrainingCard';
import Loader from './Others/Loader';

const MyOnlineTrainingsList = () => {
    var { trainings, sysLoading, loading,user } = useContext(Context)
    const inProgressOnlineTrainings: ITraining[] = []
    const passedOnlineTrainings: ITraining[] = [] 

    const init = (): ITraining[] => {
        trainings.forEach((training: ITraining) => { 
            user.sports.forEach((sport: { s_id: number, counter: number }) => { 
                if ((training.id === sport.s_id) && (Date.parse(training.nextTrainingTime[training.nextTrainingTime.length - 1]) > Date.now()) && ( training.isWithTrainer )) { inProgressOnlineTrainings.push(training) }
             })
         })
         return inProgressOnlineTrainings
    }

    const initPassedTrainings = (): ITraining[] => {
        trainings.forEach((training: ITraining) => { 
            user.sports.forEach((sport: { s_id: number, counter: number }) => { 
                if ((training.id === sport.s_id) && (Date.parse(training.nextTrainingTime[training.nextTrainingTime.length - 1]) < Date.now() ) && ( training.isWithTrainer ) ) { passedOnlineTrainings.push(training) }
             })
         })
         return passedOnlineTrainings
    }


    while (sysLoading || loading ) return (<Loader/>)
    init()
    initPassedTrainings()

    return (
        <div className="m-0 w-100" style={{height: "100%"}}>
            <div style={{height: "15%", paddingLeft: "5%"}}>
                <h2 className="fw-bold">Мои тренировки</h2>
                <p style={{fontSize: "12px"}}>Здесь представлены тренировки, которые были назначены вам в рамках курсов</p>
            </div>
            <div className="pt-2" style={{overflow: "hidden", overflowY: "scroll", height: "85%", paddingLeft: "5%" }}>
                    <h4 className="fw-bold" style={{height: "5%", marginBottom: "20px"}} >Назначенные</h4>
                    <Container style={{ height: "30%", paddingTop: "2%" }}>
                        <Row xs={3} className="g-4">
                            {inProgressOnlineTrainings?.map((training:ITraining) => { return < OnlineTrainingCard key={training.id} training={training} isPassed={false}/> })}
                        </Row>
                    </Container>
                        
                    <h4 className="fw-bold" style={{height: "5%" , marginBottom: "20px"}} >Проведённые</h4>
                    <Container style={{ height: "30%", paddingTop: "2%" }}>
                        <Row xs={3} className="g-4">
                        {passedOnlineTrainings?.map( (training:ITraining) => { return training.nextTrainingTime.map( (time: string, index: number) => { return < OnlineTrainingCard key={`${time}${training.id + index}`} training={training} isPassed={true}/> } ) } )}    
                        </Row>
                    </Container>
                        
                    </div>
            
            
        </div>
    )
}

export default MyOnlineTrainingsList;