import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import './Gallery.scss';
import { LuSearch } from 'react-icons/lu';

export default function Gallery() {
	// console.log('re-render');
	const myID = useRef('187597869@N08');
	//isUser의 초기값을 내 아이디 문자값으로 등록
	const isUser = useRef(myID.current);
	const refNav = useRef(null);
	const refFrameWrap = useRef(null);
	const gap = useRef(20);

	const [Pics, setPics] = useState([]);
	const [Open, setOpen] = useState(false);
	const activateBtn = (e) => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};

	const handleInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		//Interest함수 호출시 isUser값을 빈문자열로 초기화 (false로 인식되는 값)
		isUser.current = '';
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};

	const handleMine = (e) => {
		//꼭 찍어서 isUser의 값과 myID값이 동일할때만 함수 중지
		//마이갤러리 함수 호출시에는 isUser의 문자값이 담겨있다고 하더라도 내아이디와 똑같지 않으면 핸들러 함수를 실행하게 처리
		//다른사용자갤러리를 갔다가 다시 마이갤러리호출시 이미 다른 사용자 아이디가 담겨있기 때문에 내 갤러리가 호출되지 않는 문제를 해결
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID.current });
	};

	const handleUser = (e) => {
		//isUser값이 비어있기만 하면 중지
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};
	const handleSearch = (e) => {
		//기본 submit이벤트는 전송기능이기 때문에 무조건 화면이 새로고침됨
		//전송을 할것이 아니라 리액트로 추가 로직구현을 할 것이므로 기본 전송기능 막음
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;
		if (!keyword.trim()) return;
		e.target.children[0].value = '';

		fetchFlickr({ type: 'search', keyword: keyword });
	};
	const fetchFlickr = async (opt) => {
		const num = 50;

		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const interestURL = `${baseURL}${method_interest}`;
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
		const searchURL = `${baseURL}${method_search}&privacy_filter=1&safe_search=1&tags=${opt.keyword}`;
		let url = '';
		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);
		opt.type === 'search' && (url = searchURL);

		const data = await fetch(url);
		const json = await data.json();

		/* if (json.photos.photo.length === 0) {
			return alert('해당 검색어의 결과값이 없습니다');
		} */

		setPics(json.photos.photo);
	};

	const [Index, setIndex] = useState(0);

	useEffect(() => {
		// fetchFlickr({ type: 'user', id: myID.current });
		// fetchFlickr({ type: 'search', keyword: 'landscape' });
		fetchFlickr({ type: 'user', id: myID.current });
	}, []);

	return (
		<>
			<Layout title={'Gallery'}>
				<article className='controls'>
					<nav className='btnSet' ref={refNav}>
						<button onClick={handleInterest}>Interest Gallery</button>
						<button className='on' onClick={handleMine}>
							My Gallery
						</button>
					</nav>
					<form onSubmit={handleSearch}>
						<input type='text' placeholder='Search' />
						<button className='btnSearch'>
							<LuSearch />
						</button>
					</form>
				</article>

				<section className='frameWrap' ref={refFrameWrap}>
					<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: gap.current }}>
						{Pics.length === 0 ? (
							<h2>해당검색어의 결과값이 없습니다</h2>
						) : (
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div
											className='pic'
											onClick={() => {
												setOpen(true);
												setIndex(idx);
											}}
										>
											<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
										</div>
										<h2>{pic.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt='사용자 프로필 이미지'
												onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/>
											<span onClick={handleUser}>{pic.owner}</span>
										</div>
									</article>
								);
							})
						)}
					</Masonry>
				</section>
			</Layout>

			<Modal Open={Open} setOpen={setOpen}>
				{Pics.length !== 0 && (
					<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
				)}
			</Modal>
		</>
	);
}
