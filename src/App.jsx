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
import { useDispatch, useSelector } from 'react-redux';
import * as types from './redux/actionType';

//git confige option 수정
export default function App() {
	//순서2 - dispatch함수를 활성화(추후 fetching된 데이터를 액션에 담아서 리듀서에 전달하기 위함 )
	const dispatch = useDispatch();
	useSelector(store => console.log(store));
	useEffect(() => {
		dispatch({ type: types.MEMBERS.start });
	}, [dispatch]);

	const path = useRef(process.env.PUBLIC_URL);
	const [Dark, setDark] = useState(false);
	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header Dark={Dark} setDark={setDark} Toggle={Toggle} setToggle={setToggle} />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/detail/:id' component={Detail} />
			<Route path='/welcome/:id' component={Welcome} />
			<Footer />
			{Toggle && <Menu setToggle={setToggle} />}
		</div>
	);
}
