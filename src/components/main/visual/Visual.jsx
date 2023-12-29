import './Visual.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useCustomText } from '../../../hooks/useText';

export default function Visual() {
	const { youtube } = useSelector(store => store.youtubeReducer);
	const shortenText = useCustomText('shorten');
	const swiperRef = useRef(null);
	//swiper pagination option
	const swiperOption = useRef({
		modules: [Pagination, Autoplay],
		pagination: { clickable: true, renderBullet: (index, className) => `<span class=${className}>${index + 1}</span>` },
		autoplay: { delay: 2000, disableOnInteraction: true },
		loop: true
	});

	return (
		<figure className='Visual'>
			{/* <Swiper modules={[Pagination, Autoplay]} pagination={pagination.current} autoplay={autoplay.current} loop={true}> */}
			<Swiper {...swiperOption.current}>
				{youtube.map((vid, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={vid.id}>
							<div className='inner'>
								<div className='picBox'>
									<p>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</p>
									<p>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</p>
								</div>
								<div className='txtBox'>
									<h2>{shortenText(vid.snippet.title, 50)}</h2>
									<Link to={`/detail/${vid.id}`} onMouseEnter={swiperRef.current?.autoplay?.stop} onMouseLeave={swiperRef.current?.autoplay?.start}>
										<span></span>View Detail
									</Link>
								</div>
							</div>
						</SwiperSlide>
					);
				})}

				<Btns swiperRef={swiperRef} />
			</Swiper>
		</figure>
	);
}

//Swiper control child component
function Btns({ swiperRef }) {
	swiperRef.current = useSwiper();

	return (
		<nav className='swiperController'>
			<button
				onClick={() => {
					swiperRef.current.slideNext(300);
					swiperRef.current.autoplay.start();
				}}>
				start
			</button>
			<button onClick={() => swiperRef.current.autoplay.stop()}>stop</button>
		</nav>
	);
}

/*
	React에서 Swiper의 코어기능을 적용하기 위해서는 useSwiper라는 hook호출
	Swiper안쪽에서 또다른 컴포넌트를 연결해주고 그 안쪽에서 useSwiper로 부터 객체생성
	해당 자식 자식 컴포넌트 안쪽에서 생성된 객체로부터 swiper core에 등록되어 있는 모든 메서드, 프로퍼티를 리액트에서도 사용가능
*/

/* 
React에서는 swiper의 코어기능을 적용하기 위해서 useSwiper라는 hook 호출 

Swiper안쪽에서 또다른 컴포넌트를 연결해주고 그 안쪽에서 useSwiper로부터 객체생성 
해당 자식 컴포넌트 안쪽에서 생성된 객체로부터 swiper core에 등록되어있는 모든 메서드, 프로퍼티를 리액트에서도 사용가능 

*/
