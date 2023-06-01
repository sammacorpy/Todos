import signupSVGBackground from "../assets/todoSignupPage.svg";
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
import { useSignUp } from "../hooks/useAuth";

const SignUpPage = () => {
    const {errorMsg, signUp} = useSignUp();
  
  return (
    <div className={css(flexRowAllCenter, commonCss.rootElem, padding("10px"))}>
      <SVGIllustration
        imageLocation={signupSVGBackground}
        altText="Login Page Background illustration"
      />
      <div
        className={css(
          isMobileView ? flexColumnAllCenter : commonCss.column,
          padding("0 0.8rem")
        )}
      >
        <AuthHeader signup errorMsg={errorMsg}></AuthHeader>
        <AuthForm
          entities={[
            { name: "name", option: { required: "* name required" } },
            { name: "username", option: { required: "* username required" } },
            {
              name: "password",
              type: "password",
              option: {
                required: "*password required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
              },
            },
            {
              name: "confirm password",
              type: "password",
              option: { required: "* confirm password required" },
            },
          ]}
          onFormSubmit={(form) => signUp(form)}
          actionText="Sign Up"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
