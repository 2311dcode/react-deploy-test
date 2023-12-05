import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';
/* 
모달 컴포넌트 자체적을 ㅗ특정 state값에 따라서 자기 자신의 컨텐츠를 보여줄ㅈ지 말지를 결정 
부모 컴포넌트 기준에서 Modal컴포넌트는 계속 마운트 되어 있는 생태이지만 
state값에 따라서 DOM출력 유무만 변경됨 

npm i framer-motion

AnimatePresence :모션을 적용할 컴포넌트ㅏ의 wrapping컴포넌트 지정
-자식요소의 모션이 끝날때까지 컴포넌트가 언마운트 되는 시점을 holding처리 

motion : 모션을 걸고 싶은 JSX컴포넌트에 연결해서 initial, animate, exit라는 속성으로 모션수치값을 조절 가능 
initial : 모션이 일어나기 전 상태값 
animate : 모션이 일어날 때의 상태값 
exit : 모션이 사라질때의 상태값 
*/

export default function Modal({ Open, setOpen, children }) {
	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='Modal'
					initial={{ opacity: 0, x: '-100%', scale: 0, rotate: -45 }}
					animate={{ opacity: 1, x: '0%', scale: 1, rotate: 0 }}
					exit={{ opacity: 0, y: '100%', scale: 2, rotate: 45 }}
					transition={{ duration: 1 }}
				>
					<div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { delay: 0 } }}
						transition={{ duration: 0.5, delay: 1 }}
					>
						{children}
					</div>
					<span
						onClick={() => {
							setOpen(false);
						}}
					>
						close
					</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
