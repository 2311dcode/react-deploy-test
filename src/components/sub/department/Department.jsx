import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	const [MemberData, setMemberData] = useState([]);
	const path = process.env.PUBLIC_URL;
	//public폴더까지의 절대경로
	const fetchDepartment = () => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.members);
				setMemberData(json.members);
			});
	};

	useEffect(() => {
		fetchDepartment();
	}, []);

	return (
		<Layout title={'Department'}>
			{MemberData.map((member, idx) => {
				return (
					<article key={member + idx}>
						<div className='pic'>
							<img src={`${path}/img/${member.pic}`} alt={member.name} />
						</div>
						<h2>{member.name}</h2>
						<p>{member.position}</p>
					</article>
				);
			})}
		</Layout>
	);
}

/*
react에서 외부데이터를 가져와서 호면에 동적으로 출력하는 순서 
1.외부 가져와서 담을 빈 state추가 (보통 빈배열로 초기화)

2.fetch문을 이용해서 특정 url의 데이터를 가져온뒤 동기적으로 배열로 뽑은 뒤 state에 담아주는 함수 정의 

3.위에서 만든 함수를 의존성배열이 비어있는 useEffect문 안쪽에서 호출 (다음번 렌더링 타이밍에 state값 활용가능 )
4.state에 담겨있는 data 배열값을 map으로 반복돌면서 JSX구문 생상 

--const [MemberData, setMemberData] = useState([]);
--const path = process.env.PUBLIC_URL;
	//public폴더까지의 절대경로
	const fetchDepartment = () => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.members);
				setMemberData(json.members);
			});
	};
--useEffect(() => {
		fetchDepartment();
	}, []);
--{MemberData.map((member, idx) => {
				return (
					<div key={member + idx}>
						<h2>{member.name}</h2>
					</div>
				);
			})}
*/
