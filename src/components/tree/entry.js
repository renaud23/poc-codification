import Indent from "./indent";
import Node from "./node";
import ArrayNode from "./array-node";

function Entry({ name, value, level, expended }) {
  if (!expended) {
    return null;
  }
  if (Array.isArray(value)) {
    return (
      <ArrayNode
        array={value}
        name={name}
        level={level + 1}
        expended={expended}
      />
    );
  }
  if (typeof value === "object") {
    return (
      <Node entity={value} name={name} level={level + 1} expended={expended} />
    );
  }

  return (
    <>
      <Indent index={level + 1} />
      <span>{`${name} : ${value}`}</span>
    </>
  );
}

export default Entry;
