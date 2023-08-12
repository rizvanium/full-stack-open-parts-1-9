import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({label, value}) => {
  return <tr><td>{label}</td><td>{value}</td></tr>
} 

const Statistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad;
  const average = total && (good - bad) / total;
  const positive = total && good / total * 100;

  return (
    <>
      <h1>statistics</h1>
      { good || neutral || bad ? 
        <table>
          <tbody>
            <StatisticLine label="good" value={good}/>
            <StatisticLine label="neutral" value={neutral}/>
            <StatisticLine label="bad" value={bad}/>
            <StatisticLine label="all" value={total}/>
            <StatisticLine label="average" value={average}/>
            <StatisticLine label="positive" value={`${positive} %`}/>
          </tbody>
        </table> : 
        <p>No feedback given</p> 
    }
    </>
  )
}

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