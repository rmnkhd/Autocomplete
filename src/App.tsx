import './App.css';
import { useState } from "react";
import Autocomplete from "./components/Autocomnplete";

function App() {
  const [selectedHobby, setSelectedHobby] = useState<number | null>(null);

  const hobbies = [
    { id: 0, name: 'Education' },
    { id: 1, name: 'Yeeeah, science!' },
    { id: 2, name: 'Art' },
    { id: 3, name: 'Sport' },
    { id: 4, name: 'Games' },
    { id: 5, name: 'Health' },
  ];


  return (
      <div className="App">
        <Autocomplete items={hobbies} value={selectedHobby} setValue={setSelectedHobby}/>
      </div>
  );
}

export default App;
