import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import { ImCancelCircle } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';
import { useCustomText } from '../../../hooks/useText';

export default function Community() {
	const changeText = useCustomText('combined');
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};
	const [Post, setPost] = useState(getLocalData());
	const refTit = useRef(null);
	const refCon = useRef(null);
	const refEditTit = useRef(null);
	const refEditCon = useRef(null);
	const editMode = useRef(false);

	//input 초기화 함수
	const resetPost = () => {
		refTit.current.value = '';
		refCon.current.value = '';
	};

	//글 저장 함수
	const createPost = () => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		setPost([{ title: refTit.current.value, content: refCon.current.value, date: new Date(korTime) }, ...Post]);
		resetPost();
	};

	//글 수정 함수
	const updatePost = (updateIndex) => {
		if (!refEditTit.current.value.trim() || !refEditCon.current.value.trim()) {
			return alert('수정할 제목과 본문을 모두 입력하세요.');
		}
		editMode.current = false;

		setPost(
			Post.map((el, idx) => {
				if (updateIndex === idx) {
					el.title = refEditTit.current.value;
					el.content = refEditCon.current.value;
					el.enableUpdate = false;
				}
				return el;
			})
		);
	};

	//글 삭제 함수
	const deletePost = (delIndex) => {
		//console.log(delIndex);
		//기존 map과 마찬가지로 기존 배열값을 deep copy해서 새로운배열 반환
		//이때 안쪽에 조건문을 처리해서 특정 조건에 부합되는 값만 filtering해서 리턴
		if (!window.confirm('정말 해당 게시글을 삭제하겠습니까?')) return;
		setPost(Post.filter((_, idx) => delIndex !== idx));
	};

	//수정모드 변경함수
	const enableUpdate = (editIndex) => {
		//기존의 Post배열을 반복돌면서 파라미터로 전달된 editIndex순번의 포스트에만 enableUpdate=true라는 구분자를 추가해서 다시 state변경처리
		//다음번 렌더링때 해당 구분자가 있는 포스트 객체만 수정모드로 분기처리
		if (editMode.current) return;
		editMode.current = true;
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = true;
				return el;
			})
		);
	};

	//출력모드 변경함수
	const disableUpdate = (editIndex) => {
		//기존의 Post배열을 반복돌면서 파라미터로 전달된 editIndex순번의 포스트에만 enableUpdate=true라는 구분자를 추가해서 다시 state변경처리
		//다음번 렌더링때 해당 구분자가 있는 포스트 객체만 수정모드로 분기처리
		editMode.current = false;

		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = false;
				return el;
			})
		);
	};

	const filtering = (txt) => {
		const abc = Post.filter((el) => el.title.indexOf(txt) >= 0 || el.content.indexOf(txt) >= 0);
		console.log(abc);
	};

	useEffect(() => {
		//post데이터가 변경되면 수정모드를 강제로 false처리하면서 로컬저장소에 저장하고 컴포넌트 재실행
		Post.map((el) => (el.enableUpdate = false));
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<input type='text' placeholder='title' ref={refTit} />
					<textarea cols='30' rows='3' placeholder='content' ref={refCon}></textarea>

					<nav>
						<button onClick={resetPost}>
							<ImCancelCircle />
						</button>
						<button onClick={createPost}>
							<TfiWrite />
						</button>
					</nav>
				</div>

				<div className='showBox'>
					{Post.map((el, idx) => {
						const date = JSON.stringify(el.date);
						const strDate = changeText(date.split('T')[0].slice(1), '.');
						console.log(strDate);

						if (el.enableUpdate) {
							//수정모드
							return (
								<article key={el + idx}>
									<div className='txt'>
										<input type='text' defaultValue={el.title} ref={refEditTit} />
										<textarea defaultValue={el.content} cols='30' rows='10' ref={refEditCon}></textarea>
									</div>
									<nav>
										<button onClick={() => disableUpdate(idx)}>Cancel</button>
										<button onClick={() => updatePost(idx)}>Update</button>
									</nav>
								</article>
							);
						} else {
							//출력모드
							return (
								<article key={el + idx}>
									<div className='txt'>
										<h2>{el.title}</h2>
										<p>{el.content}</p>
										<span>{strDate}</span>
									</div>
									<nav>
										<button onClick={() => enableUpdate(idx)}>Edit</button>
										<button onClick={() => deletePost(idx)}>Delete</button>
									</nav>
								</article>
							);
						}
					})}
				</div>
			</div>
		</Layout>
	);
}

/* 
// const timestamp = new Date().getTime();
		// const date = new Date(timestamp).toLocaleString('ko-KR', {
		// 	year: 'numeric',
		// 	month: '2-digit',
		// 	day: '2-digit',
		// 	hour: '2-digit',
		// 	minute: '2-digit',
		// });
		// 2023. 12. 07. 오전 10:59
	//.slice(0,12)
		
게시판 가능 
1.글입력박스 글 출력박스 생성 
2.전체글 관리할 배열 state생성 [{글정보1},{글정보2}..]
3. 글 입력박스에 글 입력후 저장 버튼 클릭시 글 정보를 객체형태로 state에 계속 추가 (Create )
4. state 배열에 추가된 값들을 반복돌면서 글 리스트 출력 (Read)
5.글 출력시 삭제,수정 버튼 추가해서 출력 
6.글 리스트에서 삭제 버튼 클릭시 
배열state에서 이벤트가 발생한 순번의 객체를 제거해서 글삭제 (Delete)

CRUD 
Create 데이터저장- 글 작성 
Read- 데이터호출 - 글목록 보기 
Update- 데이터변경 - 글수정
Delete -데이터 삭제 - 글삭제
  

Local Storage : 모든 브라우저가 내장하고 있는 경량의 저장소 
--문자값만 저장가능 (5MB)
--로컬저장소에 문자열이외의 값을 저장할때에는 강제로 문자화시켜서 저장 
--로컬저장소의 값을 JS로 가져올때에는 문자값ㅇ르 반대로 객체화시켜서 호출 

localStorage객체에 활용가능한 메서드
	- setItem('키','문자화된 데이터'); 해당 키값에 데이터를 담아서 저장
	- getItem('키') : 해당 키값에 매칭이 되는 데이터를 가져옴

박스 모션 추가할 것 	
*/
