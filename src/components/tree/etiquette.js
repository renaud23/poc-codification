import { useState } from "react";
import Updatable from "./updatable";

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
      <Updatable
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
