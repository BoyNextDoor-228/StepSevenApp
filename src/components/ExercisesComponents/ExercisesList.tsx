import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Context from '../../context'
import { ITraining, IExercise } from '../../types/mainSystem'
import ExerciseCard from '../Cards/ExerciseCard'

const ExerciseList = () => {
    const { stateIsLoggedIn, setisloggedin, trainings, user, loading, sysLoading } = useContext(Context)
    const navigate = useNavigate()
    const urlParams = useParams()
    const trnng: ITraining = trainings.find( (training:ITraining) => { if(training.id.toString() === urlParams.id) return true } )
    const isUserSubscribedThisTraining: boolean = user.sports.find( (sport: { s_id: number, counter: number } ) => { if(sport.s_id.toString() === urlParams.id) return true  } )

    const checkIfValid = () => { if (stateIsLoggedIn === false) setisloggedin(false)  }
    useEffect(() => { checkIfValid(); navigate(`/exerciselist/${urlParams.id}`);  }, [user])

    while (loading || sysLoading) return (<h1>Loading...</h1>)

    if(trnng && isUserSubscribedThisTraining)
    {
        return (
            <div className="w-100 m-0 p-0" style={{height: "100%"}}>
                <h2 style={{ height: "10%", paddingLeft: "5%" , fontWeight: "bold"}}> <span onClick={() => { navigate("/mycourses") } }>&lt;</span> {trnng.title}</h2>
                <div className="w-100" style={{ height: "85%", paddingLeft: "5%", fontWeight: "bold", overflow: "hidden", overflowY: "scroll" }}>
                    <p>Курс от {trnng.trainer.name}</p>
                    <Container style={{ }}>
                        <Row xs={4} className="g-4">
                            {trnng.exercises.map((exercise:IExercise) => {return <Col key={exercise.id}><ExerciseCard key={exercise.id} exerciseInfo={exercise} seqNumber={trnng.exercises.indexOf(exercise)} trainingType={trnng.kindOfSport} trainingId={trnng.id} redirectable={true}/> </Col>})}
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
    else return (
        <div className="mt-5 text-center">
            <h1>Вам недоступна эта тренировка или вы перешли на несуществующую страницу.</h1>
            <NavLink to="/" className="fs-3 text-decoration-none">Перейти на главную страницу</NavLink>
        </div>
        )
}

export default ExerciseList;