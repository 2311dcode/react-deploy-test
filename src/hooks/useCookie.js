export function useCookie() {
	const setCookie = (name, value, time) => {
		let now = new Date();
		let duedate = now.getTime() + 1000 * time;
		now.setTime(duedate);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
		console.log(document.cookie);
	};

	const isCookie = cookieName => {
		if (document.cookie.indexOf(cookieName) < 0) return false;
		else return true;
	};

	const viewCookie = () => console.log(document.cookie);

	return { setCookie, isCookie, viewCookie };
}

/* 

export function useCookie(name, value, time) {
	let now = new Date();
	let duedate = now.getTime() + 1000 * time; //지금으로부터 time초 뒤의 만료시간
	now.setTime(duedate);
	document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`; //한국시로 구한 만료시간값을 전세계 표준시로 변환해서 쿠키값을 만료시간으로 설정
	//path값 경로의 url에서만 쿠키가 생성됨
	//csr방식의 리액트에서는 해당 경로로 라우터 이동하더라도 서버쪽에서 해당 URL요청이 들어간 것이 아니기 때문에 쿠키생성이 안됨
	//해당 URL경로에서 새로고침을 해야지 그때 쿠키가 생성됨
	//가급적 리액트에서는 쿠키생성 경로 path=/ 로 지정함
}


Cookie 
:서버에서 https통신으로 client(Browser)에 데이터를 전달할 때 header객체에 전달하는 경량의 문자데이터(4kb: 개별 쿠키값당 )
:사용자의 브라우저에 물리적인 파일 형태로 저장이 되기 때문에 사용자를 브라우저를 닫더라도 유지시킬수있는 값 
:만료일이 존재하고 사용자가 설정가능, 만약 만료일을 지정하지 않으면 브라우저를 다는 순간 쿠기값 삭제됨 

cookie vs Session 

:cookie 정보는 client쪽에 저장 vs session은 서버쪽에 저장 
:덜 중요한 값을 유지시킬때 주로 cookie사용 (장바구나 목록, 오늘하루 팝업안보이기 etc)
:사용자 개인 정보같이 중요한 정보값을 Session사용 (사용자로그인정보 etc)

Cookie vs Local Storage 
:cookie 데이터가 Local Storage에 비해서 경량의 문자값만 등록가능 (cookie:4kb, local Storage: 5mb)
:cookie는 만료일 지정가능하기 때문에 자동적으로 값이 제거됨 
Local Storage 는 사용자가 직접 삭제하기 전까지는 계속 유지됨 

*/
