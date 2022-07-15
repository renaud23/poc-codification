import classnames from "classnames";
import Entry from "./entry";

function Tree({ entities }) {
  return (
    <div className={classnames("tree")}>
      <Entry name="" path="" value={entities} level={0} expended={true} />
    </div>
  );
}

export default Tree;
