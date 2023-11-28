import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	const test = 'abcde';
	console.log(test.charAt(0)); //a
	console.log(test.slice(1, 3)); //bc
	console.log(test.slice(1)); //bcde
	console.log(test.toUpperCase());
	const [MemberTit, setMemberTit] = useState('');

	const [MemberData, setMemberData] = useState([]);

	const path = useRef(process.env.PUBLIC_URL);

	// const path = process.env.PUBLIC_URL;
	//public폴더까지의 절대경로

	const fetchDepartment = () => {
		fetch(`${path.current}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json);
				console.log('key', Object.keys(json)[0]);
				console.log('values', Object.values(json)[0]);

				console.log(json.members);
				setMemberTit(Object.keys(json)[0]);
				setMemberData(json.members);
			});
	};

	useEffect(() => {
		fetchDepartment();
	}, []);

	return (
		<Layout title={'Department'}>
			<section className='memberBox'>
				<h2>{`${MemberTit.charAt(0).toUpperCase() + MemberTit.slice(1)}`}</h2>
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
			</section>
		</Layout>
	);
}

/*
react에서 외부데이터를 가져와서 호면에 동적으로 출력하는 순서 
1.외부 가져와서 담을 빈 state추가 (보통 빈배열로 초기화) - 1번만 호출

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

객체의 property에서 key,value값 반복도는 방법 
const student ={name:'David', age:20}
//key반복돌면서 배열반환
Object.keys(student);['name','age']
Object.values(student); ['David',20]			


문자열 관련 내장 메서드 
특정문자에서 첫 단어만 대문자로 변경 
전체문자열.charAt(순서) : 전체 문자열에서 해당 순서의 문자값만 반환 
전체문자열.slice(순서1,순서2) : 전체 문자열에서 해당순서1부터 순서2(없다면 끝까지) 문자를 잘라서 반환 
전체문자열.upperCase() : 문자열을 전체 대문자로 반환 
전체문자열.lowerCase() :문자열을 전체 소문자로 반환 
전체문자열.split(구분자) : 전체문자열을 구분자를 기준으로 나눠서 배열로 반환 
배열.join('구분자') : 각 배열값을 구분자로 이어붙이면서 하나의 문자열로 반환 


중요 정보제공, 출력 state 
함수, 모션 반복 - 참조 ref 

//
*/
