import React, { useReducer } from 'react';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import VideoEditorMain from './components/VideoEditorMain';

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

export const VideoFileContext = React.createContext();
export const VideoFileDispatchContext = React.createContext();

function App() {
  const [videoFile, dispatch] = useReducer(reducer, null);

  const addFile = file => {
    dispatch({ type: 'ADD_FILE', newItem: file });
  };

  const deleteFile = () => {
    dispatch({ type: 'DELETE_FILE' });
  };

  return (
    <VideoFileContext.Provider value={videoFile}>
      <VideoFileDispatchContext.Provider value={{ addFile, deleteFile }}>
        <div className="App">
          <Header></Header>
          <VideoEditorMain></VideoEditorMain>
          <Footer></Footer>
        </div>
      </VideoFileDispatchContext.Provider>
    </VideoFileContext.Provider>
  );
}

export default App;
