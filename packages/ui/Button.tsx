import * as React from "react";

interface Props {
name:string
}

export const Button:React.FC<Props> = ({name}) => {
  return <button>Boop {name}</button>;
};
