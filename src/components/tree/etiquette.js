import { useState } from "react";
import Editable from "./editable";

export const TYPES = {
  name: "etiquette/name",
  value: "etiquette/value",
};

function Etiquette({
  name,
  path,
  value,
  onChange,
  editable,
  nameOrValue,
  children,
}) {
  const [update, setUpdate] = useState(false);
  if (update && editable) {
    return (
      <Editable
        value={value}
        setUpdate={setUpdate}
        onChange={onChange}
        path={path}
        name={name}
        nameOrValue={nameOrValue}
      />
    );
  }
  return (
    <span
      onClick={function (e) {
        setUpdate(true);
      }}
    >
      {children}
    </span>
  );
}

export default Etiquette;
