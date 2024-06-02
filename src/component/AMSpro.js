import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaPersonChalkboard } from "react-icons/fa6";
import { GrDocumentTime } from "react-icons/gr";
import { FaBuilding } from "react-icons/fa";
import {  MdEdit, MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import '../App.css';
import P2 from './img/P2.png';

const AMSpro = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    specialite: '',
  });
  const [professeurs, setProfesseurs] = useState([]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //////////pour recuperer les données/////
  useEffect(() => {
    fetch('http://localhost/project-gestion/Backend/recup.php')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setProfesseurs(data.professeurs);
        } else {
          console.error('Failed to fetch professors:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching professors:', error);
      });
  }, []);
     ///////////////////////////////////////////////
     //////////pour recuperer inserer les données/////
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost/project-gestion/Backend/ajouter.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        setProfesseurs([...professeurs, formData]);
        setShowForm(false);
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          specialite: '',
        });
      } else {
        alert('Une erreur est survenue lors de l\'ajout du professeur.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Une erreur est survenue lors de l\'ajout du professeur.');
    });
  };

  const handleDelete = (index) => {
    const newProfesseurs = [...professeurs];
    newProfesseurs.splice(index, 1);
    setProfesseurs(newProfesseurs);
  };
//////////////////////////////////////////////////////
  return (
    <div className="">
      <div className="absolute top-2 left-4 w-28">
        <img src={P2} alt="P2" />
      </div>
      <div className="text-center text-xl font-semibold text-gray-700 translate-y-32 -translate-x-80 z-20">Professeurs</div>
      <span 
        className="absolute border-1 top-40 rounded w-10 h-10 bg-blue-600 z-50 right-5 cursor-pointer"
        onClick={() => setShowForm(!showForm)}
      >
        <span className="absolute text-white text-3xl z-50 right-0 -translate-x-1 top-1 ">
          <IoIosAdd />
        </span>
      </span>

      <div className=" translate-x-96 ml-44 translate-y-64 border-2 w-min border-transparente overflow-y-auto h-72 ">
      <table className="divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spécialité</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {professeurs.map((prof, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{prof.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prof.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prof.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{prof.spécialité}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-4">
                    <button className="text-blue-600 hover:text-blue-900">
                      <MdEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(index)}>
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="-translate-y-80">
        <ul className="mt-40 ml-12 p-4 space-y-14">
          <li className="relative text-lg font-semibold text-gray-700 w-24 hover:text-blue-600 transition-all duration-200 cursor-pointer group">
            <span className="absolute inset-y-0 -ml-16 -translate-y-1 h-10 w-2 bg-transparent rounded-r transition-all duration-200 group-hover:bg-blue-600"></span>
            <span className="pl-4 group-hover:underline">Accueille</span>
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
          <li className="relative text-lg font-semibold text-gray-700 w-24 hover:text-blue-600 transition-all duration-200 cursor-pointer group">
            <span className="absolute inset-y-0 -ml-16 w-2 h-10 -translate-y-1 bg-transparent rounded-r transition-all duration-200 group-hover:bg-blue-600"></span>
            <span className="pl-4 group-hover:underline">Departement</span>
            <div className="-translate-x-4 -translate-y-6">
              <span><FaBuilding /></span>
            </div>
          </li>
          <li className="relative text-lg font-semibold text-gray-700  w-40 hover:text-blue-600 transition-all duration-200 cursor-pointer group">
            <span className="absolute inset-y-0 -ml-16 w-2 h-10 -translate-y-1 bg-transparent rounded-r transition-all duration-200 group-hover:bg-blue-600"></span>
            <Link to="/filiere" className="pl-4 group-hover:underline">Filiére</Link>
            <div className="-translate-x-4 -translate-y-6">
            <span ><GrDocumentTime /></span></div>
          </li>
          <li className="relative text-lg font-semibold text-gray-700 w-24 hover:text-blue-600 transition-all duration-200 cursor-pointer group">
            <span className="absolute inset-y-0 -ml-16 -translate-y-1 w-2 h-10 bg-transparent rounded-r transition-all duration-200 group-hover:bg-blue-600"></span>
            <span className="pl-4 group-hover:underline">Professeur</span>
            <div className="-translate-x-4 -translate-y-6">
              <span><FaPersonChalkboard /></span>
            </div>
          </li>
        </ul>
        <div className="border-[#00C9FF] w-2 h-96 bg-[#00C9FF] translate-x-64 -translate-y-72 -mt-44"></div>
        <div className="w-2 h-40 bg-[#00C9FF] border-[#00C9FF] translate-x-64 -translate-y-96"></div>
        <div className="mt-10 ml-12 mr-12"></div>
      </div>
      
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl mb-4">Ajouter Professeur</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Prenom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Spécialité</label>
                <input
                  type="text"
                  name="specialite"
                  value={formData.specialite}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="mr-4 px-4 py-2 bg-red-500 text-white rounded">Annuler</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AMSpro;
