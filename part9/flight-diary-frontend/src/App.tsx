import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import diaryService from "./services/diaryService";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(entries => setDiaries(entries));
  }, []);

  return (
    <div>
      <h2>Diary Entries</h2>
      {diaries.map(entry => <div key={entry.id}>
        <h3>{entry.date}</h3>
        <p>visibility: {entry.visibility}
        </p>
        <p>
          weather: {entry.weather}
        </p>
      </div>)}
    </div>
  );
}

export default App;
