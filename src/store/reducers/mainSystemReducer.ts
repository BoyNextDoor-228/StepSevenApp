import { IMainSystemState, MainSystemAction } from "../../types/mainSystem";

const initialState: IMainSystemState = {
    trainings: [],
    trainers: [],
    sysLoading: false,
    users: []
}

export const mainSystemReducer = (state: IMainSystemState = initialState, action: MainSystemAction): IMainSystemState => 
{
    switch (action.type)
    {
        case "FETCH_MAIN_DATA":
            return { ...state, sysLoading: true, trainers: [], trainings: [] }

        case "FETCH_MAIN_DATA_SUCCESS":
            return { ...state, trainers: [], trainings: action.payload.t_data, users: action.payload.u_data, sysLoading: false }

        case "USER_JOINS_TRAINING":
            var foundIndex = state.trainings.findIndex( training => training.id === action.payload.trainingId)
            var tempTrainingsArr = [...state.trainings]
            tempTrainingsArr[foundIndex].users.push(action.payload.userId)
            return { ...state, trainings: tempTrainingsArr }
        
        case "ADD_NEW_TRAINING_TIME":
            var foundIndex = state.trainings.findIndex( training => training.id === action.payload.c_id )
            var tempTrainingsArr = [...state.trainings]
            tempTrainingsArr[foundIndex].nextTrainingTime.push(action.payload.c_time)
            tempTrainingsArr[foundIndex].link = action.payload.c_link
            return { ...state, trainings: tempTrainingsArr  }
        default: return state
    } 
}