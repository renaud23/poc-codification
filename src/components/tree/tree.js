import { useCallback, useState, useEffect } from "react";
import classnames from "classnames";
import Entry from "./entry";
import "./tree.scss";

function empty(args) {
  console.log(args);
}

function crawl(entry, { paths, name, value, nameOrValue }) {
  const [current, ...rest] = paths;
  // console.log({ entry, current });
  if (current) {
    const reg = current.match(/(.*)\[([^)]+)\]/s);
    if (reg) {
      const subName = reg[1];
      const index = reg[2];

      if (Array.isArray(entry)) {
        const next = [...entry];
        console.log("ici", name, value);
        next["root" ? index : name] = crawl(
          subName === "root" ? entry[index] : entry[subName][index],
          {
            paths: rest,
            name,
            value,
            nameOrValue,
          }
        );

        return next;
      } else {
        const next = [...entry[subName]];
        next[index] = crawl(entry[subName][index], {
          paths: rest,
          name,
          value,
          nameOrValue,
        });

        return { ...entry, [subName]: next };
      }
    }

    //
    const subEntry = entry[current];

    if (Array.isArray(subEntry)) {
      // change array name
      const next = { ...entry, [value]: subEntry };
      delete next[current];
      return next;
    }

    if (typeof subEntry === "object") {
      return {
        ...entry,
        [current]: crawl(subEntry, { paths: rest, name, value, nameOrValue }),
      };
    }
  }

  return entry;
  // if (rest.length) {
  //   return crawl(entry, { paths: rest, name, value, nameOrValue });
  // }
}

function updateValue(entry, { path, name, value, nameOrValue }) {
  const paths = path.split(".");
  return crawl(entry, { paths, name, value, nameOrValue });
}

function Tree({
  entities,
  onChange = empty,
  editable = false,
  expended = false,
}) {
  const [clone, setClone] = useState(entities);

  useEffect(
    function () {
      setClone(entities);
    },
    [entities]
  );

  const handleChange = useCallback(
    function ({ path, name, value, nameOrValue }) {
      // onChange({ path, name, value, nameOrValue });
      const next = updateValue(entities, { path, name, value, nameOrValue });
      console.log({ next });
    },
    [entities]
  );

  return (
    <div className={classnames("tree")}>
      <Entry
        name="root"
        value={clone}
        level={0}
        expended={expended}
        onChange={handleChange}
        editable={editable}
      />
    </div>
  );
}

export default Tree;
