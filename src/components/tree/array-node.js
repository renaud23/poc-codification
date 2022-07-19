import { useCallback, useState } from "react";
import classnames from "classnames";
import Entry from "./entry";
import Indent from "./indent";
import Toggle from "./toggle";
import Etiquette, { TYPES } from "./etiquette";

function ArrayNode({
  array,
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
          arrayEntry={true}
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
          path={`${path}.${name}`}
          value={name}
          onChange={onChange}
          editable={editable && !arrayEntry}
          nameOrValue={TYPES.name}
        >{`Array[${name}]`}</Etiquette>
      </div>
      <ul className={classnames("clear-list", "tree-content", { expended })}>
        {expended ? content : null}
      </ul>
    </>
  );
}

export default ArrayNode;
