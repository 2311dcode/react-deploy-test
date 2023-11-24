import './Layout.scss';

export default function Layout({ children, title }) {
	return (
		<main className={`Layout ${title}`}>
			<h1>{title}</h1>
			<div className='bar'></div>
			{/*Layout 컴포넌트로 감싼 컨텐츠 내용이 아래 children위치에 출력됨  */}
			{children}
		</main>
	);
}

/*
부모태그 안쪽 컨텐츠가 children으로 받아짐 

*/
