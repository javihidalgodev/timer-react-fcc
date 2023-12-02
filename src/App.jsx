/* eslint-disable react/prop-types */
// import { useState } from 'react'
import './App.css'
import Logo from './components/Logo' 
import Timer from './components/Timer'
import Clock from './components/Clock'
import Controls from './components/Controls'
import { useEffect, useState } from 'react'

function App() {

  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [running, setRunning] = useState(false)
  const [runInterval, setRunInterval] = useState(null)
  const [inSession, setInSession] = useState(true)

  const decrement = (value) => {
    if(value === 'break') {
      if(breakLength >= 2) {
        const newBreakLength = breakLength - 1
        setBreakLength(newBreakLength)
      }
    } else {
      if(sessionLength >= 2) {
        const newSessionLength = sessionLength - 1
        setSessionLength(newSessionLength)
      }
    }
  };
  
  const increment = value => {
    if(value === 'break') {
      if(breakLength <= 59) {
        const newBreakLength = breakLength + 1
        setBreakLength(newBreakLength)
      }
    } else {
      if(sessionLength <= 59) {
        const newSessionLength = sessionLength + 1
        setSessionLength(newSessionLength)
      }
    }
  };

  const reset = () => {
    document.querySelector('#beep').pause()
    document.querySelector('#beep').currentTime = 0
    setRunning(false)
    clearInterval(runInterval)
    setInSession(true)
    setBreakLength(5)
    setSessionLength(25)
    document.querySelector('#time-left').textContent = '25:00'
    document.querySelectorAll('.arrow-btn').forEach(btn => {
      btn.removeAttribute('disabled')})
  }

  const clock = (value) => {
    const timeLeft = document.querySelector('#time-left')
    const [minutes, seconds] = value.split(':')
    
    let time = (parseInt(minutes * 60) + parseInt(seconds))-1
    if(time >= 0) {
      const newMinutes = Math.floor(time / 60)
      const newSeconds = time % 60
      timeLeft.textContent = `${newMinutes >= 10 ? newMinutes : '0' + newMinutes}:${newSeconds >= 10 ? newSeconds : '0' + newSeconds}`
    } else {
      document.querySelector('#beep').play()
      setInSession(prevInSession => !prevInSession)
    }
  }

  useEffect(() => {
    const timeLeft = document.querySelector('#time-left')
    inSession
      ? timeLeft.textContent = (
        sessionLength >= 10 ? sessionLength + ':00' : '0' + sessionLength + ':00'
        )
      : timeLeft.textContent = (
        breakLength >= 10 ? breakLength + ':00' : '0' + breakLength + ':00'
      )
  }, [inSession])

  useEffect(() => {
    const timeLeft = document.querySelector('#time-left')
    inSession && (
      timeLeft.textContent = (
        sessionLength >= 10 ? sessionLength + ':00' : '0' + sessionLength + ':00'
        )
    )
  }, [sessionLength])

  useEffect(() => {
    const timeLeft = document.querySelector('#time-left')
    !inSession && (
      timeLeft.textContent = (
        breakLength >= 10 ? breakLength + ':00' : '0' + breakLength + ':00'
      )
    )
  }, [breakLength])



  const playPause = () => {
    if(running) {
      document.querySelectorAll('.arrow-btn').forEach(btn => {
        btn.removeAttribute('disabled')
      })
      console.log('parado')
      clearInterval(runInterval)
    } else {
      document.querySelectorAll('.arrow-btn').forEach(btn => {
        btn.setAttribute('disabled', '')
      })
      
      let minutes = document.querySelector('#time-left')
      
      const run = setInterval(() => clock(minutes.textContent), 1000)
      setRunInterval(run)
    }
    setRunning(!running)
  }

  return (
    <>
      <Logo />
      <div className="main-title">
        <h1>25+5 clock</h1>
      </div>
      <div className="timers">
        <Timer id='break' title='Break Length' value={breakLength} decrement={decrement} increment={increment} />
        <Timer id='session' title='Session Length' value={sessionLength} decrement={decrement} increment={increment} />
      </div>
      <Clock value={inSession ? sessionLength : breakLength} inSession={inSession} />
      <Controls reset={reset} playPause={playPause} />
      <audio id='beep' preload='auto' src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </>
  )
}

export default App
