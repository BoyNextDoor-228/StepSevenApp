import axios from "axios"
import { Dispatch } from "redux"
import { UserActionTypes, UserAction, IUser } from "../../types/user"
import { ITrainer, ITraining, MainSystemAction } from "../../types/mainSystem"

export const getUserByEmail = (a_email: string, a_password: string): any => {
    return async(dispatch: Dispatch<UserAction>) => {
        const response = await axios.get("http://localhost:4200/users", {
            params: { email: a_email }
        })
        if (response.data[0] == undefined) { dispatch({ type: UserActionTypes.FETCH_USER_ERROR, payload: "NO_SUCH_USER" }) ; return "NO_SUCH_USER" }
        if (response.data[0]?.pwd === a_password) 
        {           
            dispatch({ type: UserActionTypes.FETCH_USER_SUCCESS, payload: response.data[0] }) ; return "EVERYTHING_IS_OK"
        }
        else dispatch({ type: UserActionTypes.FETCH_USER_ERROR, payload: "WRONG_PWD" }) ; return "WRONG_PWD"
    }
}

export const userSubsribedNewTraining = (a_userId: number, a_trainingId: number): any => {
    return async(dispatch: Dispatch<UserAction | MainSystemAction>) => {

        const responseUser = await axios.get(`http://localhost:4200/users/${a_userId}`)
        responseUser.data.sports.push(a_trainingId)
        axios.patch(`http://localhost:4200/users/${a_userId}`, {sports: responseUser.data.sports})
        const responseTraining = await axios.get(`http://localhost:4200/trainings/${a_trainingId}`)
        responseTraining.data.users.push(a_userId)
        axios.patch(`http://localhost:4200/trainings/${a_trainingId}`, {users: responseTraining.data.users})
        dispatch({ type: UserActionTypes.USER_SUBSCRIBES_A_NEW_TRAINING, payload: a_trainingId })
        dispatch({ type: "USER_JOINS_TRAINING", payload: { trainingId: a_trainingId, userId: a_userId } })
    }
}

export const updateUser = (a_email: string): any => {
    return async(dispatch: Dispatch<UserAction>) => {
        const response = await axios.get("http://localhost:4200/users", {
            params: { email: a_email }
        })
        dispatch({type: UserActionTypes.FETCH_USER_SUCCESS, payload: response.data[0] })
    }
}

export const createNewUser = (a_firtsname: string, a_lastname: string, a_login: string, a_age: number, a_password: string, a_gender: string, a_kindOfSport: string, a_exp: number, a_achievements: string): any => {
    
    return async( dispatch: Dispatch<UserAction>) => {
        const response = await axios.get("http://localhost:4200/users", {
            params: { email: a_login }
        })
        const userInfo = await response.data
        if (userInfo.length) { return "USER_EXISTS" }
        else 
        { 
            const id: number        = new Date().getTime();
            const firstname: string = a_firtsname;
            const lastname: string  = a_lastname;
            const email: string     = a_login;
            const age: number       = a_age;
            const sports: number[]  = [];
            //const trainers: ITrainer[] = []; // should be array of ITrainer or null
            const clients: any[]    = []; 
            const gender: string    = a_gender;

            const kindOfSport: string = a_achievements === "" ? "" : a_kindOfSport ;
            const exp: number = a_achievements === "" ? -1 : a_exp ;
            const achievements: string = a_achievements; 
            
            axios.post("http://localhost:4200/users", { id, firstname, lastname, email, pwd: a_password, age, sports, clients, gender, kindOfSport, exp, achievements })
            dispatch({ type: UserActionTypes.CREATE_USER, payload: { id, firstname, lastname, email, age, sports, clients, gender, kindOfSport, exp, achievements } })
            return "EVERYTHING_IS_OK"
        }        
    }
}

export const logout = () => {
    return { type: UserActionTypes.USER_LOGS_OUT }
}