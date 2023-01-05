import { FaSignInAlt, FaSignOutAlt, FaUser, FaSlidersH, FaChartBar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import Modal from './Modal';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                    <Link to='/stats'>
                        <FaChartBar /> Stats
                    </Link>
                </li> 
                <li> 
                    <button className='btn'>
                        <FaSlidersH /> Settings
                    </button>
                    <Modal> 
                        <p>coming soon!</p>
                    </Modal>
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
                    <Link to='/stats'>
                        <FaSlidersH /> Settings
                    </Link>
                </li> 
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
            </>
            )}
        </ul>
    </header>
  )
}

export default Header