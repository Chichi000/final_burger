import React, { Fragment } from 'react'
import '../../App.css'
import Search from './Search'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../../actions/userActions'
const Header = () => {

	const dispatch = useDispatch();
	const { user, loading } = useSelector(state => state.auth)
	const { cartItems } = useSelector(state => state.cart)
	const logoutHandler = () => {
		dispatch(logout());
	}

	return (
		<Fragment>
			
			<header className='header' style={{height:'100px'}}>
			
		
				
						<Link to="/">
							<img style={{marginLeft:'650px'}} src="/images/logo.png" />
						</Link>
			
				<div style={{marginLeft:'200px'}}>

					<Link to="/cart" style={{ textDecoration: 'none' }} >

						<span id="cart" className="ml-3"><i className="fa fa-shopping-cart" aria-hidden="true" style={{fontSize:"30px", color:'white'}}></i></span>

						<span className="ml-1" id="cart_count" style={{backgroundColor:'transparent', color:'white'}}>{cartItems.length}</span>

						

					</Link>
					{user ? (

						<div className="ml-4 dropdown d-inline">

							<Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

								<figure className="avatar avatar-nav">
									<img
										src={user.avatar && user.avatar.url}

										alt={user && user.name}

										className="rounded-circle"

									/>

								</figure>

								<span>{user && user.name}</span>

							</Link>
							<div className="dropdown-menu" aria-labelledby="dropDownMenuButton">



								{user && user.role === 'admin' && (
									<Link className="dropdown-item" to="/dashboard">Dashboard</Link>

								)}

								<Link className="dropdown-item" to="/orders/me">Orders</Link>

								<Link className="dropdown-item" to="/me">Profile</Link>

								{/*<Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>*/}

								<Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>

									Logout

								</Link>



							</div>

						</div>

					) : !loading && <Link to="/login" className="btn ml-4" id="login"><i className="fa fa-user-o" aria-hidden="true" style={{backgroundColor:'transparent', color:'white', fontSize:'25px'}}>Login</i></Link>}

				</div>
	
			</header>
		</Fragment>
	)
}

export default Header