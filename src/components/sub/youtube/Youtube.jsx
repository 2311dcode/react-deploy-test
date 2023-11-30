import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect } from 'react';
import { useCustomText } from '../../../hooks/useText';

export default function Youtube() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');
	const [Vids, setVids] = useState([]);

	//promise then구문을 async await로 변경하기 위한 조건 2가지
	//조건1 - promise반환 함수를 감싸주는 wrapping함수 필요 (async)
	//조건2 - await문은 promise반환 함수에만 지정가능

	const fetchYoutube = async () => {
		const api_key = 'AIzaSyBvsp8axuv6QfSbIxwPL5NdNozqiGpaecU';
		const pid = 'PLYOPkdUKSFgWqafuDQN9di3uLJoTV3L3W';
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		try {
			const data = await fetch(baseURL); //data
			const json = await data.json(); //data.json()
			setVids(json.items);
			console.log(Vids);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<Layout title={'Youtube'}>
			{Vids.map((data, idx) => {
				const [date, time] = data.snippet.publishedAt.split('T');

				return (
					<article key={data.id}>
						<h2>{shortenText(data.snippet.title, 50)}</h2>

						<div className='txt'>
							<p>{shortenText(data.snippet.description, 250)}</p>
							<div className='infoBox'>
								<span>{customText(date, '.')}</span>
								<em>{time.split('Z')[0]}</em>
							</div>
						</div>

						<div className='pic'>
							<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
						</div>
					</article>
				);
			})}
		</Layout>
	);
}

/* 
https://console.cloud.google.com/apis/credentials?project=evident-pipe-345413

// AIzaSyBvsp8axuv6QfSbIxwPL5NdNozqiGpaecU
 

	const fetchYoutube = async () => {
		~
		~
    //비교 fetch then
		// 	fetch(baseURL)
		// .then((data) => data.json())
		// .then((json) => {
		// 	setVids(json.items);
		// 	console.log(Vids);
		// });

		//고도화 
		const data = await fetch(baseURL);
		const json = await data.json();
		setVids(json.items);
		console.log(Vids);
	};	 
}

*/
