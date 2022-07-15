import Indent from "./indent";

function Leaf({ name, path, value, level }) {
  console.log({ path: `${path}.name` });
  return (
    <>
      <Indent index={level + 1} />
      <span>{`${name} : ${value}`}</span>
    </>
  );
}

export default Leaf;
