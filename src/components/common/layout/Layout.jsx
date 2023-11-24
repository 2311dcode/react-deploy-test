import { useEffect, useRef } from 'react';
import './Layout.scss';

export default function Layout({ children, title }) {
	const refFrame = useRef(null);

	useEffect(() => {
		refFrame.current.classList.add('on');
	}, []);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1>{title}</h1>
			<div className='bar'></div>

			{children}
		</main>
	);
}

/*
Layout 컴포넌트로 감싼 컨텐츠 내용이 아래 children위치에 출력됨   
부모태그 안쪽 컨텐츠가 children으로 받아짐 

*/
