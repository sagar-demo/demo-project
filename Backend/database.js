const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(cors());

// Creating  a connection to the MySQL database
const pool=mysql.createPool({
host:process.env.DB_HOST,
user:process.env.DB_USERNAME,
password:process.env.DB_PASSWORD,
 database:process.env.DB_DBNAME,
  waitForConnection:true,
  connectionLimit:10,
  queueLimit:0
});

//for Connecting to the MySQL database
pool.getConnection((err,conn)=>{
  if(err){
    console.log(err)
  }
  console.log("Connnected successfully!");
})

app.post("/post", (req, res) => {
  const s_no = req.body.s_no;
  const rig_name = req.body.rig_name;
  const short_name = req.body.short_name;
  const customer_name = req.body.customer_name;
  const details = req.body.details;
  const design = req.body.design;
  const location = req.body.location;
  const hull_no = req.body.hull_no;
  const design_2 = req.body.design_2;
  const new_group = req.body.new_group;

  connection.query(
    "insert into rig_details values(?,?,?,?,?,?,?,?,?,?)",
    [
      s_no,
      rig_name,
      short_name,
      customer_name,
      details,
      design,
      location,
      hull_no,
      design_2,
      new_group,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("POSTED");
      }
    }
  );
});

app.post("/post1", (req, res) => {
  const s_no = req.body.s_no;
  const country = req.body.country;
  const File_name_for_legal_requirements =
    req.body.File_name_for_legal_requirements;
  const Documents = req.body.Documents;

  connection.query(
    "insert into legal_details values(?,?,?,?)",
    [s_no, country, File_name_for_legal_requirements, Documents],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("POSTED");
      }
    }
  );
});

app.post("/post2", (req, res) => {
  const S_No = req.body.S_No;
  const Customer_Name = req.body.Customer_Name;
  const Designation = req.body.Designation;
  const Signature = req.body.Signature;
  const Components = req.body.Components;
  const Rigs = req.body.Rigs;
  const Experience_with_components_X3 = req.body.Experience_with_components_X3;
  const Upcoming_project_duration_RigName =
    req.body.Upcoming_project_duration_RigName;

  connection.query(
    "insert into professional_details values(?,?,?,?,?,?,?,?)",
    [
      S_No,
      Customer_Name,
      Designation,
      Signature,
      Components,
      Rigs,
      Experience_with_components_X3,
      Upcoming_project_duration_RigName,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("POSTED");
      }
    }
  );
});

app.post("/post3", (req, res) => {
  const Id_No = req.body.Id_No;
  const Item_No = req.body.Item_No;
  const Description = req.body.Description;
  const Manufacturer = req.body.Manufacturer;
  const Model = req.body.Model;
  const Serial_No = req.body.Serial_No;
  const Cal_Date = req.body.Cal_Date;
  const Due_Date = req.body.Due_Date;
  const Range_Value = req.body.Range_Value;
  const Nominal_Value = req.body.Nominal_Value;
  const Measured_Value = req.body.Measured_Value;
  const Acceptance_Criteria = req.body.Acceptance_Criteria;
  const Frequency = req.body.Frequency;
  const Cert_No = req.body.Cert_No;
  const Status = req.body.Status;
  const Remarks = req.body.Remarks;

  connection.query(
    "insert into tools_register values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      Id_No,
      Item_No,
      Description,
      Serial_No,
      Manufacturer,
      Model,
      Cal_Date,
      Due_Date,
      Range_Value,
      Nominal_Value,
      Measured_Value,
      Acceptance_Criteria,
      Frequency,
      Cert_No,
      Status,
      Remarks,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("POSTED");
      }
    }
  );
});

