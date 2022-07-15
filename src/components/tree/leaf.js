import { useCallback, useState, useEffect, useRef } from "react";
import Indent from "./indent";

function UpdateLeaf({ value: vfp, setUpdate, onChange, path }) {
  const [value, setValue] = useState(vfp);
  const ref = useRef();

  useEffect(
    function () {
      function onClick(e) {
        const { current } = ref;
        if (!current.contains(e.target)) {
          setUpdate(false);
          onChange(path, value);
        }
      }

      document.addEventListener("mousedown", onClick);

      return () => {
        document.removeEventListener("mousedown", onClick);
      };
    },
    [setUpdate, ref, onChange, path, value]
  );

  const onKeyDown = useCallback(
    function (e) {
      if (e.key === "Enter") {
        setUpdate(false);
        onChange(path, value);
      }
    },
    [setUpdate, onChange, path, value]
  );

  return (
    <input
      type="text"
      value={value || ""}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      ref={ref}
      onKeyDown={onKeyDown}
      onChange={function (e) {
        e.stopPropagation();
        setValue(e.target.value);
      }}
    ></input>
  );
}

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

function DisplayValue({ value, setUpdate }) {
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

function Etiquette({ name }) {
  return <span>{`${name} :`}</span>;
}

function Leaf({ name, path, value, level, onChange, editable }) {
  const [update, setUpdate] = useState(false);

  return (
    <>
      <Indent index={level + 1} />
      <span className="leaf">
        <Etiquette name={name} />
        {update && editable ? (
          <UpdateLeaf
            value={value}
            setUpdate={setUpdate}
            onChange={onChange}
            path={path}
          />
        ) : (
          <DisplayValue value={value} setUpdate={setUpdate} />
        )}
      </span>
    </>
  );
}

export default Leaf;
