import './styles/App.scss';
import $ from 'jquery';
import { useState, useEffect, useRef } from 'react';

const keys = [
  'q', 'w', 'e',
  'a', 's', 'd',
  'y', 'x', 'c'
];

const App = () => {
  const [text, setText] = useState('');
  const timeoutRef = useRef(null);

  const handleClick = (event) => {
    setText(event.target.id);

    const audio = new Audio();
    audio.src = event.target.querySelector('audio').src;
    audio.play();

    $(`#${event.target.id}`).removeClass('gray');
    $(`#${event.target.id}`).addClass('active');

    if (timeoutRef) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      $(`#${event.target.id}`).addClass('gray');
      $(`#${event.target.id}`).removeClass('active');
    }, 100);
  }
  
  const handleKeyDown = (event) => {
    if (keys.includes(event.key)) {
      const targetAudio = $(`#${event.key.toUpperCase()}`)[0];
      const parent = targetAudio.parentElement.id;
      setText(parent);

      const audio = new Audio();
      audio.src = targetAudio.src;
      audio.play();

      $(`#${parent}`).removeClass('gray');
      $(`#${parent}`).addClass('active');
    }
  }

  const handleKeyUp = (event) => {
    if (keys.includes(event.key)) {
      const targetAudio = $(`#${event.key.toUpperCase()}`)[0];
      const parent = targetAudio.parentElement.id;
      
      $(`#${parent}`).addClass('gray');
      $(`#${parent}`).removeClass('active');
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
        <div className='drum-pad gray' id='Heater-1' onClick={handleClick}>Q
          <audio
            className='clip'
            id='Q'
            src='https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'>
          </audio>
        </div>
        <div className='drum-pad gray' id='Heater-2' onClick={handleClick}>W
          <audio
            className='clip'
            id='W'
            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3'>
          </audio>
        </div>
        <div className='drum-pad gray' id='Heater-3' onClick={handleClick}>E
          <audio
            className='clip'
            id='E'
            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3'>
          </audio>
        </div>
        <div className='drum-pad gray' id='Heater-4' onClick={handleClick}>A
          <audio
            className='clip'
            id='A'
            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3'>
          </audio>
        </div>
        <div className='drum-pad gray' id='Clap' onClick={handleClick}>S
          <audio
            className='clip'
            id='S'
            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3'>
          </audio>
        </div>
        <div className='drum-pad gray' id='Open-HH' onClick={handleClick}>D
          <audio
            className='clip'
            id='D'
            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3'>
          </audio>
        </div>
        <div className='drum-pad gray' id="Kick-n-Hat" onClick={handleClick}>Y
          <audio
            className='clip'
            id='Y'
            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3'>
          </audio>
        </div>
        <div className='drum-pad gray' id='Kick' onClick={handleClick}>X
          <audio
            className='clip'
            id='X'
            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3'>
          </audio>
        </div>
        <div className='drum-pad gray' id='Closed-HH' onClick={handleClick}>C
          <audio
            className='clip'
            id='C'
            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3'>
          </audio>
        </div>
      </div>
    </div>
  )
}

export default App;