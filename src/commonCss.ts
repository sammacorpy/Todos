import { StyleSheet } from "aphrodite";

export const mobileView = "@media only screen and (max-width: 480px)";
export const tabletView =
  "@media only screen and (min-width: 481px) and (max-width: 768px)";

const commonCss = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  alignCenter: {
    alignItems: "center",
  },
  rootElem: {
    minHeight: "100vh",
    minWidth: "100vw",
    boxSizing: "border-box",
  },
  hideOnMobile: {
    [mobileView]: {
      display: "none",
    },
  },
  noLinkDecoration: {
    ":link": {
      textDecoration: "none",
    },
    ":visited": {
      textDecoration: "none",
    },
  },
});

export default commonCss;
export const flexRowAllCenter = [
  commonCss.row,
  commonCss.justifyCenter,
  commonCss.alignCenter,
];
export const flexColumnAllCenter = [
  commonCss.column,
  commonCss.justifyCenter,
  commonCss.alignCenter,
];

// css style generators
export const padding = (val: string) =>
  StyleSheet.create({
    _: {
      padding: `${val}`,
    },
  })._;
export const margin = (val: string) =>
  StyleSheet.create({
    _: {
      margin: `${val}`,
    },
  })._;
export const width = (val: string) =>
  StyleSheet.create({
    _: {
      width: `${val}`,
    },
  })._;
export const height = (val: string) =>
  StyleSheet.create({
    _: {
      height: `${val}`,
    },
  })._;
export const backgroundColor = (val: string) =>
  StyleSheet.create({
    _: {
      background: val,
    },
  })._;
