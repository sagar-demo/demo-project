import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Rigdetails = () => {
  const [rigDetails, setRigDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchRigDetails() {
      try {
        const response = await axios.get('http://localhost:8002/rig_details');
        // setRigDetails(response.data);

        const results = response?.data.filter(rig =>
          Object.values(rig).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        setSearchResults(results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRigDetails();
  }, []);


    const handleAddNewClick = () => {
    // Render a form to add a new rig
    // For example, you can render a modal or a separate page with a form to add a new rig
  }

  const handleMapViewClick = () => {
    // Render a map view of the rigs
  }

  const handleHandbookClick = () => {
    // Render a handbook of the rigs
  }

  const handleDetailsClick = (rig)=> {
    console.log(rig);
  }

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Rig Details</h1>
      <div>
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Rig Name</th>
            <th>Short name</th>
            <th>Customer Name</th>
            <th>Details</th>
            <th>Design</th>
            <th>Location</th>
            <th>Hull no.</th>
            <th>Class</th>
            {/* Add more table headings as needed */}
          </tr>
        </thead>
        <tbody>
        {searchResults.map((rig, index) => (
            <tr key={index.id}>
              <td>{index + 1}</td>
              <td>{rig.rig_name}</td>
              <td>{rig.rig_short_name}</td>
              <td>{rig.customer_name}</td>
              <td><button onClick={() => handleDetailsClick(rig)}>View Details</button></td>
              <td>{rig.design}</td>
              <td>{rig.location}</td>
              <td>{rig.hull_no}</td>
              <td>{rig.class}</td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddNewClick}>Add New</button>
      <button onClick={handleMapViewClick}>Map</button>
      <button onClick={handleHandbookClick}>Handbook</button>
      {/* Add more buttons as needed */}
    </div>
  );
  }

export default Rigdetails;