import '../styles/Clock.css'

function Clock ({ value, inSession }) {
  const time = value + ':00'
  return (
    <div className='clock-container'>
      <h2 id='timer-label'>
        {
          inSession ? 'Session' : 'Break'
        }
      </h2>
      <div id='time-left'>{value}:00</div>
    </div>
  )
}

export default Clock