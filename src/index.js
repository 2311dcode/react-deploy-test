import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	Redux버전에서 숙지할 내용
	1.flickr빼고 비동기 데이터 사용 컴포넌트에서 store로 데이터 공유 (Member, History, Youtube)
	2.client side data가 store로 공유 (Modal, Memu, Dark)
	3.Layout에서 0.3초있다 on붙게 되는데 라우터이동이 0.3초보다 빨리 이동될때 optionial chaing으로 에러핸들링
	4.Contact컴포넌트에서 throttle이 적용된 throttledSetCenter resize이벤트 연결문을 따로 useEffect로 분리
*/

/* 
--redux---
	store : 어떤 컴포넌트에서든 자유롭게 데이터를 공유할 수 있게 컴포넌트 외부에 있는 독립적인 전역 데이터 공간
	reducer : store에 변경될 데이터를 전달해주는 변형자함수 (action객체를 받아야지만 데이터를 변경해서 store에 전달 가능)
	action : 컴포넌트가 리듀서에 변경요청을 의뢰할때 필요한 특별한 형태의 객체 {type: '타입', payload:'데이터'}
	dispatch : 컴포넌트에서 action객체를 전달할때는 무조건 dispatch를 통해서만 전달 가능
	selector : 컴포넌트에서 전역 store의 데이터 요청할때는 무조건 selector를 통해서만 호출 가능
*/
