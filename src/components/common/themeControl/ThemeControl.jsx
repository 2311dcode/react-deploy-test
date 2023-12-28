import './ThemeControl.scss';
import { useCookie } from '../../../hooks/useCookie';
import { useRef } from 'react';

export default function ThemeControl() {
	const inputEl = useRef(null);

	const { setCookie, isCookie } = useCookie();

	if (isCookie('theme')) {
		document.body.style.setProperty('--pointColor', document.cookie.split('theme=')[1].split(';')[0]);
	}

	const changeThemeColor = () => {
		const color = inputEl.current.value;
		setCookie('theme', color, 20);
		document.body.style.setProperty('--pointColor', color);
		console.log(getComputedStyle(document.body).getPropertyValue('--pointColor'));

		return color;
	};

	return (
		<nav className='ThemeControl'>
			<input
				type='color'
				ref={inputEl}
				onChange={changeThemeColor}
				defaultValue={isCookie('theme') ? document.cookie.split('theme=')[1].split(';')[0] : 'hotpink'}
			/>
			{/* <button onClick={changeThemeColor}>theme color</button> */}
		</nav>
	);
}

/* 
작업순서 
1.클릭이벤트로 컬러팔레트에서 선택한 색상 코드 값을 쿠키로 저장 
2. App 마운트시 --pointColor에 등록된 value값을 쿠키에 있는 값으로 변경 처리 


*/
