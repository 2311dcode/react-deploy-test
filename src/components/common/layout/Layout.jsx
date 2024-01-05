import { useEffect, useRef, useState } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useText';
import { useScroll } from '../../../hooks/useScroll';

export default function Layout({ children, title }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();
 

	useEffect(() => {
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refFrame.current?.classList.add('on');
		}, 300);
	}, [splitText, title]);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{children}
			<button className='btnTop' onClick={ }>
				Top
			</button>
		</main>
	);
}
