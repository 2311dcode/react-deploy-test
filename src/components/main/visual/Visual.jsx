import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Visual.scss';
import 'swiper/css';
import { useRef, useState } from 'react';

export default function Visual() {
	const { isSuccess, data } = useYoutubeQuery();
	console.log(data);

	const swiperOpt = useRef({
		loop: true,
		slidesPerView: 1,
		spaceBetween: 0,
		centeredSlides: true,
		onSwiper: swiper => swiper.slideNext(300),
		breakpoints: {
			1000: { slidesPerView: 2 },
			1400: { slidesPerView: 3 }
		}
	});

	return (
		<figure className='Visual'>
			<div className='txtBox'></div>
			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={el.id}>
								<div className='pic'>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</figure>
	);
}
