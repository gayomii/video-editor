import React, { useReducer } from 'react';

import 'video-react/dist/video-react.css';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import VideoPlaceholder from './components/VideoPlaceholder';
import VideoPlayer from './components/VideoPlayer';
import MultiRangeSlider from './components/MultiRangeSlider';

import Button from '@mui/material/Button';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FILE':
      return action.newItem;
    case 'DELETE_FILE':
      return null;
    default:
      return state;
  }
};

function App() {
  const [videoFile, dispatch] = useReducer(reducer, null);

  return (
    <div className="App">
      <Header></Header>
      <main>
        {!videoFile ? (
          <VideoPlaceholder
            _onChange={file => {
              dispatch({ type: 'ADD_FILE', newItem: file });
            }}
          />
        ) : (
          // TODO: 컴포넌트 분리
          <>
            <Button
              onClick={() => dispatch({ type: 'DELETE_FILE' })}
              variant="contained"
            >
              Delete
            </Button>
            <VideoPlayer videoFile={videoFile} />
            <MultiRangeSlider
              min={0}
              max={100}
              onChange={() => console.log('onChange')}
            />
          </>
        )}
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
