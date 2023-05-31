import { StyleSheet, css } from "aphrodite";
import { primaryColor } from "../theme";
import React from "react";

interface InputI extends React.HTMLAttributes<HTMLInputElement> {
  value?: string;
  type?: string;
  onChangeValue?: (val: string) => void;
  formProps?: any;
}

export const Input = React.memo(
  ({
    type,
    value,
    placeholder,
    className,
    autoFocus,
    onChangeValue,
    formProps,
  }: InputI) => {
    return (
      <input
        type={type}
        onChange={(e) => onChangeValue && onChangeValue(e.target.value)}
        autoFocus={autoFocus}
        value={value}
        className={`${css(styles.input)} ${className}`}
        placeholder={placeholder}
        {...formProps}
      />
    );
  }
);

const styles = StyleSheet.create({
  input: {
    padding: "0.8rem",
    outlineColor: primaryColor,
    width: "20rem",
    margin: "0 0 20px 0 ",
  },
});
