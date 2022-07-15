import { useCallback, useState } from "react";
import classnames from "classnames";
import Entry from "./entry";
import Indent from "./indent";
import Toggle from "./toggle";

function ArrayNode({
  array,
  name,
  level,
  path,
  onChange,
  editable,
  expended: ex,
}) {
  const [expended, setExpended] = useState(ex);
  const toggle = useCallback(
    function () {
      setExpended(!expended);
    },
    [expended]
  );

  const content = array.map(function (entry, i) {
    return (
      <li key={i}>
        <Entry
          value={entry}
          name={i}
          level={level}
          path={`${path}.${name}[${i}]`}
          onChange={onChange}
          editable={editable}
        />
      </li>
    );
  });

  if (!expended) {
    return (
      <div className="tree-label">
        <Indent index={level} />
        <Toggle expended={false} toggle={toggle} />
        {`Array[${name}]`}
      </div>
    );
  }

  return (
    <>
      <div className="tree-label">
        <Indent index={level} />
        <Toggle expended={expended} toggle={toggle} />
        {`Array[${name}]`}
      </div>
      <ul className={classnames("clear-list", "tree-content", { expended })}>
        {content}
      </ul>
    </>
  );
}

export default ArrayNode;
