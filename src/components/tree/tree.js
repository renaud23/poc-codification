import classnames from "classnames";
import Entry from "./entry";
import "./tree.scss";

function empty(path, value) {
  console.log({ path, value });
}

function Tree({
  entities,
  onChange = empty,
  editable = false,
  expended = false,
}) {
  return (
    <div className={classnames("tree")}>
      <Entry
        name="root"
        path=""
        value={entities}
        level={0}
        expended={expended}
        onChange={onChange}
        editable={editable}
      />
    </div>
  );
}

export default Tree;
