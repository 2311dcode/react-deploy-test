import { combineReducers } from 'redux';

/* 
순서1- 리듀서 함수 호출되면서 빈배열로 멤버 데이터가 저장될 state값 초기화 
*/
const memberReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const historyReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_HISTORY':
			return { ...state, history: action.payload };
		default:
			return state;
	}
};

const youtubeReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_YOUTUBE':
			return { ...state, youtube: action.payload };
		case 'SET_YOUTUBE_ERR':
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const modalReducer = (state = [], action) => {
	switch (action.type) {
		case type.MODAL.start:
			return { ...state, modal: action.payload };

		default:
			return state;
	}
};

//해당파일에서 내보내는 여러개의 reducer객체를 합쳐서 외부로 export -combineReducers

const reducers = combineReducers({ memberReducer, historyReducer, youtubeReducer, modalReducer });
export default reducers;

/* 
외부 비동기데이터(서버사이드데이터)를 전역 store에 저장할떄 dispatch와 action객체가 필요한 이유
--
지금 구조는 실무에서 쓰이기 힘듬 
원래 데이터는 자체 DB이든 외부API데이터이든 어쨌든 fetching을 통해서 외부데이터를 가져와야 됨 
그래서 위와 같이 reducer안쪽에 초기데이터를 설정하는 것이 불가능 

dispatch로 외부데이터를 fetching후 전역state에 담는 순서
1.컴포넌트에서 useEffect로 mount시 fetching함수 호출후 데이터 반환 
2.해당 데이터를 지역state에 담는 것이 아닌 action객체의 payload에 담아서 dispatch로 reducer에 전달 
3.아래 리듀서 함수 로직에 의해서 fetchying된 데이터가 store에 전달되고 
4.이후 각 컴포넌트에서 useSelector로 해당 데이터에 자유롭게 접근 가능 
*/
/*
const initMember = {
	members: [
		{
			name: 'David',
			position: 'President',
			pic: 'member1.jpg'
		},
		{
			name: 'Julia',
			position: 'Vice President',
			pic: 'member2.jpg'
		},
		{
			name: 'Emily',
			position: 'UI Designer',
			pic: 'member3.jpg'
		},
		{
			name: 'Michael',
			position: 'Front-end Developer',
			pic: 'member4.jpg'
		},
		{
			name: 'Emma',
			position: 'Back-end Developer',
			pic: 'member5.jpg'
		},
		{
			name: 'Peter',
			position: 'Project Manager',
			pic: 'member6.jpg'
		}
	]
};
*/
//초기 데이터값을 state로 지정하고 추후 action객체가 넘어오면 action의 타입에 따라서 해당 데이터를 변경해주는 변형자함수
//{type:"SET_MEMBERS", payload:[변경할 데이터배열]}
/*
const memberReducer = (state = initMember, action) => {
	if (action.type === 'SET_MEMBERS') {
		return { ...state, members: action.payload };
	} else {
		return state;
	}
};
*/

/* 
컴포넌트에서 정보값을 받아서 
가져오거나 변경요청하는 역할 
action 객체가 필요 
은향 츌금시 출금양식처럼 
일정양식에 맞는 틀 역할 
타입 페이로드 에 따라 바꿔치기  
*/
