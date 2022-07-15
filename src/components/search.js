import { useMemo, useState, useCallback } from "react";
// import classnames from "classnames";
import createSearching from "../js/suggester-workers/searching/create-searching";
import Tree from "./tree";

// function Toggle({ expended, toggle }) {
//   const what = expended ? "-" : "+";
//   return (
//     <span className="toggle" onClick={toggle}>
//       {`[${what}]`}
//     </span>
//   );
// }

// function Indent({ index }) {
//   if (index) {
//     return new Array(index).fill(null).map(function (_, i) {
//       return <span className="indent" key={i}></span>;
//     });
//   }

//   return null;
// }

// function Entry({ name, value, level, expended }) {
//   if (!expended) {
//     return null;
//   }
//   if (Array.isArray(value)) {
//     return (
//       <ArrayNode
//         array={value}
//         name={name}
//         level={level + 1}
//         expended={expended}
//       />
//     );
//   }
//   if (typeof value === "object") {
//     return (
//       <Node entity={value} name={name} level={level + 1} expended={expended} />
//     );
//   }

//   return (
//     <>
//       <Indent index={level + 1} />
//       <span>{`${name} : ${value}`}</span>
//     </>
//   );
// }

//
// function ArrayNode({ array, name, level }) {
//   const [expended, setExpended] = useState(false);
//   const toggle = useCallback(
//     function () {
//       setExpended(!expended);
//     },
//     [expended]
//   );

//   const content = array.map(function (entry, i) {
//     return (
//       <li key={i}>
//         <Entry value={entry} name={i} level={level} expended={expended} />
//       </li>
//     );
//   });

//   return (
//     <>
//       <div className="tree-label">
//         <Indent index={level} />
//         <Toggle expended={expended} toggle={toggle} />
//         {`Array[${name}]`}
//       </div>
//       <ul className={classnames("clear-list", "tree-content", { expended })}>
//         {content}
//       </ul>
//     </>
//   );
// }

// function Node({ entity, name, level }) {
//   const [expended, setExpended] = useState(false);
//   const toggle = useCallback(
//     function () {
//       setExpended(!expended);
//     },
//     [expended]
//   );

//   const content = Object.entries(entity).map(function ([name, entry], i) {
//     return (
//       <li key={i}>
//         <Entry value={entry} name={name} level={level} expended={expended} />
//       </li>
//     );
//   });

//   return (
//     <>
//       <div className="tree-label">
//         <Indent index={level} />
//         <Toggle expended={expended} toggle={toggle} />
//         {name}
//       </div>
//       <ul className={classnames("clear-list", "tree-content", { expended })}>
//         {content}
//       </ul>
//     </>
//   );
// }

// function Tree({ entities }) {
//   const content = entities.map(function (entity, i) {
//     return <Node entity={entity} name={i} key={i} level={0} />;
//   });

//   return <ul className={classnames("tree", "clear-list")}>{content}</ul>;
// }

/* */

function Search({ storeInfo, version }) {
  const [search, setSearch] = useState("");
  const [entities, setEntities] = useState([]);

  const searching = useMemo(
    function () {
      if (storeInfo) {
        const { name } = storeInfo;
        return createSearching(name, version);
      }
      return undefined;
    },
    [storeInfo, version]
  );
  const onChange = useCallback(function (e) {
    setSearch(e.target.value);
  }, []);
  const onSearch = useCallback(
    function () {
      (async function () {
        if (search.length && searching) {
          const { results } = await searching(search);
          setEntities(results);
        }
      })();
    },
    [searching, search]
  );

  return (
    <>
      <Tree entities={entities} />
      <input type="text" value={search} onChange={onChange} />
      <button onClick={onSearch}>Search!</button>
    </>
  );
}

export default Search;
