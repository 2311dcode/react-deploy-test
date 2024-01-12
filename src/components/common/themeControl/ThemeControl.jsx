import './ThemeControl.scss';
import { useCookie } from '../../../hooks/useCookie';
import { useCallback, useEffect, useRef } from 'react';
import { useThrottle } from '../../../hooks/useThrottle';

export default function ThemeControl() {
	const inputEl = useRef(null);

	const { setCookie, isCookie } = useCookie();

	const getThemeColor = useCallback(() => {
		isCookie('theme')
			? document.body.style.setProperty('--pointColor', document.cookie.split('theme=')[1].split(';')[0])
			: document.body.style.setProperty('--pointColor', getComputedStyle(document.body).getPropertyValue('--pointColor'));
		inputEl.current.value = document.body.style.getPropertyValue('--pointColor');
	}, [isCookie]);

	const changeThemeColor = () => {
		console.log('changeColor');
		const color = inputEl.current.value;

		document.body.style.setProperty('--pointColor', color);
		setCookie('theme', color, 60 * 60 * 24);
		inputEl.current.value = color;
	};
	const throttledChangeTheme = useThrottle(changeThemeColor, 300);

	useEffect(() => {
		getThemeColor();
	}, [getThemeColor]);

	return (
		<nav className='ThemeControl'>
			{/* <input type='color' ref={inputEl} onChange={changeThemeColor} /> */}
			<input
				type='color'
				ref={inputEl}
				onChange={throttledChangeTheme}
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
