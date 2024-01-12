import { useDebounce } from '../../../hooks/useDebounce';
import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Members() {
	const history = useHistory();
	const initVal = useRef({ userid: '', pwd1: '', pwd2: '', email: '', comments: '', edu: '', gender: '', interest: [] });
	const [Val, setVal] = useState(initVal.current);
	//useDebouce 훅의 인수로 특정 state를 전달해서 debouncing이 적용된 새로운 state값 반환받음
	const DebouncedVal = useDebounce(Val);
	const [Errs, setErrs] = useState({});

	const handleReset = () => {
		setVal(initVal.current);
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = e => {
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');
		const checkArr = [];
		inputs.forEach(input => input.checked && checkArr.push(input.value));
		setVal({ ...Val, [name]: checkArr });
	};

	const check = value => {
		const errs = {};
		const num = /[0-9]/;
		const txt = /[a-zA-Z]/;
		const spc = /[!@#$%^&*()[\]_.+]/;
		const [m1, m2] = value.email.split('@');
		const m3 = m2 && m2.split('.');

		if (value.userid.length < 5) errs.userid = '아이디는 최소 5글자 이상 입력하세요';
		if (value.comments.length < 10) errs.comments = '남기는 말은 최소 10글자 이상 입력하세요';
		if (!value.gender) errs.gender = '성별을 선택하세요';
		if (value.interest.length === 0) errs.interest = '관심사를 하나이상 선택하세요.';
		if (!value.edu) errs.edu = '최종학력을 선택하세요.';
		if (value.pwd1 !== value.pwd2 || !value.pwd2) errs.pwd2 = '두개의 비밀번호를 같게 입력하세요.';
		if (!m1 || !m2 || !m3[0] || !m3[1]) errs.email = '올바른 이메일 형식으로 입력하세요';
		if (!num.test(value.pwd1) || !txt.test(value.pwd1) || !spc.test(value.pwd1) || value.pwd1.length < 5)
			errs.pwd1 = '비밀번호는 특수문자, 문자, 숫자를 모두포함해서 5글자 이상 입력하세요.';

		return errs;
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (Object.keys(check(Val)).length === 0) {
			alert('회원가입을 축하합니다.');
			history.push('/welcome/3');
		}
	};

	//debounding이 적용된 state를 의존성배열에 등록해서
	//해당 값으로 check함수 호출
	useEffect(() => {
		setErrs(check(DebouncedVal));
	}, [DebouncedVal]);

	return (
		<Layout title={'Members'}>
			<div className='wrap'>
				<div className='infoBox'>
					<h2>Join Members</h2>
				</div>

				<div className='formBox'>
					<form onSubmit={handleSubmit}>
						<fieldset>
							<legend className='h'>회원가입 폼</legend>
							<table>
								<tbody>
									{/* userid, email */}
									<tr>
										<td>
											<input type='text' name='userid' placeholder='User ID' value={Val.userid} onChange={handleChange} />
											{Errs.userid && <p>{Errs.userid}</p>}
										</td>
										<td>
											<input type='text' name='email' placeholder='Email' value={Val.email} onChange={handleChange} />
											{Errs.email && <p>{Errs.email}</p>}
										</td>
									</tr>

									{/* pwd1, pwd2 */}
									<tr>
										<td>
											<input type='password' name='pwd1' placeholder='Password' value={Val.pwd1} onChange={handleChange} />
											{Errs.pwd1 && <p>{Errs.pwd1}</p>}
										</td>
										<td>
											<input type='password' name='pwd2' placeholder='Re-Password' value={Val.pwd2} onChange={handleChange} />
											{Errs.pwd2 && <p>{Errs.pwd2}</p>}
										</td>
									</tr>

									{/* edu */}
									<tr>
										<td colSpan='2'>
											<select name='edu' onChange={handleChange}>
												<option value=''>Education</option>
												<option value='elementary-school'>초등학교 졸업</option>
												<option value='middle-school'>중학교 졸업</option>
												<option value='high-school'>고등학교 졸업</option>
												<option value='college'>대학교 졸업</option>
											</select>
											{Errs.edu && <p>{Errs.edu}</p>}
										</td>
									</tr>

									{/* gender */}
									<tr>
										<td colSpan='2'>
											<input type='radio' defaultValue='female' id='female' name='gender' onChange={handleChange} />
											<label htmlFor='female'>Female</label>

											<input type='radio' defaultValue='male' id='male' name='gender' onChange={handleChange} />
											<label htmlFor='male'>Male</label>
											{Errs.gender && <p>{Errs.gender}</p>}
										</td>
									</tr>

									{/* interests */}
									<tr>
										<td colSpan='2'>
											<input type='checkbox' name='interest' id='sports' defaultValue='sports' onChange={handleCheck} />
											<label htmlFor='sports'>Sports</label>

											<input type='checkbox' name='interest' id='reading' defaultValue='reading' onChange={handleCheck} />
											<label htmlFor='reading'>Reading</label>

											<input type='checkbox' name='interest' id='music' defaultValue='music' onChange={handleCheck} />
											<label htmlFor='music'>Music</label>

											<input type='checkbox' name='interest' id='game' defaultValue='game' onChange={handleCheck} />
											<label htmlFor='game'>Game</label>
											{Errs.interest && <p>{Errs.interest}</p>}
										</td>
									</tr>

									{/* comments  */}
									<tr>
										<td colSpan='2'>
											<textarea
												name='comments'
												cols='30'
												rows='5'
												placeholder='Leave a comment'
												value={Val.comments}
												onChange={handleChange}></textarea>
											{Errs.comments && <p>{Errs.comments}</p>}
										</td>
									</tr>

									{/* button set */}
									<tr>
										<td colSpan='2'>
											<input type='reset' value='Cancel' onClick={handleReset} />
											<input type='submit' value='Submit' />
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>
			</div>
		</Layout>
	);
}

/*
	throttle vs debounce
	throttle : 물리적으로 핸들러함수 호출자체를 일정횟수로 줄임
	debounce : 특정 이벤트가 단시간에 반복으로 계속 발생하고 있으면 핸들러함수 호출 자체를 계속 뒤로 밀면서 호출 막음

	리액트에서의 폼 인증 구현 로직 순서
	1. 폼요소에 입력하는 값을 이벤트 핸들러 함수를 통해 실시간으로 state에 저장
	2. state값이 변경될때마다 check 함수를 통해 항목별로 인증 실패시 에러 객체로 묶어서 반환
	3. 폼에 submitHandler 함수를 연결
	4. 전송이벤트가 발생시 submitHandler함수 안쪽에서 check함수를 호출해서 err객체가 있으면 인증 실패
	5. check함수가 내보내는 err객체가 없으면 인증 성공처리

	history.push('이동하고자 하는 path')
	goBack(), goForward()앞/뒤로 이동할 수 있는 메소드 
*/

/*
	Members 컴포넌트 작업 흐름
	1.Input요소에 값 입력시 실시간으로 폼 값들을 state로 관리하면서 인증처리 로직 실행
	2.인증 성공시 성공메세지 띄우고 인증 실패시 실시간으로 인증 에러 인풋요소 밑에 출력
	3.useDebounce라는 커스텀훅을 통해서 불필요하게 특정 핸들러함수가 반복 호출되는 것을 방지
	(useDebounce작업 가이드 p.100)
	이슈사항
	- 폼요소가 많다보니 초반에 input요소에 담길 value의 state생성, state관리 어려움
	- 전송 버튼클릭이 아니라 실시간으로 특정 요소값 입력할때마다 에러메세지를 띄우는 식으로 사용성의 개선 필요
	- onChange 이벤트에 state변경함수를 연결하다니 컴포넌트가 너무 많이 재랜더링됨, 그에 수반된 특정 핸들러함수가 너무 자주호출
	해결방안
	- handleChange는 함수를 제작해서 실제 입력하고 있는 name의 폼요소를 state객체 안의 키값의 변수로 활용해 입력하고 input name값에 따른 자동 state변동되도록 처리 (ES6의 대괄호를 이용한 객체의 동적 키할당 문법 활용)
	- onChange를 통한 state변경으로 빈번한 컴포넌트의 재랜더링때문에 성능부분에 걱정이 되서 구글링을 해보니 리액트는 가상돔요소가 실제 DOM을 통채로 만드는 것이 아닌 돔의 변경될 데이터만 담은 객체이고 동일 JSX구조일떄 이전 렌더링시의 동일 JSX 노드값을 재활용하기 때문에 재랜더링에 대한 소비비용이 크지 않음을 확인
	- 단지 컴포넌트가 재렌더링됨으로 인해서 check함수가 불필요하게 자주 호출되는 것을 막아주기 위해서 일정시간동안 연속적으로 이벤트가 발생하고 있으면 계속해서 핸들러함수의 호출을 지연시키는 debouncing 기능을 커스텀훅으로 만들어서 재활용 
*/
