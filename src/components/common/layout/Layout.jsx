import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useText';

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
		</main>
	);
}

/* 
자식에 무거운 연산처리 함수 있음 - 패치 함수 한번만 받으면 되는 것 
그러나 
부모컴포넌트가 바뀌면 자식컴포넌트도 재렌더링 
- useMemo 로 처리 
props 가 없다면 가능 
memo가 없다면 ?? 
함수가 문제니까 함수를 useMemo 로 처리 

hoc 고차 컴포넌트 

*/
