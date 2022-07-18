import { useState } from "react";
import Updatable from "../updatable";
import Indent from "../indent";
import Etiquette from "../etiquette";

function Content({ value }) {
  if (value === undefined) {
    return <span className="undefined">undefined</span>;
  }
  if (typeof value === "string") {
    return (
      <span className="string">
        <span className="quote">"</span>
        <span className="content">{value}</span>
        <span className="quote">"</span>
      </span>
    );
  }
  return <span className="default">{value}</span>;
}

function Value({ value, onChange, path, name, editable = false }) {
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
      className="value"
      onClick={function (e) {
        setUpdate(true);
      }}
    >
      <Content value={value} setUpdate={setUpdate} />
    </span>
  );
}

function Leaf({ name, path, value, level, onChange, editable }) {
  return (
    <>
      <Indent index={level + 1} />
      <span className="leaf">
        <Etiquette
          value={name}
          onChange={onChange}
          path={path}
          name={name}
          editable={editable}
        >{`${name} :`}</Etiquette>
        <Value
          value={value}
          onChange={onChange}
          path={path}
          name={name}
          editable={editable}
        />
      </span>
    </>
  );
}

export default Leaf;
