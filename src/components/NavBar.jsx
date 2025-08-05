import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="flex space-x-4 p-4 bg-gray-100">
      <NavLink
        to="/home"
        className={({ isActive }) => isActive ? 'font-bold text-blue-600' : 'text-gray-700'}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => isActive ? 'font-bold text-blue-600' : 'text-gray-700'}
      >
        About
      </NavLink>
      <NavLink
        to="/streams"
        className={({ isActive }) => isActive ? 'font-bold text-blue-600' : 'text-gray-700'}
      >
        Streams
      </NavLink>
    </nav>
);}