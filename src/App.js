import './App.css';
import { db } from './firebase-config'
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';


function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const userCollectionRef = collection(db, "users")//from which collection you want data from?
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


  return (
    <>
      {users.map((users) => (
        <>
          <div>Name{users.name}</div>
          <div>Age{users.age}</div>
        </>
      ))}

    </>
  );
}

export default App;
