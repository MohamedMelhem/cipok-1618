import { useEffect, useState } from "react";
import type { Cipok } from "./type/cipok";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [cipo, Setcipo] = useState<Cipok[]>([]);

  const [marka, SetMarka] = useState<string>("");
  const [meret, Setmeret] = useState<string>("");

  useEffect(() => {
    async function fetchCipok() {
      try {
        const response = await fetch("http://localhost:3000/cipok");
        const data: Cipok[] = await response.json();
        Setcipo(data);
      } catch (err: any) {
        console.log("Hiba történt" + err.message);
      }
  
    }
        fetchCipok();
  }, []);

  async function handleFelhasznaloFelvetel(e) {
    e.preventDefault();
    const ujCipo = {
      marka: marka,
      meret: meret,
    };
    try {
      const response = await fetch("http://localhost:3000/cipok", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(ujCipo),
      });
      const cipok: Cipok = await response.json();
      Setcipo((elozo) => [...elozo, cipok]);
      SetMarka("");
      Setmeret("");
    } catch (err) {
      console.log("Hiba történt felvételnél:" + err.message);
    }
    console.log(ujCipo);
  }



  return (
    <>
      <h1>Cipok</h1>
      <h2>cipok listája</h2>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Márka</th>
            <th>Méret</th>
          </tr>
        </thead>
        <tbody>
          {cipo.map((user) => (
            <tr key={user.id}>
              <td>{user.marka}</td>
              <td>{user.meret}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Cipok felvétele</h2>
      <form onSubmit={handleFelhasznaloFelvetel}>
        <label htmlFor="input_nev">
          Add meg a markat: <br />
          <input
            id="input_marka"
            type="text"
            value={marka}
            onChange={(e) => SetMarka(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="input_osztaly">
          Add meg az mereted: <br />
          <input
            id="input_meret"
            type="text"
            value={meret}
            onChange={(e) => Setmeret(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Felvétel</button>
      </form>
    </>
  );
}

export default App;
