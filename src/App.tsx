import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './screens/loginPage.component';
import TodoPage from './screens/todos/todoPage.component';
import SignUpPage from './screens/signUpPage.component';
import { AuthGuard } from './guards/authGuard';
import { createContext} from 'react';
import { useAuth } from './hooks/useAuth';
export const authContext = createContext({} as any);
function App() {
  const {auth, signIn, signOut, errorMsg} = useAuth();
  return (
    <authContext.Provider value={{auth, signOut}}>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage auth={auth} signIn={signIn} errorMsg={errorMsg}/>}/>
        <Route path='/signup' Component={SignUpPage}/>
        <Route path='/' element={<AuthGuard component = {TodoPage} auth={auth} signIn={signIn} errorMsg={errorMsg} />}/>

      </Routes>
      </BrowserRouter>
    </authContext.Provider>
  );
}

export default App;
