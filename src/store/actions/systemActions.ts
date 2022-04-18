import axios from "axios";
import { Dispatch } from "react";
import { MainSystemAction } from "../../types/mainSystem";


export const fetchData = () => {
    return async (dispatch: Dispatch<MainSystemAction>) => {
        dispatch({ type: "FETCH_MAIN_DATA" })
        const responseTrainings = await axios.get("http://localhost:4200/trainings")
        const responseUsers = await axios.get("http://localhost:4200/users")
        dispatch({ type: "FETCH_MAIN_DATA_SUCCESS", payload: { u_data: responseUsers.data, t_data: responseTrainings.data }  })
    }
}

export const getTrainerNameByID = (a_trainerID: number) => {
    var aboba: any 
    fetch(`http://localhost:4200/users/${a_trainerID}`).then((response) => response.json()).then((user) => { aboba = user })
    return aboba
}

export const addNewTrainingTime = (a_trainingId: number, a_time:string, a_link: string ) => {
    return async (dispatch: Dispatch<MainSystemAction>) => {
        const responseTrainings = await axios.get(`http://localhost:4200/trainings/${a_trainingId}`)
        responseTrainings.data.nextTrainingTime.push(a_time)
        axios.patch(`http://localhost:4200/trainings/${a_trainingId}`, {nextTrainingTime: responseTrainings.data.nextTrainingTime, link: a_link })
        dispatch( {type: "ADD_NEW_TRAINING_TIME", payload: { c_id: a_trainingId, c_time: a_time, c_link: a_link }} )
    }
}