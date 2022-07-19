import { useCallback, useState, useEffect } from "react";
import classnames from "classnames";
import Entry from "./entry";
import { TYPES } from "./etiquette";
import "./tree.scss";

function empty(args) {
  console.log(args);
}

function isDisponibleName(entry, name) {
  return Object.keys(entry).reduce(function (status, current) {
    return status && current !== name;
  }, true);
}

function updateEntry(entry, { name, value, nameOrValue }) {
  if (nameOrValue === TYPES.name) {
    if (isDisponibleName(entry, value)) {
      const next = { ...entry };
      next[value] = next[name];
      delete next[name];
      return next;
    }
  }
  if (nameOrValue === TYPES.value) {
    // TODO
  }
  return entry;
}

function crawl(entry, { paths, name, value, nameOrValue }) {
  const [current, ...rest] = paths;

  if (current) {
    const reg = current.match(/(.*)\[([^)]+)\]/s);
    // array element
    if (reg) {
      const subName = reg[1];
      const index = reg[2];

      if (Array.isArray(entry)) {
        const next = [...entry];
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

    const subEntry = entry[current];
    // array node
    if (Array.isArray(subEntry)) {
      // change array name
      // TODO valider le choix

      const next = { ...entry, [value]: subEntry };
      delete next[current];
      return updateEntry(next, { name, value, nameOrValue });
    }
    // node
    if (typeof subEntry === "object") {
      if (paths.length === 1) {
        return updateEntry(entry, { name, value, nameOrValue });
      }
      return {
        ...entry,
        [current]: crawl(subEntry, { paths: rest, name, value, nameOrValue }),
      };
    }
  }
  // leaf
  return updateEntry(entry, { name, value, nameOrValue });
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
      const next = updateValue(clone, { path, name, value, nameOrValue });
      setClone(next);
    },
    [clone]
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
