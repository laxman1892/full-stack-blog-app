import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { UserContextProvider } from './UserContext';

function App() {
  return (
    <UserContextProvider>
      <main>
      <Header /> 
      <Outlet />
    </main>
    </UserContextProvider>
  );
}

export default App;
