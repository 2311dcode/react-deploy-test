/* 
useThrottle.js 

debounce vs throttle 

debounce : 이벤트 발생하는 간격 시간을 비교해서 일정시간 간격안에 이벤트가 발생중이면 함수호출을 무기한 연기 

throttle : 물리적으로 반복횟수자체를 줄임 


debounce 적용 대표사례 : 특정 인풋요소 입력을 끝날때까지 fetching함수 호출 자체를 계속 미룰때 

throttle 적용 대표 사례 : window event(scroll, resize ) 발생시마다 불필요하게 많이 호출되는 함수의 호출횟수를 줄일때 


setTimeout 시간마다 호출하는 함수 
실행되면 이전 setTimeout은 무시되고 새로 실행되는 것 

null일때 setTimeout실행되는 로직 

-setTimeout이 호출되면 delay뒤에 리턴값 반환이 아니라 호출즉시 return 반환 
-setTimeoutㅇ의 delay값이 끝나기 전에 중복호출되면 기존 함수 무시하고 다시 초기화해서 setTimeout이 또 호출됨 

*/

import { useRef } from 'react';

export const useThrottle = (func, gap = 500) => {
	//-초기값을 null값을 eventBlocker에 담아서 초기 한번은 온전히 setTimeout이 호출되게 처리
	const eventBlocker = useRef(null);

	return () => {
		//eventBlocker이 담겨있으면 리턴으로 강제 중지함으로써 setTimeout 중복호출하지 않음
		if (eventBlocker.current) return;
		//setTime이 실행됨과 동시에 리턴값을 eventBlocker에 담아서 중복호출을 막으면서 gap시간이후에 호출되는 특정 로직을 보장
		eventBlocker.current = setTimeout(() => {
			//gap시간이후에 인수로 전달된 함수를 호출하고
			func();
			//eventBlocker을 다시 비움
			eventBlocker.current = null;
			//gap시간 이후에 다시 setTimeout을 호출할 수 있게 됨
		}, gap);
	};
};
