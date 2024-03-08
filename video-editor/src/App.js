import React, { useReducer } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import 'video-react/dist/video-react.css';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import VideoPlaceholder from './components/VideoPlaceholder';
import VideoPlayer from './components/VideoPlayer';
import MultiRangeSlider from './components/MultiRangeSlider';
import CustomButton from './components/CustomButton';

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
        <div className="main-header-container">
          <h2>Video Edit</h2>
          {!videoFile ? (
            ''
          ) : (
            <CustomButton
              _onClick={() => dispatch({ type: 'DELETE_FILE' })}
              type={'contained'}
              buttonName="Delete"
              startIcon={<DeleteIcon />}
            />
          )}
        </div>
        {!videoFile ? (
          <VideoPlaceholder
            _onChange={file => {
              dispatch({ type: 'ADD_FILE', newItem: file });
            }}
          />
        ) : (
          // TODO: 컴포넌트 분리
          <>
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
