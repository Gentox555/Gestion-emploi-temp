import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import P1 from './img/P1.png';
import P2 from './img/P2.png';
class Admin0 extends Component {
  

  render() {
    return (
      <div className=" overflow-hidden">
        <div className=" absolute top-2 left-4 w-28">
                <img src={P2} alt="P2" />
            </div>  
        <h2 className="text-blue-800 font-bold text-4xl mt-52 ml-44">Platforme de gestion<br/> d'emploi du temps</h2>
        <p className="ml-44 text-lg pt-4">Transformez la gestion manuelle de vos emplois du temps<br/> en une
              gestion automatisée et efficace.</p>

              <button className="flex items-center justify-center text-white h-8 w-96 text-lg font-bold border bg-blue-700 rounded border-blue-700 translate-x-44 mt-44">Consulter les emploi du temps</button>     
            <div className=" absolute top-44 right-60 ">
                <img src={P1} alt="P1" />
            </div>
            <div className="absolute top-0 right-4 mt-2 ">
          <Link to="/connecter" className="flex items-center justify-center text-blue-700 h-9 w-44  text-lg font-bold border rounded border-blue-700 transition duration-300  shadow-blue-500  hover:text-white hover:bg-blue-700">Se connecter</Link>
        </div>
        
        
      </div>
    )
  }
}

export default Admin0;
