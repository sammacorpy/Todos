import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './screens/loginPage.component';
import TodoPage from './screens/todos/todoPage.component';
import SignupPage from './screens/signup.component';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' Component={LoginPage}/>
      <Route path='/signup' Component={SignupPage}/>
      <Route path='/' Component={TodoPage}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
