import './App.css';
import {HashRouter, Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import RenderTreeMapPage from './pages/RenderTreeMapPage';
import PlayersPositions from './pages/PositionPage';
import NotFoundPage from './pages/PageNotFound';
import { Footer } from './Footer';


function App() {
  return (
    <HashRouter>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/Countries&Clubs" element={<RenderTreeMapPage />}></Route>
            <Route path="/Positions" element={<PlayersPositions />}></Route>
            <Route path='/404' element={<NotFoundPage/>} />
            <Route path='*' element={<Navigate replace to='/404'/>} />
            {/*<Route path="*" element={<NotFoundPage />}></Route>*/}
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
