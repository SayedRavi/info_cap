import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({firstName: '', lastName: '', city: ''})
    const [record, setRecord] = useState([]);
    const [isEditingId, setIsEditingId] = useState(null);

  const formHandle = (e)=>{
    e.preventDefault();
    if(isEditing){
      fetch(`https://db-infocap-default-rtdb.europe-west1.firebasedatabase.app/users/${isEditingId}.json`, {
        method: 'PUT',
        header: {'content-type' : 'application/json'},
        body: JSON.stringify(formData)
      }).then(()=>{
        setFormData({firstName: '', lastName: '', city: ''});
        setIsEditingId(null);
        setIsEditing(false);
        fetchData();
      
      })
     }else{
      fetch(`https://db-infocap-default-rtdb.europe-west1.firebasedatabase.app/users.json`, {
        method: 'POST',
        header: {'content-type' : 'application/json'},
        body: JSON.stringify(formData)
      })
      fetchData();
     }
      
    
    }
    useEffect(()=> {
      fetchData();
    }, [])
    const fetchData = ()=>{
      fetch(`https://db-infocap-default-rtdb.europe-west1.firebasedatabase.app/users.json`).then(response => response.json())
      .then(data => {
        const loadedRecords = [];
        for(let key in data){
          loadedRecords.push(
            {
              id: key,
              ...data[key]
            }
          )
        }
        setRecord(loadedRecords);
      })
    }

    const handleEdit = (record)=>{
      setFormData({firstName: record.firstName, lastName: record.lastName, city: record.city});
    setIsEditing(true);
    setIsEditingId(record.id);
    
    }


    const handleDelete = (id)=>{
      fetch(`https://db-infocap-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`, {
        method: 'DELETE'
      });
    
    }

    const handleInputChange = (e)=>{
      const {name, value} = e.target;
      setFormData(prevFormData => ({...prevFormData, [name]: value}))
    }
 

  return (
   <>
   <div className="App">
    <div className="form-container">
      <h2>InfoCapture</h2>
      <form onSubmit={formHandle}>
        <input type="text" name='firstName' value={formData.firstName} onChange={handleInputChange} placeholder='Enter Your Name'required/>
        <input type="text" name='lastName' value={formData.lastName} onChange={handleInputChange}  placeholder='Enter Your Last Name'required/>
        <input type="text" name='city' value={formData.city} onChange={handleInputChange} placeholder='Enter Your City' required/>

        {isEditing ? (
        <button type='submit' className='updateBtn'>Update</button>

        ):(
        <button type='submit' className='addBtn'>ADD</button>
        )}
      </form>
    </div>

    <div className="table-container">
      <h2>Citizens </h2>
      <h4 className='notification'>A New record has been added.</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         {record.map(record => (
           <tr key={record.id}>
            <td>{record.firstName}</td>
            <td>{record.lastName}</td>
            <td>{record.city}</td>
            <td>
              <i className="fa-solid fa-pen-to-square editBtn myBtn" onClick={()=>handleEdit(record)}></i>
              <i className="fa-solid fa-square-xmark delBtn myBtn" onClick={()=>handleDelete(record.id)}></i>
            </td>
          </tr>
         ))}
        </tbody>
      </table>
    </div>
    <div className="footer">
      	&copy; {new Date().getFullYear} Info Capture. All Rights Reserved.
    </div>
   </div>
   </>
  );
}

export default App;
