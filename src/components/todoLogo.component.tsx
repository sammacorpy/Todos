import { css } from "aphrodite"
import todoLogo from "../assets/logo.png"
import { margin, width } from "../commonCss"

export const TodoLogo = ({size}: {size: string}) => {
    return <img className={css(width(size), margin("0 -10%"))} src={todoLogo} alt="" />
}
