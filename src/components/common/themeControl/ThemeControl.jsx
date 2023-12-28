import './ThemeControl.scss';
import { useCookie } from '../../../hooks/useCookie';
import { useCallback, useEffect, useRef } from 'react';

export default function ThemeControl() {
	const inputEl = useRef(null);

	const { setCookie, isCookie } = useCookie();

	//초기 마운트시 쿠키가 있으면 쿠키에 등록된 값을 --pointColor변수에 할당하고
	//그렇지 않으면 scss에 등록되어 있는 값을 --pointColor변수에 재할당
	//어떤경우던 이후부터는 무조건 document.body.style.getPropertyValue로 현재 theme색상값 호출해서 변경가능
	//변경된 색상값으로 input요소에 value색상도 변경처리
	const getThemeColor = useCallback(() => {
		isCookie('theme')
			? document.body.style.setProperty('--pointColor', document.cookie.split('theme=')[1].split(';')[0])
			: document.body.style.setProperty('--pointColor', getComputedStyle(document.body).getPropertyValue('--pointColor'));
		inputEl.current.value = document.body.style.getPropertyValue('--pointColor');
	}, [isCookie]);

	//토글 버튼 클릭시마다
	//현재 input요소에 선택된 value값으로 쿠키에 저장하고 css변수값에도 재할당
	//그리고 input요소의 초기값도 다시 변경처리

	const changeThemeColor = () => {
		const color = inputEl.current.value;

		document.body.style.setProperty('--pointColor', color);
		setCookie('theme', color, 20);
		inputEl.current.value = color;
	};

	//초기 마운트시에 컬러테마 쿠키값 유무에 따라 변수값 처리
	useEffect(() => {
		getThemeColor();
	}, [getThemeColor]);

	return (
		<nav className='ThemeControl'>
			{/* <input type='color' ref={inputEl} onChange={changeThemeColor} /> */}
			<input
				type='color'
				ref={inputEl}
				onChange={changeThemeColor}
				defaultValue={isCookie('theme') ? document.cookie.split('theme=')[1] : '#ff69b4'}
			/>
			{/* <button onClick={changeThemeColor}>theme color</button> */}
		</nav>
	);
}

/* 
<input
type='color'
ref={inputEl}
onChange={changeThemeColor}
defaultValue={isCookie('theme') ? document.cookie.split('theme=')[1] : '#ff69b4'}
/>

			
작업순서 
1.클릭이벤트로 컬러팔레트에서 선택한 색상 코드 값을 쿠키로 저장 
2. App 마운트시 --pointColor에 등록된 value값을 쿠키에 있는 값으로 변경 처리 


//skku1006
//미션1 - 테마초기화버튼 생성한뒤 해당 버튼 클릭시 css변수에 등록되어 있는 색상값으로 초기화
//미션2 - Dark모드의 값도 쿠키에 등록을 해서 한번 설정된 값으로 유지되도록 처리

*/
