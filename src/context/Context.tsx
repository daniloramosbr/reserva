import { createContext, useState } from "react";

let myVar: any;

export const ContextJsx = createContext(myVar);

type TitleProps = {
  children: any;
};

export const ContextProvider: any = ({ children }: TitleProps) => {

  const [data, setData] = useState<any>()
  const [mesa, setMesa] = useState<Number>(0)

  return (
    <ContextJsx.Provider value={{ data, setData, mesa, setMesa }}>{children}</ContextJsx.Provider>
  );
};
