export enum KindsOfSport
{
    YOGA = "Йога",
    SWIMMING = "Плавание",
    STRETCHING = "Растяжка",
    ABS = "Пресс"
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
}

export interface ITraining {
    id           : number;
    kindOfSport  : KindsOfSport;
    isWithTrainer: boolean;
    title        : string;
    short_desc   : string;
    description  : string;
    picture      : string;
    trainer      : number; 
    exercises    : IExercise[];
    duration     : number;
    users        : number[];
    link         : string;
    nextTrainingTime : string;

}

export interface IExercise 
{
    id       : number;
    pic      : string;
    desc     : string;
    path     : string;
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
    payload: ITraining[]
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

export type MainSystemAction = IFetchTrainingSuccess | IFetchTraining | IUserJoinsTraining