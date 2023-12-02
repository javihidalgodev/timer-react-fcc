import '../styles/Controls.css'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";


function Controls ({ reset, playPause }) {
  return (
    <div className="controls">
      <button id="start_stop" type="button" className='button' title='play/pause' onClick={playPause}>
        <FaPlay />
        <FaPause />
      </button>
      <button id="reset" type="button" className='button' title='restart' onClick={reset}>
        <HiRefresh />
      </button>
    </div>
  )
}

export default Controls