//write app.get function to get all the details if rig_details table from mysql database
app.get("/rig_details", (req, res) => {
  connection.query("select * from rig_details", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Search api to search results by using parameters like rig short name,customer name,design,location

app.get("/rig_details_search", (req, res) => {
  const { rigShortName, customerName, design, location } = req.query;
  console.log("rig details::::::::::");
  let query = "SELECT * FROM rig_details";

  if (rigShortName || customerName || design || location) {
    query += " WHERE";

    if (rigShortName) {
      query += ` short_name = '${rigShortName}'`;
    }

    //   if (customerName) {
    //     query += ` ${rigShortName ? 'AND' : ''} customer_name = '${customerName}'`;
    //   }

    //   if (design) {
    //     query += ` ${rigShortName || customerName ? 'AND' : ''} design = '${design}'`;
    //   }

    //   if (location) {
    //     query += ` ${rigShortName || customerName || design ? 'AND' : ''} location = '${location}'`;
    //   }
  }

  connection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//search api for legal details by country name

app.get("/legal_details", (req, res) => {
  const { country } = req.query;

  let query = "SELECT * FROM legal_details";

  if (country) {
    query += ` WHERE country = '${country}'`;
  }

  connection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

/*app.get('/legal_details', (req, res) => {
    connection.query('select * from legal_details', (err, data) => {
        if (err) return res.json(err)
        return res.json(data)


    })

})*/

//Search api for professional_details by customer name and rigs_short_name

app.get("/professional_details", (req, res) => {
  const { Customer_Name, Rigs } = req.query;

  let query = "SELECT * FROM professional_details";

  if (Customer_Name || Rigs) {
    query += " WHERE";

    if (Customer_Name) {
      query += ` Customer_name = '${Customer_Name}'`;
    }

    if (Rigs) {
      query += ` ${Customer_Name ? "AND" : ""} Rigs = '${Rigs}'`;
    }
  }

  connection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

/*app.get('/professional_details', (req, res) => {
    connection.query('select * from professional_details', (err, data) => {
        if (err) return res.json(err)
        return res.json(data)


    })

})*/

//search api for tools_register by Item_No

app.get("/tools_register/:item_no", (req, res) => {
  const item_no = req.params.item_no;
  connection.query(
    "SELECT * FROM tools_register WHERE item_no = ?",
    [item_no],
    (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    }
  );
});

/*app.get('/tools_register', (req, res) => {
    connection.query('select * from tools_register', (err, data) => {
        if (err) return res.json(err)
        return res.json(data)


    })

})*/

//To update all the details or specific fields

app.put("/post", (req, res) => {
  const s_no = req.body.s_no;
  const rig_name = req.body.rig_name;
  const short_name = req.body.short_name;
  const customer_name = req.body.customer_name;
  const details = req.body.details;
  const design = req.body.design;
  const location = req.body.location;
  const hull_no = req.body.hull_no;
  const design_2 = req.body.design_2;
  const new_group = req.body.new_group;

  connection.query(
    "UPDATE rig_details SET s_no = ?, rig_name = ?, short_name = ?, customer_name = ?, details = ?, design = ?, location = ?, hull_no = ?, design_2 = ?, new_group = ? WHERE s_no = ?",
    [
      s_no,
      rig_name,
      short_name,
      customer_name,
      details,
      design,
      location,
      hull_no,
      design_2,
      new_group,
      s_no,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("UPDATED");
      }
    }
  );
});

app.put("/post1", (req, res) => {
  const s_no = req.body.s_no;
  const country = req.body.country;
  const File_name_for_legal_requirements =
    req.body.File_name_for_legal_requirements;
  const Documents = req.body.Documents;

  connection.query(
    "update legal_details SET s_no = ?, country = ?, File_name_for_legal_requirements = ?,Documents = ? WHERE s_no = ?",
    [s_no, country, File_name_for_legal_requirements, Documents, s_no],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("UPDATED");
      }
    }
  );
});

app.put("/post2", (req, res) => {
  const S_No = req.body.S_No;
  const Customer_Name = req.body.Customer_Name;
  const Designation = req.body.Designation;
  const Signature = req.body.Signature;
  const Components = req.body.Components;
  const Rigs = req.body.Rigs;
  const Experience_with_components_X3 = req.body.Experience_with_components_X3;
  const Upcoming_project_duration_RigName =
    req.body.Upcoming_project_duration_RigName;

  connection.query(
    "update professional_details SET S_No = ?, Customer_Name = ?, Designation = ?, Signature = ?, Components = ?, Rigs = ?, Experience_with_components_X3 = ?, Upcoming_project_duration_RigName = ? WHERE S_NO = ?",
    [
      S_No,
      Customer_Name,
      Designation,
      Signature,
      Components,
      Rigs,
      Experience_with_components_X3,
      Upcoming_project_duration_RigName,
      S_No,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("UPDATED");
      }
    }
  );
});

app.put("/post3", (req, res) => {
  const Id_No = req.body.Id_No;
  const Item_No = req.body.Item_No;
  const Description = req.body.Description;
  const Manufacturer = req.body.Manufacturer;
  const Model = req.body.Model;
  const Serial_No = req.body.Serial_No;
  const Cal_Date = req.body.Cal_Date;
  const Due_Date = req.body.Due_Date;
  const Range_Value = req.body.Range_Value;
  const Nominal_Value = req.body.Nominal_Value;
  const Measured_Value = req.body.Measured_Value;
  const Acceptance_Criteria = req.body.Acceptance_Criteria;
  const Frequency = req.body.Frequency;
  const Cert_No = req.body.Cert_No;
  const Status = req.body.Status;
  const Remarks = req.body.Remarks;

  connection.query(
    "update tools_register SET Id_No = ?, Item_No = ?, Description = ?, Manufacturer = ?, Model = ?, Serial_No = ?, Cal_Date = ?, Due_Date = ?,Range_Value = ?,Nominal_Value = ?,Measured_Value = ?,Acceptance_Criteria = ?,Frequency = ?,Cert_No = ?,Status = ?,Remarks = ? WHERE Id_No = ?",
    [
      Id_No,
      Item_No,
      Description,
      Manufacturer,
      Model,
      Serial_No,
      Cal_Date,
      Due_Date,
      Range_Value,
      Nominal_Value,
      Measured_Value,
      Acceptance_Criteria,
      Frequency,
      Cert_No,
      Status,
      Remarks,
      Id_No,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("UPDATED");
      }
    }
  );
});

app.put("/project_details", (req, res) => {
  const Order_No = req.body.Order_No;
  const Po_No = req.body.Po_No;
  const Po_Days = req.body.Po_Days;
  const Quote_No = req.body.Quote_No;
  const Sales_Order_Date = req.body.Sales_Order_Date;
  const Service_Component = req.body.Service_Component;
  const Nature_Of_Service = req.body.Nature_Of_Service;
  const Rig_Name = req.body.Rig_Name;
  const Customer_Name = req.body.Customer_Name;
  const Rig_Location = req.body.Rig_Location;
  const Rig_Type = req.body.Rig_Type;
  const Estimated_Date_Of_Commencement =
    req.body.Estimated_Date_Of_Commencement;
  const Estimated_Project_Completion_Month =
    req.body.Estimated_Project_Completion_Month;
  const Torque_Wrench = req.body.Torque_Wrench;
  const Dial_Indicator = req.body.Dial_Indicator;
  const Team_Member = req.body.Team_Member;
  const Designation = req.body.Designation;

  connection.query(
    "UPDATE project_details SET Order_No = ?, Po_No = ?, Po_Days = ?, Quote_No = ?, Sales_Order_Date = ?, Service_Component = ?, Nature_Of_Service = ?, Rig_Name = ?, Customer_Name = ?, Rig_Location = ?  Rig_Type = ?, Estimated_Date_Of_Commencement = ?, Estimated_Project_Completion_Month = ?, Torque_Wrench = ?, Dial_IndiWHERE s_no = ?",
    [
      s_no,
      rig_name,
      short_name,
      customer_name,
      details,
      design,
      location,
      hull_no,
      design_2,
      new_group,
      s_no,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("UPDATED");
      }
    }
  );
});

//For deleting the details from table

app.delete("/post", (req, res) => {
  const S_No = req.query.S_No;
  connection.query(
    "DELETE FROM rig_details WHERE S_No = ?",
    [S_No],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("DELETED");
      }
    }
  );
});

app.delete("/post1", (req, res) => {
  const S_No = req.query.S_No;
  connection.query(
    "DELETE FROM legal_details WHERE S_No = ?",
    [S_No],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("DELETED");
      }
    }
  );
});

