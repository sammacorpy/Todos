import { useEffect, useState } from "react";
import usersRepository from "../repositories/users.repository";
import { useNavigate } from "react-router-dom";
import { Auth } from "../interface/auth";

interface SignUpFormI {
  name: string;
  password: string;
  ["confirm password"]: string;
  username: string;
}
 
interface SignInFormI {
  username: string;
  password: string;
}

export const useAuth = () => {
  const [auth, setAuth] = useState({} as Auth);
  const [errorMsg, setErrorMsg] = useState("");

  const parseAuthObjectFromUserID = async (userID: string) => {
    const user = userID && await usersRepository.getUser(userID);
    if (user)
    return {
      isAuthenticated: true,
      user: user
    } as Auth
  }

  useEffect(()=> {
    const userID = localStorage.getItem("signedInUserID");
    userID && parseAuthObjectFromUserID(userID).then(auth => {
      auth && setAuth(auth)
    }).catch(err => setErrorMsg(err))
    
  }, []);


  const signIn = (form: SignInFormI) => {
    usersRepository.signIn(
      form.username,
      form.password
    ).then(user =>{
      user?.id
        ? parseAuthObjectFromUserID(user.id).then(auth => auth && setAuth(auth)).catch(err=>setErrorMsg(err))
        : setErrorMsg("Username or Password is wrong")
      });
      // setAuth()
  };
  
  const signOut = () => {
    localStorage.removeItem("signedInUserID");
    setAuth({} as Auth);
  }
  return {auth, errorMsg, signIn, signOut}

}


export const useSignUp = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const signUp = (form: SignUpFormI) => {
    if (form.password !== form["confirm password"]) {
      setErrorMsg("Password does not match");
      return false;
    } else {
      usersRepository
      .isUsernameUnique(form.username)
      .then(async (isUnique) => {
        return isUnique
          ? await usersRepository.signup(
              form.name,
              form.username,
              form.password
            )
          : setErrorMsg("Username already exist");
      })
      .then(async (userID) =>{
        if (userID) {
          setErrorMsg("")
          alert("User Signed Up Successfully, Proceed to Login")
          navigate("/login")
        }
      });
    }
  };
  return {errorMsg, signUp}
}