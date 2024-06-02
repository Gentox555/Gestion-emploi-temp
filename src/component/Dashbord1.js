
import React, {useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaPersonChalkboard } from "react-icons/fa6";
import { GrDocumentTime } from "react-icons/gr";
import { FaBuilding } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import '../App.css';
import P2 from './img/P2.png';
import P3 from './img/P3.png';
import P4 from './img/P4.png';
import P5 from './img/P5.png';

const Dashbord1 = () => {
  const [admin, setadmin] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost/project-gestion/Backend/recupadmin.php')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setadmin(data.admin);
        } else {
          console.error('Failed to fetch admin:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching admin:', error);
      });
  }, []);
  ///////////////////count//////////////////////
    const [counts, setCounts] = useState({
      departement_count: 0,
      professeur_count: 0,
      filière_count: 0,
    });
  
    useEffect(() => {
      fetch('http://localhost/project-gestion/Backend/count.php')
        .then(response => response.json())
        .then(data => {
          setCounts(data);
        })
        .catch(error => {
          console.error('Error fetching counts:', error);
        });
    }, []);
    //////////////////////////logout boutton ////////////////////
    const [showLogout, setShowLogout] = useState(false);

  const handleIconClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    // Supprimer le jeton d'authentification
    localStorage.removeItem('token'); // ou sessionStorage.removeItem('token')
    
    // Rediriger vers la page de connexion
    navigate("/"); 
    
    console.log('Déconnexion');
  };
  ////////////////////////////
    return (
      <div>
        <div className="absolute top-2 left-4 w-28">
          <img src={P2} alt="P2" />
        </div>
        <div className="absolute right-32  top-2 text-6xl"><IoPersonCircleOutline onClick={handleIconClick}/></div>
        {admin.map((ad) => (<div className="absolute right-5 top-5 text-lg">{ad.nom} {ad.prenom}</div>))}
        <span className="absolute right-2 top-11 text-blue-600">Adminstrateur</span>
        {admin.map((ad) => (<div className="text-center text-xl font-semibold text-gray-700 translate-y-32 -translate-x-80 z-20">Bienvenue M. {ad.nom} {ad.prenom}!</div>))}
        <ul className="mt-32 ml-12 p-4  space-y-14">
          <li className="relative text-lg font-semibold text-gray-700  w-24 hover:text-blue-600 transition-all duration-200 cursor-pointer group">
            <span className="absolute inset-y-0 -ml-16 -translate-y-1 h-10 w-2 bg-transparent rounded-r transition-all duration-200 group-hover:bg-blue-600 "></span>
            <span className="pl-4 group-hover:underline ">Accueille</span>
            <div className="-translate-x-4 -translate-y-6">
            <span ><FaHome /></span></div>
          </li>
          <li className="relative text-lg font-semibold text-gray-700  w-40 hover:text-blue-600 transition-all duration-200 cursor-pointer group">
            <span className="absolute inset-y-0 -ml-16 w-2 h-10 -translate-y-1 bg-transparent rounded-r transition-all duration-200 group-hover:bg-blue-600"></span>
            <span className="pl-4 group-hover:underline">Emploi du temps</span>
            <div className="-translate-x-4 -translate-y-6">
            <span ><GrDocumentTime /></span></div>
          </li>
          <li className="relative text-lg font-semibold text-gray-700 w-24 hover:text-blue-600 transition-all duration-200 cursor-pointer group">
            <span className="absolute inset-y-0 -ml-16 w-2 h-10 -translate-y-1 bg-transparent rounded-r transition-all duration-200 group-hover:bg-blue-600"></span>
            <Link to="/departement" className="pl-4 group-hover:underline">Departement</Link>
            <div className="-translate-x-4 -translate-y-6">
            <span ><FaBuilding /></span></div>
          </li>
          <li className="relative text-lg font-semibold text-gray-700  w-40 hover:text-blue-600 transition-all duration-200 cursor-pointer group">
            <span className="absolute inset-y-0 -ml-16 w-2 h-10 -translate-y-1 bg-transparent rounded-r transition-all duration-200 group-hover:bg-blue-600"></span>
            <Link to="/filiere" className="pl-4 group-hover:underline">Filiére</Link>
            <div className="-translate-x-4 -translate-y-6">
            <span ><GrDocumentTime /></span></div>
          </li>
          <li className="relative text-lg font-semibold text-gray-700 w-24 hover:text-blue-600 transition-all duration-200 cursor-pointer group">
            <span className="absolute inset-y-0 -ml-16 -translate-y-1 w-2 h-10 bg-transparent rounded-r transition-all duration-200 group-hover:bg-blue-600"></span>
            <Link to="/aMSpro" className="pl-4 group-hover:underline">Professeur</Link>
            <div className="-translate-x-4 -translate-y-6">
            <span ><FaPersonChalkboard /></span></div>
          </li>
        </ul>
        <div className=" border-[#00C9FF] w-2 h-96 bg-[#00C9FF] translate-x-64 -translate-y-72 -mt-44"></div>
        <div className=" w-2 h-40 bg-[#00C9FF] border-[#00C9FF] translate-x-64 -translate-y-96 "></div>

        <div className="absolute shadow-2xl shadow-[#919293] w-64 h-40 bg-transparent rounded-xl translate-x-72 left-14 top-64  ">
          <p className="text-gray-500 text-lg ml-5 mt-5">Professeur</p>
          <h1 className="z-50 text-center font-extrabold text-3xl -translate-x-20 translate-y-10">{counts.professeur_count}</h1>
          <div className="w-20 translate-x-40 -mt-5"><img src={P3} alt="p3" /></div>
        </div>

        <div className="absolute shadow-2xl shadow-[#919293] w-64 h-40 bg-transparent rounded-xl translate-x-96 left-96 top-64  ">
          <p className="text-gray-500 text-lg ml-5 mt-5">Filiére</p>
          <h1 className="z-50 text-center font-extrabold text-3xl -translate-x-20 translate-y-10">{counts.filière_count}</h1>
          <div className="w-20 translate-x-40 -mt-5"><img src={P5} alt="p5" /></div>
        </div>
      
        <div className="absolute shadow-2xl shadow-[#919293] w-64 h-40 bg-transparent rounded-xl translate-x-72 right-96 top-64  ">
          <p className="text-gray-500 text-lg ml-5 mt-5">Departement</p>
          <h1 className="z-50 text-center font-extrabold text-3xl -translate-x-20 translate-y-10">{counts.departement_count}</h1>
          <div className= "w-28 translate-x-40 -mt-7 "><img src={P4} alt="p4" /></div>
        </div>
        
        {showLogout && (
        <div className="absolute right-32 top-16">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-transparent text-gray-700 rounded text-lg  "
          >
            Se déconnecter <div className="translate-x-32 -translate-y-5 "><IoLogOutOutline /></div>
          </button>
        </div>
      )}
        

      </div>
    )
  }


export default Dashbord1;
