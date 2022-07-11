import { useEffect, useState, useRef, useCallback } from "react";
import Input from "@mui/material/Input";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import useStoreIndex from "../js/store-tools/use-store-index";
import createAppendTask from "../js/suggester-workers/append-to-index";

function fetchCommunes() {
  return fetch("json/naf-rev2.json").then((r) => r.json());
}

// if (entities && db && idbVersion && store) {
//   const [startT, abort_] = createAppendTask(store, idbVersion, log);
//   abort = abort_;
//   clearStoreData(db);
//   await startT(entities);
//   post(store.name, entities.length);
// }

function handleChange() {}

function App({ storeInfo }) {
  const db = useStoreIndex(storeInfo, "1");

  useEffect(function () {
    (async function () {
      const communes = await fetchCommunes();
    })();
  }, []);

  const changeFile = useCallback(function (input) {
    const files = input.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (res) => {
        console.log(res.target.result); // Print file contents
      };
      reader.onerror = (err) => console.log(err);

      reader.readAsText(file);
    }
  }, []);

  return (
    <div>
      <input type="file" onChange={changeFile} accept=".json" />
      <button onClick={() => null}>Load!</button>
      <div className="store-editor" style={{ width: "600px" }}>
        <Editor value={storeInfo} onChange={handleChange} />
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
