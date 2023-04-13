import React from 'react'

import './App.css';

import Navbar from './Components/Navbar';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import DailyTracker from './Components/DailyTracker';
import SurveySchedule from './Components/SurveySchedule';
import ReferenceDetails from './Components/ReferenceDetails';
import ProfessionalDetails from './Components/ProfessionalDetails';
import Projects from './Components/Projects';
import Documents from './Components/Documents';
import Mobilizations from './Components/Mobilizations';
import Signout from './Components/Signout';
import RigDetails from './Components/Rigdetails';


function App() {
  return (
    <div>
       <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/dashboard"  element={<Dashboard/>}/>
          <Route path="/dailytracker"  element={<DailyTracker/>}/>
          <Route path="/surveyschedule"  element={<SurveySchedule/>}/>
          <Route path="/referencedetails"  element={<ReferenceDetails/>}/>
          <Route path="/rigdetails" element={<RigDetails/>} />
          <Route path="/professionaldetails"  element={<ProfessionalDetails/>}/>
          <Route path="/projects"  element={<Projects/>}/>
          <Route path="/documents"  element={<Documents/>}/>
          <Route path="/mobilizations"  element={<Mobilizations/>}/>
          <Route path="/signout"  element={<Signout/>}/>
        </Routes>
       
       
       
       
       
       
       
       
       
       
       </BrowserRouter>
   


    </div>
  );
}


export default App;
