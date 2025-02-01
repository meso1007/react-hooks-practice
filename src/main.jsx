import { StrictMode, createContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const  userInfo = {
  name:"Jhon",
  age:22,
};

const UserContext = createContext(userInfo);

createRoot(document.getElementById('root')).render(
  <UserContext.Provider value={userInfo}>
    <StrictMode>
      <App />
    </StrictMode>,
  </UserContext.Provider>
)

export default UserContext; // eslint-disable-line no-new
