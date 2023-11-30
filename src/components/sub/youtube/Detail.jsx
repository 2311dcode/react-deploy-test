import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useParams } from 'react-router-dom';

export default function Detail() {
	console.log('re-render');
	console.log('----------------');
	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);

	const fetchSingleData = async () => {
		const api_key = 'AIzaSyBvsp8axuv6QfSbIxwPL5NdNozqiGpaecU';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

		const data = await fetch(baseURL);
		const json = await data.json();
		setYoutubeData(json.items[0].snippet);
	};

	console.log(YoutubeData);

	useEffect(() => {
		console.log('useEffect');
		fetchSingleData();
	}, []);
	return (
		<Layout title={'Detail'}>
			{YoutubeData && (
				<article>
					<h3>{YoutubeData.title}</h3>
					<div className='videoBox'>
						<iframe src={`https://www.youtube.com/embed/${YoutubeData.resourceId.videoId}`} title={YoutubeData.title}></iframe>
					</div>
					<p>{YoutubeData.description}</p>
				</article>
			)}
		</Layout>
	);
}

/* 
//https://www.youtube.com/watch?v=n9DUucHpuAA
//const baseURL = `https://www.youtube.com/watch?v=${id}`;
//옵셔널 체인닝 Optional Chaining 
객체명?.property 해당객체에 값이 없을땐 무시하고 값이 있을때마나 property접근 
YoutubeData?.title
*/
