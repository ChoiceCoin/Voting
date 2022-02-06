// import TextField from './components/TextField'
import Display from './components/Display'
import UserForm from './components/UserForm'
// import UserProfile from './containers/UserProfile';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


export default function App() {
  return (
    <>
    {/* <UserForm /> */}
    {/* <TextField /> */}
    {/* <Display /> */}
    <Router>
      <Routes>
        <Route exact path='/' element={<UserForm />}></Route>
        <Route exact path='/payment' element={<Display />}></Route>
      </Routes>
    </Router>
    
    </>
  );
}
