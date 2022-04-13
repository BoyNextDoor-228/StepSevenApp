import axios from "axios";
import { Dispatch } from "react";
import { MainSystemAction } from "../../types/mainSystem";

export const fetchData = () => {
    return async (dispatch: Dispatch<MainSystemAction>) => {
        dispatch({ type: "FETCH_MAIN_DATA" })
        const responseTrainings = await axios.get("http://localhost:4200/trainings")
        dispatch({ type: "FETCH_MAIN_DATA_SUCCESS", payload: responseTrainings.data })
    }
}

export const getTrainerNameByID = (a_trainerID: number) => {
    var aboba: any 
    fetch(`http://localhost:4200/users/${a_trainerID}`).then((response) => response.json()).then((user) => { aboba = user })
    return aboba
}