import React from 'react';
import {Link} from '../router';

export const Footer = () => (
  <ul>
    <li>
      <Link to='/'>All</Link>
    </li>
    <li>
      <Link to='/active'>Active</Link>
    </li>
    <li>
      <Link to='/complete'>Complete</Link>
    </li>
  </ul>
);
