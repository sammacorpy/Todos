import { css } from "aphrodite"
import commonCss, { width, height } from "../commonCss"

interface SVGIllustrationProps {
    imageLocation: string;
    altText: string;
}

export const SVGIllustration = ({imageLocation, altText}: SVGIllustrationProps) => {
    return <img
    className={css(width("40vw"), height("auto"), commonCss.hideOnMobile)}
    src={imageLocation}
    alt={altText}
  />
}