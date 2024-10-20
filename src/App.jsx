import './styles/App.scss';
import $ from 'jquery';
import { useState, useEffect, useRef } from 'react';

const keys = [
  'Q', 'W', 'E',
  'A', 'S', 'D',
  'Y', 'X', 'C'
];

const toggleClass = (elementId, addClass, removeClass) => {
  $(`#${elementId}`).addClass(addClass);
  $(`#${elementId}`).removeClass(removeClass);
}

const App = () => {
  const [text, setText] = useState('');
  const timeoutRef = useRef(null);

  const handleClick = (event) => {
    const drumPadId = event.target.id;
    const audioElement = event.target.querySelector('audio');

    setText(drumPadId);
    audioElement.play();
    toggleClass(drumPadId, 'active', 'gray');

    if (timeoutRef) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      toggleClass(drumPadId, 'gray', 'active')
    }, 100);
  }
  
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    
    if (keys.includes(key)) {
      const audioElement = $(`#${key}`)[0];
      const drumPadId = audioElement.parentElement.id;
      
      setText(drumPadId);
      audioElement.play();
      toggleClass(drumPadId, 'active', 'gray');
    }
  }

  const handleKeyUp = (event) => {
    const key = event.key.toUpperCase();
    
    if (keys.includes(key)) {
      const audioElement = $(`#${key}`)[0];
      const drumPadId = audioElement.parentElement.id;
      
      toggleClass(drumPadId, 'gray', 'active');
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div id='drum-machine'>
      <h1>Drum Machine</h1>
      <div id='display' className="gray">{text}</div>
      <div className='drum-pads'>
        <div className='drum-pad gray' id='Heater-1' onClick={handleClick}>
          {keys[0]}
          <audio id='Q' src='https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'></audio>
        </div>
        <div className='drum-pad gray' id='Heater-2' onClick={handleClick}>
          {keys[1]}
          <audio id='W' src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3'></audio>
        </div>
        <div className='drum-pad gray' id='Heater-3' onClick={handleClick}>
          {keys[2]}
          <audio id='E' src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3'></audio>
        </div>
        <div className='drum-pad gray' id='Heater-4' onClick={handleClick}>
          {keys[3]}
          <audio id='A' src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3'></audio>
        </div>
        <div className='drum-pad gray' id='Clap' onClick={handleClick}>
          {keys[4]}
          <audio id='S' src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3'></audio>
        </div>
        <div className='drum-pad gray' id='Open-HH' onClick={handleClick}>
          {keys[5]}
          <audio id='D' src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3'></audio>
        </div>
        <div className='drum-pad gray' id="Kick-n-Hat" onClick={handleClick}>
          {keys[6]}
          <audio id='Y' src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3'></audio>
        </div>
        <div className='drum-pad gray' id='Kick' onClick={handleClick}>
          {keys[7]}
          <audio id='X' src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3'></audio>
        </div>
        <div className='drum-pad gray' id='Closed-HH' onClick={handleClick}>
          {keys[8]}
          <audio id='C' src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3'></audio>
        </div>
      </div>
      <p>Coded by<a href='https://www.linkedin.com/in/ing-huyle' target='_blank'>ing.huyle</a><br/>
        Designed by freeCodeCamp
      </p>
    </div>
  )
}

export default App;