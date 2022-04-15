import { UserState, UserActionTypes, UserAction } from "../../types/user"


const initialState: UserState = {
    user: { id: -1,  
            firstname: '', 
            lastname: '', 
            email: '', 
            age: -1,
            sports: [], 
            //trainers: [], 
            clients: [],
            gender: "",
            kindOfSport: "",
            exp: -1,
            pic: "",
            achievements: ""
        }, 
    isLoggedIn: false,
    loading: false,
    error: null
}

export const userReducer = (state = initialState, action: UserAction): UserState => 
{
    switch (action.type)
    {
        // case UserActionTypes.FETCH_USER: 
        //     return { loading: true, error: null, user: state.user }

    // =======================================================================================            

        case UserActionTypes.FETCH_USER_SUCCESS: 
            return { loading: false, isLoggedIn: true ,error: "EVERYTHING_IS_OK", user: { id: action.payload.id, 
                                                   firstname: action.payload.firstname, 
                                                    lastname: action.payload.lastname, 
                                                       email: action.payload.email, 
                                                         age: action.payload.age, 
                                                      sports: action.payload.sports, 
                                                    //trainers: action.payload.trainers,
                                                     clients: action.payload.clients,
                                                     gender: action.payload.gender,
                                                     kindOfSport: action.payload.kindOfSport,
                                                     exp: action.payload.exp,
                                                     pic: action.payload.pic,
                                                     achievements: action.payload.achievements } }

    // =======================================================================================        

        // case UserActionTypes.FETCH_USER_ERROR: 
        //     return { loading: false, error: action.payload, user: state.user }

    // =======================================================================================  
    
        case UserActionTypes.CREATE_USER: 
            return { loading: false, error: null, isLoggedIn: true, user: action.payload }

    // ======================================================================================= 

        case UserActionTypes.USER_SUBSCRIBES_A_NEW_TRAINING: 
            //const addTrainingUpdatedState = { ...state, user: { ...state.user, sports: [...state.user.sports, action.payload] } }
            const addTrainingUpdatedState = { ...state, user: { ...state.user, sports: [...state.user.sports, action.payload] } }
            return { ...state, user: addTrainingUpdatedState.user }


    // ======================================================================================= 

        case UserActionTypes.USER_LOGS_OUT:
            return { ...state, 
                loading: false, 
                error: null, 
                isLoggedIn: false, 
                user: { 
                    id: -1,  
                    firstname: '', 
                    lastname: '', 
                    email: '', 
                    age: -1,
                    sports: [], 
                    // trainers: [], 
                    clients: [],
                    gender: "",
                    kindOfSport: "",
                    exp: -1,
                    achievements: ""
            }}

    // ======================================================================================= 
            
        default: 
            return state
    }
}