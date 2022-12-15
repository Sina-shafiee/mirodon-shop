import { Routes, Route } from 'react-router';
import Home from './routes/Home';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
};

export default App;