import classnames from "classnames";
import Node from "./node";

function Tree({ entities }) {
  const content = entities.map(function (entity, i) {
    return <Node entity={entity} name={i} key={i} level={0} />;
  });

  return <ul className={classnames("tree", "clear-list")}>{content}</ul>;
}

export default Tree;
