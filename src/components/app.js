import { useEffect, useState } from "react";
import EditConfig from "./edit-config";
import DataLoad from "./data-load";
import CreateIndex from "./create-index";
import "./app.scss";

export function fetchNafrev2() {
  return fetch("json/naf-rev2.json").then((r) => r.json());
}

function App({ storeInfo: siProps }) {
  const [storeInfo, setStoreInfo] = useState(siProps);
  const [data, setData] = useState(undefined);

  useEffect(function () {
    (async function () {})();
  }, []);

  return (
    <div className="poc-codification">
      <h1>Hackaton codification</h1>
      <EditConfig storeInfo={storeInfo} setStoreInfo={setStoreInfo} />
      <h2>Charger les données</h2>
      <DataLoad setData={setData} />
      <h2>Créer l'index</h2>
      <CreateIndex data={data} storeInfo={storeInfo} />
      <h2>Effectuer une recherche</h2>
    </div>
  );
}

export default App;
