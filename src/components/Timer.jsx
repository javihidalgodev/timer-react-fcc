/* eslint-disable react/prop-types */
import '../styles/Timer.css'
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

function TimeControl ({ id, title, value, decrement, increment }) {
  return (
    <div className="time-control">
      <h3 id={id + '-label'} className="time-control__title">{title}</h3>
      <div className="time-control__controls">
        <button id={id + '-decrement'} type="button" className={'arrow-btn'} onClick={()=>{decrement(id)}}><FaArrowDown /></button>
        <span id={id + '-length'}>{value}</span>
        <button id={id + '-increment'} type="button" className={'arrow-btn'} onClick={()=>{increment(id)}}><FaArrowUp /></button>
      </div>
    </div>
  )
}

export default TimeControl