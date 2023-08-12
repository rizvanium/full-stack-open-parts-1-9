import { useState } from 'react';
import Button from './Button';
import Statistics from './Statistics';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incValue = (setter) => () => setter(current => current + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={incValue(setGood)}/>
      <Button text="neutral" handleClick={incValue(setNeutral)}/>
      <Button text="bad" handleClick={incValue(setBad)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App