import './App.css';
import db from './firebase-config'
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';


function App() {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users")
  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(userCollectionRef)
    }


  }, [])
  getUsers()


  return (
    <>

    </>
  );
}

export default App;