app.delete("/post2", (req, res) => {
  const S_No = req.query.S_No;
  connection.query(
    "DELETE FROM professional_details WHERE S_No = ?",
    [S_No],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("DELETED");
      }
    }
  );
});

app.delete("/post3", (req, res) => {
  const Id_No = req.query.Id_No;
  connection.query(
    "DELETE FROM tools_register WHERE Id_No = ?",
    [Id_No],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("DELETED");
      }
    }
  );
});

app.get("/", (req, res) => {
  res.json("hello this from backened");
});

app.get("/rig_details", (req, res) => {
  const query = "SELECT * FROM rig_details";
  connection.query((err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Starting the server's listening port
const port = process.env.PORT || 500;
app.listen(port, () => {
  console.log("Server started on port");
});

/* // Writing the SQL query to insert the data into the MySQL database
 const query = 'INSERT INTO rig_details( s_no,rig_name,short_name,customer_name,details,design,location,hull_no,design2,class) VALUES (3,Trident-16,141,Shelf-Drilling,view_details,MLT 82-SD-C,Egypt,71,Leteourneaue,82-SD-C)';

  // Executing  the SQL query
  connection.query(query, [s_no,rig_name,short_name,customer_name,details,design,location,hull_no,design2,class{}], (err, result) => {
   if (err) {
     console.error('Error adding data to MySQL database:', err);
     res.status(500).send('Error adding data to MySQL database');
     return;
   }

   console.log('Data added to MySQL database:', result);
   res.send('Data added to MySQL database');
 });*/
