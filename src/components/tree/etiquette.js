import { useState } from "react";
import Updatable from "./updatable";

function Etiquette({ name, path, value, onChange, editable, children }) {
  const [update, setUpdate] = useState(false);
  if (update && editable) {
    return (
      <Updatable
        value={value}
        setUpdate={setUpdate}
        onChange={onChange}
        path={path}
        name={name}
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
