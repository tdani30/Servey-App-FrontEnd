import React from 'react';

import {Link} from 'react-router-dom';

const NavBar= () =>
(
    <nav>
        <ul>
            <li><Link to="/">Admin</Link></li>
            {/* <li><Link to="/QuestionsPage">Questions</Link></li> */}
        </ul>
    </nav>
);

export default NavBar;