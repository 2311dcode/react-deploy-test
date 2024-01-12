import Info from '../info/Info';
import Visual from '../visual/Visual';
import Pics from '../pics/Pics';
import Banner from '../banner/Banner';
import './MainWrap.scss';
import Btns from '../btns/Btns';
import Illust from '../illust/Illust';
import { useScroll } from '../../../hooks/useScroll';
import { useEffect } from 'react';

export default function MainWrap() {
	const { scrollTo } = useScroll();

	useEffect(() => {
		scrollTo(0);
	}, [scrollTo]);
	return (
		<div className='MainWrap'>
			<Visual />
			<Info />
			<Pics />
			<Illust />
			<Banner />
			<Btns />
		</div>
	);
}
