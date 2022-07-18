import { useCallback, useState, useEffect } from "react";
import classnames from "classnames";
import Entry from "./entry";
import "./tree.scss";

function empty(...args) {
  console.log(args);
}

function Tree({
  entities,
  onChange = empty,
  editable = false,
  expended = false,
}) {
  const [clone, setClone] = useState(entities);

  useEffect(
    function () {
      setClone(entities);
    },
    [entities]
  );

  const handleChange = useCallback(
    function ({ path, name, value, etiquette }) {
      onChange(path, value);
    },
    [onChange]
  );

  return (
    <div className={classnames("tree")}>
      <Entry
        name="root"
        path=""
        value={clone}
        level={0}
        expended={expended}
        onChange={handleChange}
        editable={editable}
      />
    </div>
  );
}

export default Tree;
