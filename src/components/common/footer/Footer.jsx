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
					<a href='https://www.face.com' target='_self' rel='noopener noreferrer'>
						<FaYoutube />
					</a>
				</li>
			</ul>
		</footer>
	);
}
