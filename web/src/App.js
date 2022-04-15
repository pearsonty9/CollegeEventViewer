import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Event from './screens/Event';
import CreateEvent from './screens/CreateEvent';
import RSO from './screens/RSO';
import CreateRSO from './screens/CreateRSO';
import SearchRSO from './screens/SearchRSO';
import CreateRSOEvent from './screens/CreateRSOEvent';
import UnapprovedEvents from './screens/UnapprovedEvents';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/createevent" element={<CreateEvent />} />
          <Route path="/rso" element={<RSO />} />
          <Route path="/createrso" element={<CreateRSO />} />
          <Route path="/searchrso" element={<SearchRSO />} />
          <Route path="/creatersoevent" element={<CreateRSOEvent />} />
          <Route path="/approve" element={<UnapprovedEvents/>} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
