import loginSVGBackground from "../assets/todoLoginPage.svg";
import { css } from "aphrodite";
import commonCss, {
  flexColumnAllCenter,
  flexRowAllCenter,
  padding,
} from "../commonCss";
import { isMobileView } from "../theme";
import { SVGIllustration } from "../components/svgIllustration.component";
import { AuthForm } from "../components/authForm.component";
import { AuthHeader } from "../components/authHeader.component";
import { useEffect } from "react";
import { Auth } from "../interface/auth";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
    signIn: (val:any) => void;
    errorMsg: string;
    auth: Auth
}

const LoginPage = ({auth, signIn, errorMsg}: LoginPageProps) => {
    const navigate = useNavigate();
    useEffect(()=> {
        if (auth?.isAuthenticated)
            navigate("/")
    })
  return (
    <div className={css(flexRowAllCenter, commonCss.rootElem, padding("10px"))}>
      <SVGIllustration
        imageLocation={loginSVGBackground}
        altText="Login Page Background illustration"
      />
      <div
        className={css(
          isMobileView ? flexColumnAllCenter : commonCss.column,
          padding("0 0.8rem")
        )}
      >
        <AuthHeader login errorMsg={errorMsg}></AuthHeader>
        <AuthForm
          entities={[
            { name: "username", option: { required: "* username required" } },
            {
              name: "password",
              type: "password",
              option: {
                required: "* password required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
              },
            },
          ]}
          onFormSubmit={(form) => signIn(form)}
          actionText="Login"
        />
      </div>
    </div>
  );
};

export default LoginPage;