import { useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';
import { useSelector } from 'react-redux';

export default function Department() {
	const MemberData = useSelector(store => store.memberReducer.members);
	const HistoryData = useSelector(store => store.historyReducer.history);
	const combinedTitle = useCustomText('combined');
	const path = useRef(process.env.PUBLIC_URL);

	return (
		<Layout title={'Department'}>
			<section className='historyBox'>
				<h2>{combinedTitle('History')}</h2>
				<div className='con'>
					{HistoryData?.map((history, idx) => {
						return (
							<article key={history + idx}>
								<h3>{Object.keys(history)[0]}</h3>
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
				<h2>{combinedTitle('Members')}</h2>

				<div className='con'>
					{MemberData?.map((member, idx) => {
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
