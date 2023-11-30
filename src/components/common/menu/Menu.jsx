import { useEffect } from 'react';
import './Menu.scss';

export default function Menu({ setToggle }) {
	const closeMenu = () => {
		window.innerWidth >= 1000 && setToggle(false);
	};

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.addEventListener('resize', closeMenu);
	}, []);
	return (
		<aside className='Menu'>
			<h1>MobileMenu</h1>
		</aside>
	);
}
