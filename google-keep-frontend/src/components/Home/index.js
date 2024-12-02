// // Home.jsx
// import { useEffect,useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import Navbar from '../Navbar';
// import Notes from '../Notes';
// import Remainders from '../Remainders';
// import Trash from '../Trash';
// import Sidebar from '../Sidebar';
// import Labels from '../Labels';
// import Archive from '../Archive';

// import Cookies from 'js-cookie';



// import { AiOutlineBulb } from "react-icons/ai";
// import { FaRegBell } from "react-icons/fa6";
// import { RiInboxArchiveLine } from "react-icons/ri";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { MdLabelOutline } from "react-icons/md";


// import './index.css'

// const SidebarIcons = [
//     { id: 1, icon: <AiOutlineBulb />, text: "Notes",path:'' },
//     { id: 2, icon: <FaRegBell />, text: "Reminders",path:'remainders' },
//     { id: 3, icon: <MdLabelOutline />, text: "Labels",path:'labels' },
//     { id: 4, icon: <RiInboxArchiveLine />, text: "Archive",path:'archive' },
//     { id: 5, icon: <FaRegTrashAlt />, text: "Trash",path:'trash' },
//   ];

// const Home = () => {
//   const navigate = useNavigate();
  
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [activeSidebar, setActiveSidebar] = useState(SidebarIcons[0].id);
//   const [serachInput,setSearchInput] = useState('')

//   useEffect(() => {
//     const jwtToken = Cookies.get('jwtToken');

//     if (jwtToken === undefined) {
//       navigate('/login');
//     }
//   }, [navigate]);


//   const toggleSidebar = () => {
//     setShowSidebar((prev) => !prev);
//   };

//   const changeSidebar = (id) => {
//     setActiveSidebar(id);
//   };


//   const onChangeSearchInput =(input)=>{
//     setSearchInput(input)
//   }


//   const showSpecificContent = () =>{
//     switch(activeSidebar){
//         case 1:
//             return <Notes serachInput={serachInput}/>
//         case 2:
//             return <Remainders/>
//         case 3:
//             return <Labels/>
//         case 4:
//             return <Archive/>
//         case 5:
//             return <Trash/>
//         default:
//             return <Notes/>
//     }
//   }

 

//   return (
//     <div className="home-container">
//       <Navbar toggleSidebar={toggleSidebar} serachInput={onChangeSearchInput}/>
//       <div className="home-content">
//         <div>
//         <Sidebar
//           isSidebarOpen={showSidebar}
//           SidebarIcons={SidebarIcons}
//           activeSidebar={activeSidebar}
//           changeSidebar={changeSidebar}
//         />
//         </div>
//         <div className="content-area">
//           {showSpecificContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;











import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../Navbar';
import Notes from '../Notes';
import Remainders from '../Remainders';
import Trash from '../Trash';
import Sidebar from '../Sidebar';
import Labels from '../Labels';
import Archive from '../Archive';

import Cookies from 'js-cookie';

import { AiOutlineBulb } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa6";
import { RiInboxArchiveLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdLabelOutline } from "react-icons/md";

import './index.css';

const SidebarIcons = [
  { id: 1, icon: <AiOutlineBulb />, text: "Notes", path: '' },
  { id: 2, icon: <FaRegBell />, text: "Reminders", path: 'remainders' },
  { id: 3, icon: <MdLabelOutline />, text: "Labels", path: 'labels' },
  { id: 4, icon: <RiInboxArchiveLine />, text: "Archive", path: 'archive' },
  { id: 5, icon: <FaRegTrashAlt />, text: "Trash", path: 'trash' },
];

const Home = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(SidebarIcons[0].id);
  const [searchInput, setSearchInput] = useState('');
  const [activeTheme,setActiveTheme] = useState(true)

  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken === undefined) {
      navigate('/login');
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const changeSidebar = (id) => {
    setActiveSidebar(id);
  };

  const onChangeSearchInput = (input) => {
    setSearchInput(input); // Corrected spelling
  };

  const onClickChangeTheme=()=>{
    setActiveTheme(!activeTheme)
  }

  const showSpecificContent = () => {
    switch (activeSidebar) {
      case 1:
        return <Notes searchInput={searchInput} activeTheme={activeTheme}/>; // Corrected spelling
      case 2:
        return <Remainders />;
      case 3:
        return <Labels />;
      case 4:
        return <Archive />;
      case 5:
        return <Trash activeTheme={activeTheme} />;
      default:
        return <Notes searchInput={searchInput} activeTheme={activeTheme}/>;
    }
  };

  return (
    <div className={`home-container ${activeTheme ? 'light-theme' : 'dark-theme'}`}>
      <Navbar toggleSidebar={toggleSidebar} onChangeSearchInput={onChangeSearchInput} activeTheme={activeTheme} changeTheme={onClickChangeTheme}/> {/* Updated prop */}
      <hr/>
      <div className="home-content">
        <div>
          <Sidebar
            isSidebarOpen={showSidebar}
            SidebarIcons={SidebarIcons}
            activeSidebar={activeSidebar}
            changeSidebar={changeSidebar}
            activeTheme={activeTheme}
          />
        </div>
        <div className="content-area">
          {showSpecificContent()}
        </div>
      </div>
    </div>
  );
};

export default Home;
