import { useState } from 'react';
import dayjs from 'dayjs';

import './App.css';

import { getRandomIntInclusive } from './utils';

// from 1941
// to 2011

const MIN_DATE = -913755600000;
const MAX_DATE = 1325296800000;
const randomBirthdate = () => {
  return new Date(getRandomIntInclusive(MIN_DATE, MAX_DATE)).toISOString();
};

const getUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...Array(100).keys()].map((_, index) => ({
        username: `user_${index}`,
        birthdate: randomBirthdate(),
      })));
    }, 300);
  })
};

const isYoungerThen18 = (birthdate) => {
  return dayjs(birthdate).isAfter('01/01/2003');
}

function App() {
  const [users, setUsers] = useState([]);
  const handleButtonClick = () => {
    getUsers().then(users => {
      setUsers(users);
    })
  };

  return (
    <div className="App">
      <div className="users">
        {users.map(({ username, birthdate }) => (
          <div className={isYoungerThen18(birthdate) ? 'red' : ''} key={username}>{username}: {dayjs(birthdate).format('DD/MM/YYYY')}</div>
        ))}
      </div>
      <button onClick={handleButtonClick}>
        Button
      </button>
    </div>
  );
}

export default App;
