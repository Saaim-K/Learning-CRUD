import './App.css';
import { db } from './firebase-config'
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';


function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const userCollectionRef = collection(db, "users")//from which collection you want data from?



  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      console.log("Data Docs", data.docs);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // setUsers(data.docs.map((x) => ({ ...x.data(), id: x.id })))
      //loop through each docs and for each docs i.e 'x' as parameter, get x.data
      console.log("Users", users);
    };
    getUsers()

  }, [])


  // ---------------------------------------- Create User ----------------------------------------
  const createUser = async () => {
    await addDoc(userCollectionRef, { name: newName, age: Number(newAge) })
  }
  // ---------------------------------------- Create User ----------------------------------------


  // ---------------------------------------- Delete User ----------------------------------------
  const deleteAge = async (doc) => {
  }
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
          <h1>Age : {users.age} <button onClick={updateAge}>UPDATE</button> <button onClick={deleteAge}>DELETE</button></h1>
        </div>
      ))}
      {/* ---------------------------------------- Displayed Div ---------------------------------------- */}

    </>
  );
}

export default App;
