import { useCallback, useState } from "react";
import classnames from "classnames";
import Entry from "./entry";
import Indent from "./indent";
import Toggle from "./toggle";

function ArrayNode({ array, name, level }) {
  const [expended, setExpended] = useState(false);
  const toggle = useCallback(
    function () {
      setExpended(!expended);
    },
    [expended]
  );

  const content = array.map(function (entry, i) {
    return (
      <li key={i}>
        <Entry value={entry} name={i} level={level} expended={expended} />
      </li>
    );
  });

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
