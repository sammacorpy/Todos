
import { Auth } from "../interface/auth";
import LoginPage from "../screens/loginPage.component";

interface AuthGuardI extends React.HTMLAttributes<HTMLElement> {
    component: () => JSX.Element,
    auth: Auth,
    errorMsg: string,
    signIn: (val: any) => void
}

export const AuthGuard = ({component, auth, signIn, errorMsg}: AuthGuardI) => {
    return auth?.isAuthenticated
        ?   <>{component()}</>
        :   <LoginPage auth={auth} signIn={signIn} errorMsg={errorMsg}></LoginPage>
}