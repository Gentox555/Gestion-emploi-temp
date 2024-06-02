import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import P2 from './img/P2.png';
import { IoPersonCircleOutline, IoLogOutOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import {  MdEdit, MdDelete } from "react-icons/md";
import { GrDocumentTime } from "react-icons/gr";
import { FaHome } from "react-icons/fa";

const Dashbord2 = () => {
  const [professeur, setProfesseur] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    jour: '',
    heureDebut: '',
    heureFin: ''
  });

  const [disponibilites, setdisponibilites] = useState([]);
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    fetch('http://localhost/project-gestion/Backend/dashbord2/recuppro.php')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setProfesseur(data.professeur);
        } else {
          console.error('Failed to fetch professeur:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching professeur:', error);
      });
  }, []);

  const handleIconClick = () => {
    setShowLogout(!showLogout);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost/project-gestion/Backend/dashbord2/ajouter.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          // Traitez la réponse en fonction de vos besoins
          console.log('Disponibilité ajoutée avec succès.');
          setShowForm(false);
          setFormData({
            nom: '',
            prenom: '',
            jour: '',
            heureDebut: '',
            heureFin: ''
          });
        } else {
          alert("Une erreur s'est produite lors de l'ajout de la disponibilité.");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Une erreur s'est produite lors de l'ajout de la disponibilité.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
    console.log('Déconnexion');
  };
  ////////
  useEffect(() => {
    fetch('http://localhost/project-gestion/Backend/dashbord2/recup.php')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setdisponibilites(data.disponibilites);
        } else {
          console.error('Failed to fetch filiére:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching filiére:', error);
      });
  }, []);
  /////

  return (
    <div className="">
      <div className="absolute top-2 left-4 w-28">
        <img src={P2} alt="P2" />
      </div>
      <div className="absolute right-32 top-2 text-6xl">
        <IoPersonCircleOutline onClick={handleIconClick} />
      </div>
      {professeur.map(pro => (
        <div key={pro.id} className="absolute right-5 top-5 text-lg">
          {pro.nom} {pro.prenom}
        </div>
      ))}
      <span className="absolute right-5 top-11 text-blue-600">Professeur</span>
      {professeur.map(pro => (
        <div key={pro.id} className="text-center text-xl font-semibold text-gray-700 translate-y-32 -translate-x-80 z-20">
          Bienvenue M.{pro.nom} {pro.prenom} !
        </div>
      ))}
      {showLogout && (
        <div className="absolute right-32 top-16">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-transparent text-gray-700 rounded text-lg"
          >
            Se déconnecter <div className="translate-x-32 -translate-y-5"><IoLogOutOutline /></div>
          </button>
        </div>
      )}
      <span
        className="absolute border-1 top-40 rounded w-10 h-10 bg-blue-600 z-50 right-5 cursor-pointer"
        onClick={() => setShowForm(!showForm)}
      >
        <span className="absolute text-white text-3xl z-50 right-0 -translate-x-1 top-1">
          <IoIosAdd />
        </span>
      </span>
      {showForm && (
        <div className="absolute top-48 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded shadow-lg z-50">
          <h2 className="text-xl mb-4">Ajouter Disponibilité</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prénom">
                Prénom
              </label>
              <input
                type="text"
                id="prénom"
                name="prénom"
                value={formData.prénom}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jour">
                Jour de la semaine
              </label>
              <input
                type="text"
                id="jour"
                name="jour"
                value={formData.jour}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="heureDebut">
                Heure de début
              </label>
              <input
                type="text"
                id="heureDebut"
                name="heureDebut"
                value={formData.heureDebut}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="heureFin">
                Heure de fin
              </label>
              <input
                type="text"
                id="heureFin"
                name="heureFin"
                value={formData.heureFin}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
      <div className=" translate-x-96 ml-56 translate-y-72 border-2 w-min border-transparente overflow-y-auto h-72 ">
        <table className="divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">jour</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">heure_debut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">heure_fin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {disponibilites.map((dis)=>(
              <tr key={dis.id}>
                <td className="px-6 py-4 whitespace-nowrap">{dis.jour_semaine}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dis.heure_debut}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dis.heure_fin}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-4">
                    <button className="text-blue-600 hover:text-blue-900">
                      <MdEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="-translate-y-72">
        <ul className="mt-40 ml-12 p-4 space-y-14">
          <li className="relative text-lg font-semibold text-gray-700 w-24 hover:text-blue-600 transition-all duration-200 cursor-pointer group">
            <span className="absolute inset-y-0 -ml-16 -translate-y-1 h-10 w-2 bg-transparent rounded-r transition-all duration-200 group-hover:bg-blue-600"></span>
            <span className="pl-4 group-hover:underline">Disponibilité</span>
            <div className="-translate-x-4 -translate-y-6">
              <span><FaHome /></span>
            </div>
          </li>
          <li className="relative text-lg font-semibold text-gray-700 w-40 hover:text-blue-600 transition-all duration-200 cursor-pointer group">
            <span className="absolute inset-y-0 -ml-16 w-2 h-10 -translate-y-1 bg-transparent rounded-r transition-all duration-200 group-hover:bg-blue-600"></span>
            <span className="pl-4 group-hover:underline">Emploi du temps</span>
            <div className="-translate-x-4 -translate-y-6">
              <span><GrDocumentTime /></span>
            </div>
            </li>
            </ul>
            </div>
      <div className="border-[#00C9FF] w-2 h-96 bg-[#00C9FF] translate-x-64 -translate-y-56  -mt-72"></div>
        <div className="w-2 h-40 bg-[#00C9FF] border-[#00C9FF] translate-x-64 -translate-y-80"></div>
    </div>
    
  );
};

export default Dashbord2;

