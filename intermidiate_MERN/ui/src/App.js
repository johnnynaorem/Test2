
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import EmploymentList from './components/EmploymentList';
import AddEmployee from './components/AddEmployee';
import EditEmplpoyeeDetails from './components/EditEmplpoyeeDetails';
function App() {
  return (
    <div className="App">
     <>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path="/employeelist" element={<EmploymentList />}></Route>
        <Route path="/addemployee" element={<AddEmployee />}></Route>
        <Route path="/editemployee" element={<EditEmplpoyeeDetails />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
     </>
    </div>
  );
}

export default App;
