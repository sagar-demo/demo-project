import React from 'react';
import ergonlogo from '../Components/ergonlogo.png'
import signout from '../../src/Components/signout-icon.png'
import '../App.css';
import RigDetails from '../Components/Rigdetails';
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <div>

      <div className="App">
        <left ></left>
      </div>
      <div>
        <div div className="logo"><b>Jupiter</b>


          <img src={ergonlogo} className="ergonlogo" height="59" width="49" position="absolute" top="76686" left="1275" />



          <nav>
            <ul className='horizontal-list' style={{ display: 'flex', justifyContent: 'space-between' }} >
              
              <li><Link to = "/dashboard">Dashboard</Link></li>
              <li><Link to = "/dailytracker">Daily Tracker</Link></li>
              <li><Link to = "/surveyschedule">Survey Schedule</Link></li>






              <div>
                <div class="dropdown">
                  <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Reference details
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                    <li>
                      <Link to="/rigdetails" class="dropdown-item">
                        Rig Details
                      </Link>
                    </li>
                    <li><Link to="/toolsregister" class="dropdown-item" >Tools Register</Link></li>
                    <li><Link to="/legaldetails" class="dropdown-item" >Legal Details</Link></li>
                    <li><Link to="Templates" class="dropdown-item" >Templates</Link></li>
                  </ul>
                </div>

                {/* Render other components */}
              </div>












              <li><Link to = "/professionaldetails">Professionals Details</Link></li>
              <li><Link to = "/projects">Projects</Link></li>
              <li><Link to ="/documents">Documents</Link></li>
              <li><Link to = "/mobilizations">Mobilizations</Link></li>
              <li><Link to ="/signout">Signout<img src={signout} alt="Sign out" /></Link></li>
            </ul>

          </nav>

        </div>




      </div>



    </div>
  );
}


export default Navbar;
