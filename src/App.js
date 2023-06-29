import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import { fetchTvShows } from './redux/data/dataSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTvShows());
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/details/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
