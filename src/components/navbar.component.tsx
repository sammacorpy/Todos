import { StyleSheet, css } from "aphrodite"
import React, { useContext } from "react"
import {FaUserCircle} from "react-icons/fa"
import { primaryColor, shadowColor } from "../theme"
import commonCss, { padding } from "../commonCss"
import { TodoLogo } from "./todoLogo.component"
import { authContext } from "../App"


export const Navbar = () => {
    const {auth, signOut} = useContext(authContext)
    return <React.Fragment>
        <nav className={css(styles.nav, commonCss.row, commonCss.alignCenter)}>
            <div className={css(styles.navLogo, commonCss.row, commonCss.alignCenter)}>
                <TodoLogo size="80px"></TodoLogo>
                <div className={css(padding("0 10px"))}>Todos</div>
            </div>
            <div className={css(styles.navRightSideActions, commonCss.column)}>
                <FaUserCircle className={css(styles.userIcon)}></FaUserCircle>
                <div className={css(styles.userAction)}>
                    <div className={css(styles.userActionItem)}>{auth?.user?.name}</div>
                    <div className={css(styles.userActionItem)} onClick={() => signOut()}>Logout</div>
                </div>
            </div>
        </nav>
    </React.Fragment>
}

const styles = StyleSheet.create({
    nav: {
        backgroundColor: primaryColor,
        height: "60px",
        boxSizing: "border-box",
        justifyContent: "space-between",
        padding: "0 5%"
    },
    navLogo: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: "1.2rem"
    },
    navRightSideActions: {
        position: "relative",
        justifyContent: "center",
        height: "60px"
    },
    userIcon: {
        fontSize: "1.4rem",
        color: "#fff",
        cursor: "pointer",
        ":hover ~ div": {
            display: "block"
        }
    },
    userAction: {
        position: "absolute",
        right: "20%",
        top: "40px",
        whiteSpace: "nowrap",
        display: "none",
        ":hover": {
            display: "block"
        },
        boxShadow: "2px 2px 10px #aaa",
        border: "10px transparent",
        borderRadius: "10px"
    },
    userActionItem: {
        display: "block",
        background: "#fff",
        padding: "10px",
        margin: "5px",
        border: "10px transparent",
        borderRadius: "10px",
        cursor: "pointer",
        ":hover": {
            background: shadowColor
        },
        ":active": {
            background: primaryColor
        },
        

    }
})