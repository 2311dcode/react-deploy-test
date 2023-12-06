import Layout from '../../common/layout/Layout';
import './Community.scss';
import { ImCancelCircle } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';
export default function Community() {
	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<form action='/' method='get'>
						<input type='text' placeholder='title' name='tit' />
						<textarea cols='30' rows='10' name='con' placeholder='content'></textarea>

						<nav>
							<button>
								<ImCancelCircle />
							</button>
							<button>
								<TfiWrite />
							</button>
						</nav>
					</form>
				</div>
				<div className='showBox'></div>
			</div>
		</Layout>
	);
}

/* 
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
  
*/
