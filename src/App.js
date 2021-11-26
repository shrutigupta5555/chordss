import Home from '../src/pages/Home';
import React, {useState ,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewJam from './pages/NewJam';
import Jam from './pages/Jam';
import SetStage from './pages/SetStage';
import Instruments from './pages/instruments';
import Meeting from './pages/Meeting';

import {auth} from './components/utils/firebase';
import Trycry from './pages/trycry';

function App() {
  useEffect(() => {
    document.title = "chordz";  
  }, []);

  const [user, setuser] = useState(null)

  useEffect(() => {

    auth.onAuthStateChanged(
      userAuth => {
    
        
        if(userAuth) {
          const user = {
            uid : userAuth.uid,
            email: userAuth.email
          }
          console.log(user);
          setuser(user)
        }else{
          setuser(null)
        }
      }
    )

    
  }, [])

  return (
    <Router>
      <div>
        
        <Routes>
        <Route path='/' element={<Home  user={user}/>} />
        <Route path='/login' element={<Login user={user}/>} />
        <Route path='/signup' element={<Signup user={user}/>} />
        <Route path='/newjam' element={<NewJam user={user}/>} />
        <Route path='/jam' element={<Jam user={user}/>} />
        <Route path='/setstage' element={<SetStage user={user}/>} />
        <Route path="/instruments/" element={<Instruments user={user}/>} />
        <Route path="/meeting" element={<Meeting user={user}/>} />
        <Route path="/trycry" element={<Trycry/>}>
         
        </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;