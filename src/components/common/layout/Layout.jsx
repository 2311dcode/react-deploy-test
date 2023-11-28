import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useText';

export default function Layout({ children, title }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();

	useEffect(() => {
		//아래처럼 custom훅이 반환한 함수를
		//hook이나 핸들러 함수 내부에서 사용가능
		splitText(refTitle.current, title, 0.5, 0.1);
		//on이 바로붙어버리고 페이지가 열려서 모션기능위해 setTimeout으로 지연시간 줌
		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 300);
	}, []);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>

			{children}
		</main>
	);
}

/*
Layout 컴포넌트로 감싼 컨텐츠 내용이 아래 children위치에 출력됨   
부모태그 안쪽 컨텐츠가 children으로 받아짐 

*/
