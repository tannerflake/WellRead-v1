import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ShelfProvider } from './context/ShelfContext';
import { WantToReadProvider } from './context/WantToReadContext';

function App() {
  return (
    <div>
      <Navbar />
      <main className="container pt-5">
        <ShelfProvider>
          <WantToReadProvider>
            <Outlet />
          </WantToReadProvider>
        </ShelfProvider>
      </main>
    </div>
  );
}

export default App;