import { StyleSheet, css } from "aphrodite";
import { useContext } from "react";
import { radioContext } from "./priorityRadioGroup.component";
import { backgroundColor, borderColor } from "../commonCss";
import { colorByPriority } from "../theme";



export const PriorityRadioItem = ({ label }: { label: string }) => {
  const { checked, onChange } = useContext(radioContext);
  return (
    <div
      className={css(
        styles.priorityRadio,
        checked === label && backgroundColor(colorByPriority[label]),
        borderColor(colorByPriority[label])
      )}
      onClick={() => onChange(label)}
    />
  );
};

const styles = StyleSheet.create({
  priorityRadio: {
    border: `3px solid`,
    borderRadius: "100%",
    width: "10px",
    height: "10px",
    margin: "5px"
  },
});
