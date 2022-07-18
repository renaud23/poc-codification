import classnames from "classnames";
import { useCallback, useState } from "react";
import Entry from "./entry";
import Indent from "./indent";
import Toggle from "./toggle";
import Etiquette from "./etiquette";

function Node({
  entity,
  name,
  level,
  path,
  onChange,
  editable,
  expended: ex,
  arrayEntry,
}) {
  const [expended, setExpended] = useState(ex);
  const toggle = useCallback(
    function () {
      setExpended(!expended);
    },
    [expended]
  );
  //
  const content = Object.entries(entity).map(function ([name, entry], i) {
    return (
      <li key={i}>
        <Entry
          value={entry}
          name={name}
          level={level}
          path={Array.isArray(entry) ? path : `${path}.${name}`}
          onChange={onChange}
          editable={editable}
        />
      </li>
    );
  });

  return (
    <>
      <div className="tree-label">
        <Indent index={level} />
        <Toggle expended={expended} toggle={toggle} />
        <Etiquette
          name={name}
          path={`${path}`}
          value={name}
          onChange={onChange}
          editable={editable && !arrayEntry}
        >
          {name}
        </Etiquette>
      </div>
      <ul className={classnames("clear-list", "tree-content", { expended })}>
        {expended ? content : null}
      </ul>
    </>
  );
}

export default Node;
