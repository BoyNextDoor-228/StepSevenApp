import React, { useContext, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Context from '../../context';
import { ITraining } from '../../types/mainSystem';
import { IUser } from '../../types/user';
import MyClientCard from '../Cards/MyClientCard';
import Modal from '../ModalWindows/Modal';
import Loader from '../Others/Loader';

const MyClients = () => {
    var { trainings, sysLoading, loading, user, users } = useContext(Context)
    var myClientsIds: number[] = []
    const myClientsArr: IUser[] = []
    const myTrainings: ITraining[] = []
    const [isModal, setModal] = useState(false)
    const onClose = () => setModal(false)
    
    trainings.forEach( (training:ITraining) => { if((training.trainer.t_id === user.id) && training.isWithTrainer ) { myTrainings.push(training) } })
    trainings.forEach( (training:ITraining) => { if(training.trainer.t_id === user.id) { myClientsIds = myClientsIds.concat(training.users) } } )
    myClientsIds = Array.from(new Set(myClientsIds));
    myClientsIds.forEach( (num: number) => { users.forEach( (l_user:IUser) => { if ( l_user.id === num ) { myClientsArr.push(l_user) } } ) } )

    while (sysLoading || loading ) return (<Loader/>)
    return (
        <div className="m-0 w-100 row" style={{height: "100%"}}>
            <div style={{height: "15%", paddingLeft: "5%"}}>
                <h2 className="fw-bold">Мои клиенты</h2>
                <p style={{fontSize: "12px"}}>Здесь представлены клиенты, записанные на ваши курсы</p>
            </div>
            <div className="col-9 pt-3" style={{overflow: "hidden", height: "85%", overflowY: "scroll", paddingLeft: "5%" }}>
                <Container className="w-100 p-0">
                    <Row xs={4} className="g-4">
                        { myClientsArr.map( (client:IUser) => { return ( <MyClientCard key={client.id} clientInfo={client} /> ) } ) }
                    </Row>
                </Container>
            </div>
            <div className="col-3 pt-2 ">
                <div className="w-100 d-flex align-items-center justify-content-center"
                    onClick={() => setModal(true) }
                     style={{borderRadius: "15px", backgroundColor: "#E1E5EE", height: "15%" }} >
                    <span className="p-0 fw-bold">Назначить новую тренировку</span>  
                </div>
            </div>
            <Modal visible={isModal} myTrainingsArr={myTrainings} onClose={onClose}/>
        </div>
    )
}

export default MyClients;