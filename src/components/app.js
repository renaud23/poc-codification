import { useEffect, useState, useCallback } from "react";
// import useStoreIndex from "../js/store-tools/use-store-index";

export function fetchNafrev2() {
  return fetch("json/naf-rev2.json").then((r) => r.json());
}

// if (entities && db && idbVersion && store) {
//   const [startT, abort_] = createAppendTask(store, idbVersion, log);
//   abort = abort_;
//   clearStoreData(db);
//   await startT(entities);
//   post(store.name, entities.length);
// }

function App({ storeInfo: siProps }) {
  // const db = useStoreIndex(siProps, "1");
  const [content, setContent] = useState(JSON.stringify(siProps, null, 2));
  const [storeInfo, setStoreInfo] = useState(siProps);

  useEffect(function () {
    (async function () {})();
  }, []);

  const onChangeContent = useCallback(function (e) {
    setContent(e.target.value);
    try {
      setStoreInfo(JSON.parse(e.target.value));
    } catch (e) {}
  }, []);

  const changeFile = useCallback(function (input) {
    const files = input.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (res) => {
        setContent(res.target.result); // Print file contents
      };
      reader.onerror = (err) => console.log(err);

      reader.readAsText(file);
    }
  }, []);

  console.log(storeInfo);

  return (
    <div>
      <h1>Hackaton codification</h1>
      <h2>Editer la configation</h2>
      <h2>Charger les données</h2>
      <h2>Créer l'index</h2>
      <h2>Effectuer une recherche</h2>
      <input type="file" onChange={changeFile} accept=".json" />
      <button onClick={() => null}>Load!</button>
      <div className="store-editor" style={{ width: "600px" }}>
        <textarea
          rows="30"
          cols="63"
          value={content}
          onChange={onChangeContent}
        ></textarea>
      </div>
    </div>
  );
}

export default App;

// function showSelectedFile(){
//   selectedfile.value= document.getElementById("inputfile").value;
// }
// document.getElementById('inputfile')
//       .addEventListener('change', function() {
//       var fr=new FileReader();
//       fr.onload=function(){
//           document.getElementById('output')
//                   .textContent=fr.result;
//       }
//       fr.readAsText(this.files[0]);
//       })
