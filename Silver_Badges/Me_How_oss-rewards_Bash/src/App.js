import Display from './components/Display'
import UserForm from './components/UserForm'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<UserForm />}></Route>
          <Route exact path='/payment' element={<Display />}></Route>
        </Routes>
      </Router>
    </>
  );
}
