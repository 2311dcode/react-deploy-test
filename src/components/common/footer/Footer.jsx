import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
	return (
		<footer className='Footer'>
			<h1>DCODELAB</h1>
			<p>2023 DECODELAB &copy; All Right Reserved.</p>
			<ul>
				<li>
					<FaFacebookF color={'hotpink'} />
				</li>
				<li>
					<FaTwitter />
				</li>
				<li>
					<FaYoutube />
				</li>
			</ul>
		</footer>
	);
}

/*
//npm install react-icons 로 설치 
react-icons 검색 
https://react-icons.github.io/react-icons/

facebook 검색 
아이콘마다의 임포트 방식 다름 
아이콘 클릭-> 코드 복사 
상단에 임포트 
import { FaFacebookF } from "react-icons/fa";
코드 입력 <FaYoutube />
*/
