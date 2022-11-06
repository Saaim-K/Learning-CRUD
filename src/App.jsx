import './App.css';
import { db } from './firebase-config'
import moment from 'moment/moment'; 
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, addDoc, deleteDoc, onSnapshot, query } from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);

  // ---------------------------------------- From which Collection you want data from ----------------------------------------
  const userCollectionRef = collection(db, "users")//from which collection you want data from?
  // ---------------------------------------- From which Collection you want data from ----------------------------------------


  // ---------------------------------------- UseEffect Hook ----------------------------------------

  useEffect(() => {

    // ---------------------------------------- Getting Data From Firebase ----------------------------------------
    const getUserData = async () => {
      const data = await getDocs(userCollectionRef);
      console.log("Data Docs", data.docs);

      // -------------------- Populating Users State with Data from Database --------------------
      setUsers(data.docs.map((getData) => ({ ...getData.data(), id: getData.id })));
      console.log("Users", users);
      // -------------------- Populating Users State with Data from Database --------------------

    };
    // getUserData()
    // ---------------------------------------- Getting Data From Firebase ----------------------------------------


    // ---------------------------------------- Getting Real Time Data From Firebase ----------------------------------------
    let unsubscribe;
    const realTimeData = () => {
      const q = query(userCollectionRef);
      unsubscribe = onSnapshot(q, realData => {
        // -------------------- Populating Users State with Data from Database --------------------
        setUsers(realData.docs.map((getData) => ({ ...getData.data(), id: getData.id })))
        // -------------------- Populating Users State with Data from Database --------------------
      });
    }
    realTimeData();
    // ---------------------------------------- Getting Real Time Data From Firebase ----------------------------------------


    // The useEffect Hook is built in a way that we can return a function inside it and this return function is where the cleanup happens.The cleanup function prevents memory leaks and removes some unnecessary and unwanted behaviors.
    return () => {
      console.log('Cleanup Function');
      unsubscribe();
    }


  }, [])

  // ---------------------------------------- UseEffect Hook ----------------------------------------


  // ---------------------------------------- Create User ----------------------------------------
  const addUser = async () => {
    await addDoc(userCollectionRef,
      {
        name: newName,
        age: Number(newAge),
        createdOn: new Date().getTime()
      });
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
      <button onClick={addUser}>Create User</button>
      {/* ---------------------------------------- Form ---------------------------------------- */}


      {/* ---------------------------------------- Displayed Div ---------------------------------------- */}
      {users.map((users, i) => (
        <div key={i}>
          <h3>Name : {users.name}</h3>
          <h3>Age : {users.age} </h3>
          <h4>Date : {moment(users.createdOn).fromNow('ss')} </h4>
          <h4>ID : {users.id} </h4>
          <button onClick={updateAge}>UPDATE</button>
          <button onClick={() => { deleteUser(users.id); }}>DELETE</button>
        </div>
      ))}
      {/* ---------------------------------------- Displayed Div ---------------------------------------- */}

    </>
  );
}

export default App;
