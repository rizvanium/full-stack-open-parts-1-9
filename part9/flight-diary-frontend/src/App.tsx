import { useEffect, useState } from "react";
import { DiaryEntry, Visibility, Weather } from "./types";
import diaryService from "./services/diaryService";

function App() {
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [visibility, setVisibility] = useState(Visibility.Great);
  const [weather, setWeather] = useState(Weather.Sunny);
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(entries => setDiaries(entries));
  }, []);

  const addNewEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    diaryService
      .addNew({
        date,
        weather,
        visibility,
        comment,
      })
      .then(response => {
        setDiaries([...diaries, response])
        setDate('');
        setVisibility(Visibility.Great)
        setWeather(Weather.Sunny);
        setComment('');
      });
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={addNewEntry}>
        <div>
          <label>
            date{': '}
            <input type="date" value={date} onChange={({ target }) => setDate(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            visibility{': '}
            {Object.values(Visibility).map((value) => 
              <label key={value}>
                {' '}{value}
                <input type="radio" id={value} name="visibility"  checked={value === visibility} value={value} onChange={() => setVisibility(value)} />
              </label>
            )}
          </label>
        </div>
        <div>
          <label>
            weather{': '}
            {Object.values(Weather).map((value) => 
              <label key={value}>
                {' '}{value}
                <input type="radio" id={value} name="weather" checked={value === weather} value={value} onChange={() => setWeather(value)} />
              </label>
            )}
          </label>
        </div>
        <div>
          <label>
            comment{': '}
            <input type="text" value={comment} onChange={({ target }) => setComment(target.value)}/>
          </label>
        </div>
        <button type="submit">add</button>
      </form>
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
