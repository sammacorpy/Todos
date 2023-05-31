import { StyleSheet, css } from "aphrodite";
import { primaryColor, shadowColor } from "../theme";
import React from "react";
import { backgroundColor } from "../commonCss";

interface ButtonI extends React.HTMLAttributes<HTMLButtonElement> {
  type?: string;
  text: string;
  color?: string;
}

export const ButtonMedium = React.memo(
  ({ text, onClick, color, className }: ButtonI) => {
    return (
      <button
        onClick={onClick}
        className={`${css(styles.button, backgroundColor(color || primaryColor))} ${className}`}
      >
        {text}
      </button>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    display: "block",
    padding: "1rem",
    border: "none",
    width: "5rem",
    color: "#fff",
    boxShadow: `1px 1px 5px ${shadowColor}`,
    ":active": {
      boxShadow: `0px 0px 1px ${shadowColor}`,
    },
  },
});

