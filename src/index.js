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
/*
redux 작업흐름
	1. redux폴더 안쪽에 store생성하는 함수, 리듀서함수, actionType문자열 저장객체를 준비
	2. index.js에서 redux폴더 안쪽에서 생성한 store객체를 Provider컴포넌트를 통해서 App에 전달 (모든 컴포넌트는 store에 useSelector훅으로 접근 가능)
	3. 루트컴포넌트인 App이 마운트되자마자 비동기데이터를 fetching후 action객체에 액션타입과같이 담아주고 dispatch로 리듀서함수에 전달
	4. 리듀서함수가 컴포넌트로부터 전달된 action객체의 타입을 확인해서 같이 전달된 payload값으로 store에 데이터를 변경처리
	5. 단 클라이언트데이터는 애초에 리듀서함수에서 초기값설정에서 store 저장


	해당 리덕스를 사용한 이유
	- 서브 컴포넌트에서 활용하는 회사정보, 연혁정보, 유튜브, 플리커같은 정보값을 메인컴포넌트에 미리 보기 형식을 출력
	- 같은 데이터를 활용하는데 다시 re-fetching은 비효율적, props으로 전달하기에는 컴포넌트가 지저분해져서 전역데이터 관리에 관심 생김
	- redux를 활용해서 루트컴포넌트인 App이 마운트시 전역으로 관리할 모든 클라이언트, 서버 사이드 데이터를 전역에 담아서 활용
	- 클라이언트사이드 데이터와 자주 갱신될 필요가 없는 연혁, 멤버정보, 유튜트데이터 같은 비동기 서버사이드 데이터는 redux로 전역관리하는데 문제가 없었지만 사용자이벤트에 의해서 수시로 변경이 되야 되는 flickr 데이터같은 경우는 redux로 관리하기에 한계점을 느낌
	- redux에서는 api함수를 여러 컴포넌트에서 공유해서 쓸수 있는 방법이 없기 때문에 App에서 API함수를 정의해서 fetching한뒤 액션객체 생성해야되고 갤러컴포넌트안쪽에서 똑같은 API함수를 생성해도 매번 action객체를 전달해야되는 번거로움 생김
	- (redux-saga브랜치에서 redux-saga방식으로 해당 문제점 개선 p.100)


	Redux를 활용해 전역 상태관리가 필요한 이유
	- 리액트는 기본적으로 단방향 데이터 바인딩이기 때문에 부모에서 직계 자식컴포넌트로만 props를 전달 가능
	- 특정 지역 state정보값을 여러 컴포넌트에서 공유해야되는 경우 props통해서만 전달가능하기 때문에 데이터전달을 위한 로직이 복잡해짐
	- 컴포넌트 외부에서 독립적으로 동작하는 전역 state를 생성한뒤 아무리 depth가 깊은 자식 컴포넌트에서도 전역 state접근하고 데이터 변경요청을 할 수 있도록 하기위한 개발 방법론
	- context API를 활용한 외부 라이브러리
	- context API: GlobalContext 전역 객체를 생성해서 해당 전역객체를 하위 요소에서 구독하면서 액션이라는 객체를 통해서 전역객체를 변경요청처리 할수 있게 해주는 API
	- react에서는 contextAPI를 활용한 (createContext, useContext)내장 함수와 훅이 준비가 되어 있음
	- 위의 기능을 좀더 쓰기 편하도록 라이브러리화한게 redux
	- store(전역state가 담기는 객체), reducer(전역 state를 변경할 수 있는 변형자 함수), action(리듀서가 store데이터를 변경하기 위한 특별한 형태의 객체 {type, payload}), dipatch(컴포넌트에서 생성된 액션객체를 리듀서로 전달해주는 역할)
	- store, reducer, action은 컴포넌트 외부에서 독립적으로 동작해야 되므로 부수효과를 발생시키지 않는 순수함수형태로 로직이 처리되야함

	- 순수함수: 동일한 인수가 전달되었을때 동일한 리턴값을 반환하는 부수효과를 발생시키지 않는 함수
	- 부수효과: 순수자바스크립트 기능이 아닌 외부요인으로 예상치 못한 리턴값을 반환하는 현상


	자식컴포넌트에 부모컴포넌트로 값을 역으로 전달하는 방법
	- 부모에서 빈state를 생성하고 자식컴포넌트에서 state변경함수를 props로 전달해서 자식 컴포넌트에 담은 state를 부모에서 활용
	- forwardRef(hoc: 고차컴포넌트) 생성함수
	- forwardRef(특정컴포넌트 반환함수) => 특정컴포넌트 함수를 인수로 받아서 새로운 컴포넌트 반환
	- frowardRef를 쓰는 이유는 특정 자식컴포넌트를 호출하는 부모컴포넌트에게 통채로 자기자신을 forwarding (상위로 전달)처리
	- forwardRef로 생성된 고차컴포넌트는 내부적으로 useImperativeHandle이라는 내장훅 사용 가능
	- 특정 컴포넌트안쪽에 있는 특정 정보값을 객체로 묶어서 부모컴포넌트에게 역으로 전달가능
*/
