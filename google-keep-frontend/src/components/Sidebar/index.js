import React from 'react';
import './index.css';

const Sidebar = ({ isSidebarOpen, SidebarIcons, activeSidebar, changeSidebar, activeTheme }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'} ${activeTheme ? 'light-theme' : 'dark-theme'}`}>
      <ul className="sidebar-list">
        {SidebarIcons.map((each) => (
          <li
            key={each.id}
            className={`sidebar-item ${activeSidebar === each.id ? 'active' : ''}`}
            onClick={() => changeSidebar(each.id)}
          >
            <span
              className={`icon ${activeTheme ? 'icon-light' : 'icon-dark'}`}
            >
              {each.icon}
            </span>
            {isSidebarOpen && (
              <span
                className={`text ${activeTheme ? 'text-light' : 'text-dark'}`}
              >
                {each.text}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
