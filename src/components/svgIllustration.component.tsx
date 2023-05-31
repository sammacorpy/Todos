import { css } from "aphrodite"
import commonCss, { width, height } from "../commonCss"

interface SVGIllustrationI {
    imageLocation: string;
    altText: string;
}

export const SVGIllustration = ({imageLocation, altText}: SVGIllustrationI) => {
    return <img
    className={css(width("40vw"), height("auto"), commonCss.hideOnMobile)}
    src={imageLocation}
    alt={altText}
  />
}