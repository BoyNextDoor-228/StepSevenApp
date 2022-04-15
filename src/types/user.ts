import { ITraining, ITrainer } from "./mainSystem";

export enum UserActionTypes {
    FETCH_USER = 'FETCH_USER',
    FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
    FETCH_USER_ERROR = 'FETCH_USER_ERROR',
    CREATE_USER = 'CREATE_USER',
    USER_SUBSCRIBES_A_NEW_TRAINING = 'USER_SUBSCRIBES_A_NEW_TRAINING',
    USER_PASSES_EXERCISE = 'USER_PASSES_EXERCISE',
    USER_LOGS_OUT = 'USER_LOGS_OUT'
}

export interface IUser {
    id: number;
    //usertype: boolean; // 1 if trainer and 0 if client 
    firstname: string;
    lastname : string;
    email    : string;
    pswrd?   : string;
    age      : number;
    sports   : { s_id: number, counter: number }[]; 
    //trainers?: ITrainer[] | null; 
    clients? : number[] | null; 
    gender       : string ;
    kindOfSport? : string;
    exp?         : number;
    achievements?: string;
    pic?: string;
}

export interface UserState {
    user      : IUser;
    isLoggedIn: boolean;
    loading   : boolean;
    error     : null | string; 
}

interface FetchUserAction {
    type: UserActionTypes.FETCH_USER
}

interface FetchUserSuccessAction {
    type: UserActionTypes.FETCH_USER_SUCCESS
    payload: IUser;
}

interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR
    payload: string;
}

interface CreateUserAction {
    type: UserActionTypes.CREATE_USER
    payload: IUser
}

interface UserSubscribesNewTraining {
        type: UserActionTypes.USER_SUBSCRIBES_A_NEW_TRAINING
        payload: { s_id: number, counter: number }
}

interface userPassesExercise {
        type: UserActionTypes.USER_PASSES_EXERCISE
        payload: number
}

interface UserLogsOut {
    type: UserActionTypes.USER_LOGS_OUT
}

export type UserAction = FetchUserAction | 
                  FetchUserSuccessAction | 
                    FetchUserErrorAction | 
                        CreateUserAction |
               UserSubscribesNewTraining |
               UserLogsOut               |
               userPassesExercise