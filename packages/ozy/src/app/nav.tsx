import * as React from 'react';
import { Avatar, Navbar } from 'flowbite-react';
import { PAGES, useAppState, SIGN_IN_PATH, HOME_PATH, isSignedIn } from './global-state';
import { useLocation, useNavigate } from 'react-router-dom';

export const Nav: React.FC = () => {
    const { signInData } = useAppState().signInData.signOut.$;
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <Navbar fluid={true} rounded={false}>
            <div onClick={() => {navigate(HOME_PATH)}} className='cursor-pointer'>
                <Navbar.Brand>
                    <img
                        src="favicon.ico"
                        className="mr-3 h-6 sm:h-9"
                        alt="Ozy"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Ozy
                    </span>
                </Navbar.Brand>
            </div>
            <Navbar.Toggle />
            <Navbar.Collapse>
                {Object.entries(PAGES).map(([page, info]) => (
                    <div onClick={() => {navigate(info.path)}} key={page}
                        className='cursor-pointer flex flex-col justify-around'>
                        <Navbar.Link active={location.pathname.startsWith(info.path)}>
                            {info.linkLabel}
                        </Navbar.Link>
                    </div>
                ))}
                {!isSignedIn(signInData) && (
                    <div onClick={() => {navigate(SIGN_IN_PATH)}} className='cursor-pointer'>
                        <Navbar.Link active={location.pathname === SIGN_IN_PATH}>
                            Sign In
                        </Navbar.Link>
                    </div>
                )}
                {isSignedIn(signInData) && (
                    <Navbar.Link>
                        <div onClick={() => {navigate(SIGN_IN_PATH)}} className='cursor-pointer'>
                            <Avatar img={signInData.googleUser!.imageUrl} rounded={true} size="sm" />
                        </div>
                    </Navbar.Link>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}