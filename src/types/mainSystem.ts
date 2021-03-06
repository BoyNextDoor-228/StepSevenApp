import { IUser } from "./user";

export enum KindsOfSport
{
    YOGA = "Йога",
    AEROBICS = "Аэробика",
    STRETCHING = "Растяжка",
    PILATES = "Пилатес",
    CARDIO = "Кардио"
}

export enum Gender
{
    MALE = "Мужской",
    FEMALE = "Женский"
}

export interface IMainSystemState 
{
    trainings: ITraining[];
    trainers : ITrainer[] | null;
    sysLoading: boolean;
    users: IUser[];
}

export interface ITraining {
    id           : number;
    kindOfSport  : KindsOfSport;
    isWithTrainer: boolean;
    title        : string;
    short_desc   : string;
    description  : string;
    trainingsAmount: number;
    picture      : string;
    trainer      : { t_id: number, name: string }; 
    exercises    : IExercise[];
    load         : string;
    users        : number[];
    link         : string;
    nextTrainingTime : string[];

}

export interface IExercise 
{
    id       : number;
    pic      : string;
    desc     : string;
    path     : string;
    duration : number;
}

export interface ITrainer
{
    id          : number;
    firstname   : string;
    lastname    : string;
    pwd?        : string;
    gender      : Gender;
    age         : number;
    kindOfSport : KindsOfSport;
    exp         : number;
    achievements: string;
}

interface IFetchTrainingSuccess 
{
    type: "FETCH_MAIN_DATA_SUCCESS";
    payload: { u_data: IUser[], t_data: ITraining[]} 
}

interface IFetchTraining 
{
    type: "FETCH_MAIN_DATA";
}

interface IUserJoinsTraining
{
    type: "USER_JOINS_TRAINING";
    payload: { trainingId: number, userId: number };
}

interface IAddNewTrainingTime 
{
    type: "ADD_NEW_TRAINING_TIME";
    payload: { c_id: number, c_time: string, c_link: string };
}

export type MainSystemAction = IFetchTrainingSuccess | IFetchTraining | IUserJoinsTraining | IAddNewTrainingTime