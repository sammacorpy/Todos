import { StyleSheet, css } from "aphrodite";
import commonCss, { flexRowAllCenter, flex } from "../commonCss";
import { isMobileView, shadowColor } from "../theme";
import { ButtonMedium } from "./button.component";
import { Input } from "./input.component";
import { PriorityRadioGroup } from "./priorityRadioGroup.component";
import { Todo } from "../interface/todo";


interface TodoInputBarProps {
    inputValue: Todo;
    onSubmit: (val:Todo) => void,
    onChange: (val: Todo) => void,
    inputRef: React.MutableRefObject<null>
}

export const TodoInputBar = ({inputValue, onSubmit, onChange}: TodoInputBarProps) => {
  console.log("from Todo input Bar", inputValue)
  return (
    <>
      <div className={css(...flexRowAllCenter)}>
        <div
          className={css(
            isMobileView ? commonCss.column : commonCss.row,
            styles.todoInputParamGroup
          )}
        >
          <PriorityRadioGroup
            selected={inputValue.priority}
            getSelected={(priority) => (onChange({...inputValue, priority}))}
          >
            <PriorityRadioGroup.PriorityRadioItem label="High"></PriorityRadioGroup.PriorityRadioItem>
            <PriorityRadioGroup.PriorityRadioItem label="Medium"></PriorityRadioGroup.PriorityRadioItem>
            <PriorityRadioGroup.PriorityRadioItem label="Low"></PriorityRadioGroup.PriorityRadioItem>
          </PriorityRadioGroup>
          <Input
            className={css(styles.todoInputBox, !isMobileView && flex("2"))}
            type="text"
            placeholder="Enter TODO"
            value={inputValue.description}
            onChangeValue={(description) => onChange({...inputValue, description})}
          />
          <Input
            type="date"
            value={inputValue.datetime}
            className={css(styles.todoInputBox, !isMobileView && flex("1"))}
            onChangeValue={(datetime) => onChange({...inputValue, datetime})}
          />

          <ButtonMedium
            onClick={() => onSubmit(inputValue)}
            className={css(styles.todoSubmitButton)}
            text="Add Todo"
          ></ButtonMedium>
        </div>
      </div>
    </>
  );
};

const styles = StyleSheet.create({
    todoInputBox: {
        border: "none",
        boxShadow: `0px 0px 2px ${shadowColor}`,
        marginBottom: "none",
      },
      todoInputParamGroup: {
        background: "#fff",
        borderRadius: "10px",
      },
      todoSubmitButton: {
        whiteSpace: "nowrap",
        cursor: "pointer",
        alignSelf: "center",
      },
})