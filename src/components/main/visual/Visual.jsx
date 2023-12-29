import './Visual.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import { useCustomText } from '../../../hooks/useText';

function Btns() {
	const swiper = useSwiper();

	useEffect(() => {
		swiper.init(0);
		swiper.slideNext(300);
		//화면로딩시 첫 슬라이드 보이게
	}, [swiper]);

	return (
		<nav className='swiperController'>
			<button
				onClick={() => {
					swiper.slideNext(300);
					swiper.autoplay.start();
				}}>
				start
			</button>
			<button onClick={() => swiper.autoplay.stop()}>stop</button>
		</nav>
	);
}

export default function Visual() {
	const { youtube } = useSelector(store => store.youtubeReducer);
	// console.log(youtube);
	const shortenText = useCustomText('shorten');
	return (
		<figure className='Visual'>
			<Swiper
				initialSlide='0'
				centeredSlides={true}
				// runCallbacksOnInit={true}
				slidesPerView={1}
				modules={[Pagination, Autoplay]}
				pagination={{
					clickable: true,
					renderBullet: (index, className) => {
						return `<span class=${className}>${index + 1}</span>`;
					}
				}}
				autoplay={{
					delay: 2000,
					//	pauseOnMouseEnter: true,
					disableOnInteraction: true
				}}
				loop={true}>
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
									<Link to={`/detail/${vid.id}`}>View Detail</Link>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
				<Btns />
			</Swiper>
		</figure>
	);
}

/* 
React에서는 swiper의 코어기능을 적용하기 위해서 useSwiper라는 hook 호출 

Swiper안쪽에서 또다른 컴포넌트를 연결해주고 그 안쪽에서 useSwiper로부터 객체생성 
해당 자식 컴포넌트 안쪽에서 생성된 객체로부터 swiper core에 등록되어있는 모든 메서드, 프로퍼티를 리액트에서도 사용가능 

*/
