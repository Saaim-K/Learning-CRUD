import './App.css';
import { db } from './firebase-config'
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, addDoc, deleteDoc, onSnapshot, query, serverTimestamp, orderBy } from 'firebase/firestore';

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
      const q = query(userCollectionRef, orderBy("createdOn", "desc"));
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
  const addUser = async (e) => {
    e.preventDefault();
    await addDoc(userCollectionRef,
      {
        name: newName,
        age: Number(newAge),
        // createdOn: new Date().getTime()
        createdOn: serverTimestamp()
      });
  }
  // ---------------------------------------- Create User ----------------------------------------


  // ---------------------------------------- Delete User ----------------------------------------
  const deleteUser = async (id) => {
    //To get a specific document from a collection in database,
    //we use doc(db, "users", id); where id tells which document we are talking about
    const deletedDoc = doc(db, "users", id);
    await deleteDoc(deletedDoc);
  };
  // ---------------------------------------- Delete User ----------------------------------------


  // ---------------------------------------- Update User ----------------------------------------
  const updateAge = async (id, updatedName) => {
    const updateDoc = doc(db, "users", id);
    await updateDoc(updateDoc, {
      name: updatedName
    });

  }
  // ---------------------------------------- Update User ----------------------------------------



  return (
    <>

      {/* ---------------------------------------- Form ---------------------------------------- */}
      <form onSubmit={addUser}>
        <input type="text" placeholder='Name...' onChange={(e) => { setNewName(e.target.value) }} />
        <input type="number" placeholder='Age...' onChange={(e) => { setNewAge(e.target.value) }} />
        <button>Create User</button>
      </form>
      {/* ---------------------------------------- Form ---------------------------------------- */}


      {/* ---------------------------------------- Displayed Div ---------------------------------------- */}
      {users.map((users, i) => (
        <div key={i}>
          <h3>Name : {users.name}</h3>
          <h3>Age : {users.age} </h3>

          {/* <h4>Date {moment((users.createdOn) ? users.createdOn : undefined).fromNow('s')}:</h4> */}
          <span>{
            moment((users.createdOn) ? users.createdOn.seconds * 1000 : undefined).format('Do MMMM, h:mm a')
          }</span>



          <h4>ID : {users.id} </h4>
          {/* <button onClick={()={
            const updatedState=users.map((eachUsers)=>{
              if(eachUsers.id===users.id){
            return{...eachUsers,isEditing:true}}
            else{
              return eachUsers
            }
            })>UPDATE</button> */}
            <button onClick={
                  ()=>{
                    const updatedState=users.map(eachItem=>{
                      if(eachItem.id===users.id){
                        return{...eachItem,isEditing:true}
                      }
                      else{return eachItem}
                    })
                    setNewName(updatedState)
                  }
            }></button>
          <button onClick={() => { deleteUser(users.id); }}>DELETE</button>
        </div>
  ))
}
{/* ---------------------------------------- Displayed Div ---------------------------------------- */ }

    </>
  );
}

export default App;
