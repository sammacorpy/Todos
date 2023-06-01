import { createContext, useEffect, useState } from "react";
import { PriorityRadioItem } from "./priorityRadioItem.component";
import { flexRowAllCenter, margin } from "../commonCss";
import { css } from "aphrodite";
import { softBlack } from "../theme";

interface PriorityRadioButtonProps {
  getSelected: (val: string) => void;
  selected: string;
  children: any;
}

export const radioContext = createContext({} as any);

export const PriorityRadioGroup = ({
  getSelected,
  selected,
  children,
}: PriorityRadioButtonProps) => {
  const [checked, setChecked] = useState(selected);
  useEffect(()=>{
    setChecked(selected)
  }, [selected])
  const onChange = (val: string) => {
    getSelected(val);
    setChecked(val);
  };
  return (
    <radioContext.Provider value={{ checked, onChange }}>
    <div className={css(...flexRowAllCenter, margin("0 18px"))}>
        <div style={{color: softBlack}}>Priority: </div>
        {children}
    </div>
    </radioContext.Provider>
  );
};

PriorityRadioGroup.PriorityRadioItem =  PriorityRadioItem;


