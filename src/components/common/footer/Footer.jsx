import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
//npm i react-icons

export default function Footer() {
	return (
		<footer className='Footer'>
			<h1>Dcodelab</h1>

			<p>2023 Dcodelab &copy; All Rights Reserved.</p>

			<ul>
				<li>
					<FaFacebookF />
				</li>
				<li>
					<FaTwitter />
				</li>
				<li>
					<Link to={{ pathname: 'https://www.facebook.com' }} target='_blank'>
						<FaYoutube />
					</Link>
				</li>
			</ul>
		</footer>
	);
}
