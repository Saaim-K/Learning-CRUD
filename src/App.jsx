import './App.css';
import { db } from './firebase-config'
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);


  // -------------------- From which Collection you want data from --------------------
  const userCollectionRef = collection(db, "users")//from which collection you want data from?
  // -------------------- From which Collection you want data from --------------------



  // ---------------------------------------- Getting Data From Firebase ----------------------------------------
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      console.log("Data Docs", data.docs);

      // -------------------- Populating Users State with Data from Database --------------------
      setUsers(data.docs.map((getData) => ({ ...getData.data(), id: getData.id })));
      // setUsers(data.docs.map((x) => ({ ...x.data(), id: x.id })))
      //loop through each docs and for each docs i.e 'x' as parameter, get x.data
      console.log("Users", users);
      // -------------------- Populating Users State with Data from Database --------------------

    };
    getUsers()

  }, [])
  // ---------------------------------------- Getting Data From Firebase ----------------------------------------


  // ---------------------------------------- Create User ----------------------------------------
  const createUser = async () => {
    await addDoc(userCollectionRef, { name: newName, age: Number(newAge) })
  }
  // ---------------------------------------- Create User ----------------------------------------


  // ---------------------------------------- Delete User ----------------------------------------
  const deleteUser = async (id) => {
    //To get a specific document from a collection in database,
    //we use docdoc(db, "users", id); where id tells which document we are talking about
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };
  // ---------------------------------------- Delete User ----------------------------------------


  // ---------------------------------------- Update User ----------------------------------------
  const updateAge = async () => {

  }
  // ---------------------------------------- Update User ----------------------------------------



  return (
    <>

      {/* ---------------------------------------- Form ---------------------------------------- */}
      <input type="text" placeholder='Name...' onChange={(e) => { setNewName(e.target.value) }} />
      <input type="number" placeholder='Age...' onChange={(e) => { setNewAge(e.target.value) }} />
      <button onClick={createUser}>Create User</button>
      {/* ---------------------------------------- Form ---------------------------------------- */}


      {/* ---------------------------------------- Displayed Div ---------------------------------------- */}
      {users.map((users, i) => (
        <div key={i}>
          <h1>Name : {users.name}</h1>
          <h1>Age : {users.age} </h1>
          <button onClick={updateAge}>UPDATE</button>
          <button onClick={() => { deleteUser(users.id); }}>DELETE</button>
        </div>
      ))}
      {/* ---------------------------------------- Displayed Div ---------------------------------------- */}

    </>
  );
}

export default App;