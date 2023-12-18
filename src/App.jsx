import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Footer from './components/common/footer/Footer';
import Members from './components/sub/members/Members';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Youtube from './components/sub/youtube/Youtube';
import Detail from './components/sub/youtube/Detail';
import Menu from './components/common/menu/Menu';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useMedia } from './hooks/useMedia';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as types from './redux/action';

//git confige option 수정
export default function App() {
	//순서2 - dispatch함수를 활성화(추후 fetching된 데이터를 액션에 담아서 리듀서에 전달하기 위함 )
	const dispatch = useDispatch();
	const path = useRef(process.env.PUBLIC_URL);
	const [Dark, setDark] = useState(false);

	//순서3 - fetching된 데이터값을 받아서 액션객체에 담은 뒤 dispatch로 리듀서에 전달하는 함수를 정의
	const fetchDepartment = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		dispatch({ type: types.MEMBER.success, payload: json.members });
	}, [dispatch]);

	const fetchHistory = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/history.json`);
		const json = await data.json();
		dispatch({ type: types.HISTORY.success, payload: json.history });
	}, [dispatch]);

	const fetchYoutube = useCallback(async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			dispatch({ type: types.YOUTUBE.success, payload: json.items });
		} catch (err) {
			dispatch({ type: types.YOUTUBE.fail, payload: err });
		}
	}, [dispatch]);

	/*
	//순서4- 컴포넌트가 처음 마운트 되었을 때 함수를 호출해서 비동기 데이터를 리듀서에 전달 
	render1 - 전역 store의 값 빈배열 
	render2 - 그때 비로소 각 컴포넌트에서 useSelector에 해당 비동기 데이터를 접근 가능 
	*/
	useEffect(() => {
		fetchDepartment();
		fetchHistory();
		fetchYoutube();
	}, [fetchDepartment, fetchHistory, fetchYoutube]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header Dark={Dark} setDark={setDark} />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/detail/:id' component={Detail} />
			<Footer />
			<Menu />
		</div>
	);
}
