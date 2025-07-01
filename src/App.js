import './App.css';

function App() {


  const formHandle = ()=>{

  }
  return (
   <>
   <div className="App">
    <div className="form-container">
      <h2>InfoCapture</h2>
      <form onSubmit={formHandle}>
        <input type="text"  placeholder='Enter Your Name'required/>
        <input type="text"  placeholder='Enter Your Last Name'required/>
        <input type="text"  placeholder='Enter Your City' required/>
        <button type='submit' className='addBtn'>ADD</button>
        <button type='submit' className='updateBtn'>Update</button>
      </form>
    </div>

    <div className="table-container">
      <h2>Citizens </h2>
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
          <tr>
            <td>Name</td>
            <td>Last Name</td>
            <td>City</td>
            <td>
              <i class="fa-solid fa-pen-to-square editBtn myBtn"></i>
              <i class="fa-solid fa-square-xmark delBtn myBtn"></i>
            </td>
          </tr>
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
