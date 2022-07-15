import Node from "./node";
import Leaf from "./leaf";
import ArrayNode from "./array-node";

function Entry({ name, value, level, expended, path }) {
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
        path={path}
      />
    );
  }
  if (typeof value === "object") {
    return (
      <Node
        entity={value}
        name={name}
        level={level + 1}
        expended={expended}
        path={`${path}`}
      />
    );
  }

  return <Leaf level={level} name={name} path={path} value={value} />;
}

export default Entry;
