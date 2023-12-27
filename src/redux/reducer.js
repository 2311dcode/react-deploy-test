// import { combineReducers } from 'redux';
// import * as types from './action';

// const memberReducer = (state = { members: [] }, action) => {
// 	switch (action.type) {
// 		case types.MEMBER.success:
// 			return { ...state, members: action.payload };
// 		default:
// 			return state;
// 	}
// };

// const historyReducer = (state = { history: [] }, action) => {
// 	switch (action.type) {
// 		case types.HISTORY.success:
// 			return { ...state, history: action.payload };
// 		default:
// 			return state;
// 	}
// };

// const youtubeReducer = (state = { youtube: [] }, action) => {
// 	switch (action.type) {
// 		case types.YOUTUBE.success:
// 			return { ...state, youtube: action.payload };
// 		case types.YOUTUBE.fail:
// 			return { ...state, youtube: action.payload };
// 		default:
// 			return state;
// 	}
// };

// const modalReducer = (state = { modal: false }, action) => {
// 	switch (action.type) {
// 		case types.MODAL.start:
// 			return { ...state, modal: action.payload };
// 		default:
// 			return state;
// 	}
// };

// const menuReducer = (state = { menu: false }, action) => {
// 	switch (action.type) {
// 		case types.MENU.start:
// 			return { ...state, menu: action.payload };
// 		default:
// 			return state;
// 	}
// };

// const reducers = combineReducers({ memberReducer, historyReducer, youtubeReducer, modalReducer, menuReducer });
// export default reducers;

// /*
// 외부 비동기데이터(서버사이드데이터)를 전역 store에 저장할떄 dispatch와 action객체가 필요한 이유
// --
// 지금 구조는 실무에서 쓰이기 힘듬
// 원래 데이터는 자체 DB이든 외부API데이터이든 어쨌든 fetching을 통해서 외부데이터를 가져와야 됨
// 그래서 위와 같이 reducer안쪽에 초기데이터를 설정하는 것이 불가능

// dispatch로 외부데이터를 fetching후 전역state에 담는 순서
// 1.컴포넌트에서 useEffect로 mount시 fetching함수 호출후 데이터 반환
// 2.해당 데이터를 지역state에 담는 것이 아닌 action객체의 payload에 담아서 dispatch로 reducer에 전달
// 3.아래 리듀서 함수 로직에 의해서 fetchying된 데이터가 store에 전달되고
// 4.이후 각 컴포넌트에서 useSelector로 해당 데이터에 자유롭게 접근 가능
// */
// /*
// const initMember = {
// 	members: [
// 		{
// 			name: 'David',
// 			position: 'President',
// 			pic: 'member1.jpg'
// 		},
// 		{
// 			name: 'Julia',
// 			position: 'Vice President',
// 			pic: 'member2.jpg'
// 		},
// 		{
// 			name: 'Emily',
// 			position: 'UI Designer',
// 			pic: 'member3.jpg'
// 		},
// 		{
// 			name: 'Michael',
// 			position: 'Front-end Developer',
// 			pic: 'member4.jpg'
// 		},
// 		{
// 			name: 'Emma',
// 			position: 'Back-end Developer',
// 			pic: 'member5.jpg'
// 		},
// 		{
// 			name: 'Peter',
// 			position: 'Project Manager',
// 			pic: 'member6.jpg'
// 		}
// 	]
// };
// */
// //초기 데이터값을 state로 지정하고 추후 action객체가 넘어오면 action의 타입에 따라서 해당 데이터를 변경해주는 변형자함수
// //{type:"SET_MEMBERS", payload:[변경할 데이터배열]}
// /*
// const memberReducer = (state = initMember, action) => {
// 	if (action.type === 'SET_MEMBERS') {
// 		return { ...state, members: action.payload };
// 	} else {
// 		return state;
// 	}
// };
// */

// /*
// 컴포넌트에서 정보값을 받아서
// 가져오거나 변경요청하는 역할
// action 객체가 필요
// 은향 츌금시 출금양식처럼
// 일정양식에 맞는 틀 역할
// 타입 페이로드 에 따라 바꿔치기
// */
