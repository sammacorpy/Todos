import { StyleSheet, css } from "aphrodite";
import React from "react";
import commonCss, { flexColumnAllCenter, margin } from "../commonCss";
import { isMobileView } from "../theme";
import { ButtonMedium } from "./button.component";
import { Input } from "./input.component";
import { RegisterOptions, useForm } from "react-hook-form";

interface Entity {
  name: string;
  type?: string;
  option: RegisterOptions;
}

interface AuthFormProps {
  entities: Entity[];
  onFormSubmit: (val: any) => void;
  actionText: string;
}

export const AuthForm = ({ entities, onFormSubmit, actionText }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={css(isMobileView ? flexColumnAllCenter : commonCss.column)}
      >
        {entities.map(entity => {
          return (
            <React.Fragment key={entity.name}>
              <Input
                className={css(margin("0 0 20px 0"))}
                type={entity.type}
                placeholder={`Enter ${entity.name}`}
                formProps={register(entity.name, entity.option)}
              />
              {errors[entity.name] && (
                <div className={css(styles.errorTxt)}>
                  {errors[entity.name]?.message?.toString()}
                </div>
              )}
            </React.Fragment>
          );
        })}
        <ButtonMedium text={actionText} />
      </form>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  errorTxt: {
    color: "#f00",
    fontSize: "0.9rem",
    marginTop: "-20px",
    marginBottom: "10px",
    alignSelf: "flex-start",
  },
});
