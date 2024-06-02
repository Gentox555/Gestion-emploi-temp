import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import P1 from './img/P1.png';
import P2 from './img/P2.png';

const Connecter = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/project-gestion/Backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        if(data.role === 'admin'){
          navigate('/dashbord1');
        }else if(data.role === 'professeur'){
          navigate('/dashbord2');
        }else{
          setError('role invalide')
        }
        
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('une erreue s\'est produite. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <div className="absolute top-2 left-4 w-28">
        <img src={P2} alt="P2" />
      </div>
      <div className="shadow-xl shadow-slate-500 mt-52 ml-96 translate-x-12 h-96 w-2/5 bg-white rounded-r-lg">
        <div className="mt-52 -ml-12 translate-x-12 h-96 w-72 bg-sky-400 rounded-r-lg">
          <div className="w-72 absolute top-28">
            <img src={P1} alt="P1" />
          </div>
        </div>
        <div>
          <div className="-mt-72 -translate-y-20 translate-x-3 ml-72">
            <h1 className="font-bold text-lg">Bienvenue à GESTMP</h1>
          </div>
          <div className="-translate-y-20 translate-x-3 ml-72">
            <p className="text-slate-500">
              Accedez à votre compte pour consulter les
              <br /> emplois du temps.
            </p>
          </div>
          <div className="-translate-y-16 translate-x-3 ml-72">
            <h1 className="font-bold text-lg">Connexion</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="-translate-y-10 translate-x-3 ml-72">
              <label>
                Nom d'utilisateur<span className="text-red-700"> * </span>:
                <div className="border-2 border-black rounded w-40 z-10">
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>
            <div className="-translate-y-10 translate-x-3 ml-72">
              <label>
                Mot de passe <span className="text-red-700"> * </span>:
                <input
                  className="border-black border rounded w-22 -translate-x-28 -ml-1 translate-y-8"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="absolute right-20 mt-9">
              <button
                type="submit"
                className="flex items-center justify-center text-white h-9 w-44 text-lg font-bold border rounded border-blue-700 bg-blue-600 transition duration-300"
              >
                Se connecter
              </button>
            </div>
          </form>
          {error && (
            <div className="error-message text-red-600 mt-1 ml-72 translate-x-10">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connecter;
