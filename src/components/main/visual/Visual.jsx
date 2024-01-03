import './Visual.scss';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper';
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
		breakpoints: {
			1000: {
				sliderPerView: 2,
				spaceBetween: 50
			},
			1400: {
				sliderPerView: 3,
				spaceBetween: 50
			}
		}
	});

	return (
		<figure className='Visual'>
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
