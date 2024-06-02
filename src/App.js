import './App.css';
import Admin0 from './component/Admin0';
import Connecter from './component/Connecter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashbord1 from './component/Dashbord1';
import Dashbord2 from './component/Dashbord2';
import AMSpro from './component/AMSpro';
import Departement from './component/Departement';
import Filiere from './component/Filiere';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/filiere" element={<Filiere/>} />
          <Route path="/departement" element={<Departement/>} />
          <Route path="/aMSpro" element={<AMSpro/>} />
          <Route path="/dashbord2" element={<Dashbord2/>} />
          <Route path="/dashbord1" element={<Dashbord1/>} />
          <Route path="/connecter" element={<Connecter />} />
          <Route path="/" element={<Admin0 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
