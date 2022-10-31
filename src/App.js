import './App.css';
import db from './firebase-config'
import { useEffect, useState } from 'react';


function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {

    const getUsers = async () => {

    }
  }, [])
  getUsers()


  return (
    <>

    </>
  );
}

export default App;
