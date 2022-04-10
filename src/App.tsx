import React, { useEffect, useState } from 'react';
import MainPage from './components/MainPage';
import TrainingFullInfo from './components/TrainingFullInfo';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage'; 
import TrainingList from './components/TrainingsList';
import MyTrainingInfo from './components/MyTrainingsInfo';
import { useTypedSelector } from '../src/hooks/useTypedSelector';
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchData } from "./store/actions/systemActions";
import Context from './context';
import Sidebar from './components/Sidebar/SideBar';
import ExerciseAnim from './components/ExerciseAnim';

function App() {

  const dispatch = useDispatch()
  const stateIsLoggedIn: boolean = useTypedSelector(state => state.user.isLoggedIn)
  const { user, loading } = useTypedSelector(state => state.user)

  const { trainings, sysLoading } = useTypedSelector(state => state.system)
  const [isLoggedIn, setisloggedin] = useState(stateIsLoggedIn)

  useEffect(() => { dispatch(fetchData()) }, [isLoggedIn, stateIsLoggedIn])

  while (loading || sysLoading) { return <h1>Loading...</h1> }

  if ( stateIsLoggedIn )
  {
    return (
      <Context.Provider value={{setisloggedin, trainings, user, sysLoading, loading, stateIsLoggedIn}}>         
        <BrowserRouter>
          <div className="row m-0" style={{ height: "100vh" }}>
            <div className="col-2 p-0 h-100">
              <Sidebar/>
            </div>         
            <div className="col-10 p-0 h-100">
              <div className="d-flex justify-content-end align-items-center pe-2" style={{ height: "10%" }}>
                <h4>{user.firstname} {user.lastname}</h4>
              </div>
              <div style={{ height: "90%" }}>
                <Routes>            
                    <Route path="/home" element={ <MainPage/> } />
                    <Route path="/training/:id" element={ <TrainingFullInfo/> } />
                    <Route path="/trainings" element={ <TrainingList/> } />
                    <Route path="/mytraininginfo/:id" element ={ <MyTrainingInfo/> }/>
                    <Route path="/exercise" element={ <ExerciseAnim/> }/>
                    <Route path="/*" element={ <MainPage/> } />
                  </Routes>
              </div>

              
            </div>       
        </div>
        </BrowserRouter>
      </Context.Provider>
    )
  }
  else return (
    <Context.Provider value={{setisloggedin}}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <LoginPage/> } />
          <Route path="/register" element={ <RegisterPage/> } />
          <Route path="*" element={ <LoginPage/> } />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;


{/* <Context.Provider value={{setisloggedin, trainings, user, sysLoading, loading, stateIsLoggedIn}}>         
        <BrowserRouter>
          <div className="row m-0" style={{ height: "100vh" }}>
              <Sidebar/>
                          
            <div className="col-10 p-0">
              <Routes>            
                  <Route path="/home" element={ <MainPage/> } />
                  <Route path="/training/:id" element={ <TrainingFullInfo/> } />
                  <Route path="/trainings" element={ <TrainingList/> } />
                  <Route path="/mytraininginfo/:id" element ={ <MyTrainingInfo/> }/>
                  <Route path="/exercise" element={ <ExerciseAnim/> }/>
                  <Route path="/*" element={ <MainPage/> } />
                </Routes>
              </div>       
        </div>
        </BrowserRouter>
      </Context.Provider> */}