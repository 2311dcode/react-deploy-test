import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useSplitText';

export default function Layout({ children, title }) {
	const refFrame = useRef(null);
	//useEffect안쪽에서 자주 쓰일만한 특정 함수를 호출해야됨
	//use로 시작하는 커스텀훅은 특정함수 안쪽에서 호출불가
	//해당 hook이 함수를 반환하도록 처리
	const splitText = useSplitText();
	console.log(splitText);

	useEffect(() => {
		//아래처럼 custom훅이 반환한 함수를
		//hook이나 핸들러 함수 내부에서 사용가능
		splitText('hello');
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
