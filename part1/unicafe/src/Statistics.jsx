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

export default Statistics;