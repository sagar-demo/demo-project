import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RigDetails() {
  const [rigShortName, setRigShortName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [design, setDesign] = useState('');
  const [location, setLocation] = useState('');
  const [rigDetails, setRigDetails] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const query = 'SELECT * FROM rig_details WHERE rig_short_name = ? AND customer_name = ? AND design = ? AND location = ?';
    const values = [rigShortName, customerName, design, location];
  
    connection.query(query, values, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        setRigDetails(results);
      }
    });
  };
  

  useEffect(() => {
    connection.query('SELECT * FROM rig_details', (error, results) => {
      if (error) {
        console.log(error);
      } else {
        setRigDetails(results);
      }
    });
  }, []);
  
  const handleUpdate = (id) => {
    const newLocation = prompt('Enter new location:');
    const query = 'UPDATE rig_details SET location = ? WHERE id = ?';
    const values = [newLocation, id];
  
    connection.query(query, values, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        const updatedRigDetails = rigDetails.map(detail => {
          if (detail.id === id) {
            return { ...detail, location: newLocation };
          } else {
            return detail;
          }
        });
        setRigDetails(updatedRigDetails);
      }
    });
  };
  

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Rig Short Name" value={rigShortName} onChange={(e) => setRigShortName(e.target.value)} />
        <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        <input type="text" placeholder="Design" value={design} onChange={(e) => setDesign(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Rig Short Name</th>
            <th>Customer Name</th>
            <th>Design</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rigDetails.map(detail => (
            <tr key={detail.id}>
              <td>{detail.rig_short_name}</td>
              <td>{detail.customer_name}</td>
              <td>{detail.design}</td>
              <td>{detail.location}</td>
              <td>
                <button onClick={() => handleUpdate(detail.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RigDetails;
