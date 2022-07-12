import { useEffect, useState } from "react";
import EditConfig from "./edit-config";
import DataLoad from "./data-load";
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
  const [storeInfo, setStoreInfo] = useState(siProps);

  useEffect(function () {
    (async function () {})();
  }, []);

  console.log(storeInfo);

  return (
    <div>
      <h1>Hackaton codification</h1>
      <EditConfig storeInfo={storeInfo} setStoreInfo={setStoreInfo} />
      <h2>Charger les données</h2>
      <DataLoad />
      <h2>Créer l'index</h2>
      <h2>Effectuer une recherche</h2>

      <button onClick={() => null}>Load!</button>
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
