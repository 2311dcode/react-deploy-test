import './ThemeControl.scss';

export default function ThemeControl() {
	return (
		<div className='ThemeControl'>
			<input type='color' />
			<button>theme color</button>
		</div>
	);
}

/* 
작업순서 
1.클릭이벤트로 컬러팔레트에서 선택한 색상 코드 값을 쿠키로 저장 
2. App 마운트시 --pointColor에 등록된 value값을 쿠키에 있는 값으로 변경 처리 


*/
