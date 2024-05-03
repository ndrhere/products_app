import './App.css';
import Login from './Components/Login';
import Product from './Components/Product';
import Register from './Components/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
<Router>


  <Routes>

  <Route exact path = '/' element = {<Register/>}></Route>
  <Route exact path = '/login' element = {<Login/>}></Route>
  <Route exact path = '/product' element = {<Product/>}></Route>
  

  </Routes>


</Router>





     
     
    </div>
  );
}

export default App;
