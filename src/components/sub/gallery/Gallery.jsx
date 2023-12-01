import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';

export default function Gallery() {
	const [Pics, setPics] = useState([]);

	const fetchFlickr = async () => {
		const num = 500;
		const flickr_api = '78939f1ef402bce6ea05861acf0b4676';
		const method_interest = 'flickr.interestingness.getList';
		const baseURL = 'https://www.flickr.com/services/rest/?method=';
		const resultURL = `${baseURL}${method_interest}&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1`;

		const data = await fetch(resultURL);
		const json = await data.json();
		console.log(json.photos.photo);

		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchFlickr();
	}, []);
	return (
		<Layout title={'Gallery'}>
			{Pics.map((pic, idx) => {
				return (
					<article key={pic.id}>
						<h2>{pic.id}</h2>
					</article>
				);
			})}
		</Layout>
	);
}

/* 
https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value
flickr.interestingness.getList
*/
