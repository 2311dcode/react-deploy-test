import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';

export default function Department() {
	//const changeTitle = useCustomText('title');
	const combinedTitle = useCustomText('combined');
	const path = useRef(process.env.PUBLIC_URL);
	const [MemberTit, setMemberTit] = useState('');
	const [MemberData, setMemberData] = useState([]);
	const [HistoryTit, setHistoryTit] = useState('');
	const [HistoryData, setHistoryData] = useState([]);

	const fetchHistory = () => {
		fetch(`${path.current}/DB/history.json`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json);
				setHistoryTit(Object.keys(json)[0]);
				setHistoryData(Object.values(json)[0]);
			});
	};

	const fetchDepartment = () => {
		fetch(`${path.current}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				setMemberTit(Object.keys(json)[0]);
				setMemberData(Object.values(json)[0]);
			});
	};

	useEffect(() => {
		fetchHistory();
		fetchDepartment();
	}, []);

	return (
		<Layout title={'Department'}>
			<section className='historyBox'>
				<h2>{combinedTitle(HistoryTit)}</h2>
				<div className='con'>
					{/* HistoryData가 반복도는 각각의 데이터 {년도:배열} */}
					{HistoryData.map((history, idx) => {
						console.log(history); //{2016:[txt1,txt2]}
						console.log(Object.keys(history)); //[[2016]]->['2016']
						console.log(Object.keys(history)[0]); //['2016']->2016 -0번째배열값뽑아서 2016
						console.log(Object.values(history)); //[['txt1', 'txt2']]
						console.log(Object.values(history)[0]); //['txt1', 'txt2']

						return (
							<article key={history + idx}>
								{/* 현재 반복도는 객체의 key값을 h3로 출력 2016 */}
								<h3>{Object.keys(history)}</h3>
								<ul>
									{Object.values(history)[0].map((list, idx) => {
										return <li key={list + idx}>{list}</li>;
									})}
								</ul>
							</article>
						);
					})}
				</div>
			</section>
			<section className='memberBox'>
				<h2>{combinedTitle(MemberTit)}</h2>
				<div className='con'>
					{MemberData.map((member, idx) => {
						return (
							<article key={member + idx}>
								<div className='pic'>
									<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
								</div>
								<h3>{member.name}</h3>
								<p>{member.position}</p>
							</article>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}

/*
	React에서 외부데이터를 가져와서 화면에 동적으로 출력하는 순서
	1. 외부 가져와서 담을 빈 State추가 (보통 빈배열로 초기화)
	2. fetch문을 이용해서 특정 URL의 데이터를 가져온뒤 동기적으로 배열로 뽑은 뒤 state에 담아주는 함수 정의
	3. 위에서 만든 함수를 의존성 배열이 비어있는 useEffect문 안쪽에서 호출 
	4. State에 담겨있는 Data 배열값을 map으로 반복돌면서 JSX구문 생성

	객체의 property에서 key, value값 반복도는 방법
	const student = {name: 'David', age:20}
	//key반복 돌면서 배열반환
	Object.keys(student); ['name','age'];
	Object.values(student); ['David',20];

	
	//문자열 관련 내장 메서드
	전체문자열.charAt(순서) :전체문자열에서 해당 순서의 문자값만 반환
	전체문자열.slice(순서1, 순서2) : 전체 문자열에서 해당 순서1부터 순서2위치까지 문자를 잘라서 반환
	전체문자열.upperCase() : 문자열을 전체 대문자로 반환
	전체문자열.lowerCase() : 문자열을 전체 소문자로 반환
	전체문자열.split(구분자) : 전체문자열을 구분자를 기준으로 나눠서 배열로 반환
	배열.join('구분자') : 각 배열값을 구분자로 이어붙이면서 하나의 문자열로 반환
*/

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
	const test = 'abcde';
	console.log(test.charAt(0)); //a
	console.log(test.slice(1, 3)); //bc
	console.log(test.slice(1)); //bcde
	console.log(test.toUpperCase());

중요 정보제공, 출력 state 
함수, 모션 반복 - 참조 ref 

//
*/
