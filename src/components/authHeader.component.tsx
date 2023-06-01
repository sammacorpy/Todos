import { StyleSheet, css } from "aphrodite";
import React from "react"
import { Link } from "react-router-dom"
import commonCss from "../commonCss"
import { primaryColor } from "../theme";
import { TodoLogo } from "./todoLogo.component";


interface AuthHeaderProps {
    login?: boolean;
    signup?: boolean;
    errorMsg?: string;
}

export const AuthHeader = ({login, signup, errorMsg }: AuthHeaderProps) => {
    const loginOrSignUp = (login && "Login") || "Sign Up" 
    return <React.Fragment>
        <TodoLogo size="10rem" ></TodoLogo>
        <div className={css(styles.textHeader)}>{loginOrSignUp}</div>
        <div className={css(styles.textSubHeader)}>
          Please {loginOrSignUp} to Continue
        </div>
        <div className={css(styles.textSubHeader)}>
          {(login && "Don't have an account? ") || "Already have an account? "}
          <Link
            className={css(commonCss.noLinkDecoration, styles.primaryColor)}
            to={(signup && "/login") || "/signup"}
          >
            {(signup && "Login") || "Sign Up"}
          </Link>
        </div>
        <div className={css(styles.textSubHeader, styles.red)}>
            {errorMsg}
        </div>

    </React.Fragment>
}

const styles = StyleSheet.create({
    textHeader: {
      width: "20rem",
      margin: "10px 0 10px 0",
      fontSize: "1.5rem",
      fontWeight: "bold",
      alignSelf: "flex-start",
    },
    textSubHeader: {
      width: "20rem",
      alignSelf: "flex-start",
      color: "#222",
      margin: "0px 0 15px 0",
      fontFamily: "'Ubuntu', sans-serif",
    },
    primaryColor: {
      color: primaryColor,
    },
    errorTxt: {
      color: "#f00",
      fontSize: "0.9rem",
      marginTop: "-20px",
      marginBottom: "10px",
      alignSelf: "flex-start",
    },
    red: {
        color: "#f00"
    }
  });