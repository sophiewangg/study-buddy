import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
        <div>
            <Link to='/'> GoalSetter </Link>
        </div> 
        <ul> 
            <li>
                <Link to='/login'>
                    <FaSignInAlt/> login
                </Link> 
            </li> 
            <li>
                <Link to='/register'>
                    <FaUser/> register
                </Link> 
            </li> 
        </ul>
    </header>
  )
}

export default Header