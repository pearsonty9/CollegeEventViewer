import React, { useState } from 'react';
import UserSignUpForm from '../components/UserSignUpForm';
import UniversitySignUpForm from '../components/UniversitySignUpForm';
import { CSSTransition } from 'react-transition-group';

import axios from 'axios';

function SignUp(props) {

    const [activeMenu, setActiveMenu] = useState('user');
    const [user, setUser] = useState({
        type: 'student',
        email: '',
        password: '',
    });

    return (
        <div className="page">
            <CSSTransition
                in={activeMenu === 'user'}
                unmountOnExit
                timeout={750}
                classNames="menu-primary"
            >
                <div className="menu">
                    <UserSignUpForm setActiveMenu={setActiveMenu} setUser={setUser} goToMenu="university" />
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === 'university'}
                unmountOnExit
                timeout={750}
                classNames="menu-secondary"
            >
                <div className="menu">
                    <UniversitySignUpForm setActiveMenu={setActiveMenu} user={user} goToMenu="user" />
                </div>
            </CSSTransition>
        </div>
    );
}

export default SignUp;