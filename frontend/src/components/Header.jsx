import { useState } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaSlidersH, FaChartBar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import Modal from './Modal';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

  return (
    <header className='header'>
        <div>
            <Link to='/'> Study Buddy </Link>
        </div> 
        <ul> 
            {user ? (
            <> 
                <li> 
                    <button className='btn' onClick={()=> setIsOpen(true)} >
                        <FaChartBar /> Stats
                    </button>
                    <Modal isOpen={isOpen} onClose={()=> setIsOpen(false)}/>
                    {/* <Link to='/stats'>
                        <FaChartBar /> Stats
                    </Link> */}
                </li> 
                <li> 
                    <button className='btn' onClick={()=> setIsOpen(true)} >
                        <FaSlidersH /> Settings
                    </button>
                    <Modal isOpen={isOpen} onClose={()=> setIsOpen(false)}/>
                </li> 
                <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
            </>
            ) : (
            <>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                </li>
                <li> 
                    <button className='btn' onClick={()=> setIsOpen(true)} >
                        <FaSlidersH /> Settings
                    </button>
                    <Modal isOpen={isOpen} onClose={()=> setIsOpen(false)}/>
                </li> 
            </>
            )}
        </ul>
    </header>
  )
}

export default Header