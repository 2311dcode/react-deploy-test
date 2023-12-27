import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Members from './components/sub/members/Members';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Youtube from './components/sub/youtube/Youtube';
import { Route } from 'react-router-dom';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useState } from 'react';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';
import Welcome from './components/sub/members/Welcome';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//git confige option 수정
export default function App() {
	const [Dark, setDark] = useState(false);
	const [Toggle, setToggle] = useState(false);
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
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
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
