import classnames from "classnames";
import { useCallback, useState } from "react";
import Entry from "./entry";
import Indent from "./indent";
import Toggle from "./toggle";

function Node({ entity, name, level, path }) {
  const [expended, setExpended] = useState(false);
  const toggle = useCallback(
    function () {
      setExpended(!expended);
    },
    [expended]
  );

  const content = Object.entries(entity).map(function ([name, entry], i) {
    return (
      <li key={i}>
        <Entry
          value={entry}
          name={name}
          level={level}
          expended={expended}
          path={path}
        />
      </li>
    );
  });

  return (
    <>
      <div className="tree-label">
        <Indent index={level} />
        <Toggle expended={expended} toggle={toggle} />
        {name}
      </div>
      <ul className={classnames("clear-list", "tree-content", { expended })}>
        {content}
      </ul>
    </>
  );
}

export default Node;
