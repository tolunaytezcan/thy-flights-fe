import React from 'react';
import Header from '@App/layout/Header/Header';
import styles from './Result.module.scss';
import {
	faCircleCheck,
	faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

interface ResultProps {
	status: 'available' | 'error';
	amount?: number;
}

const Result: React.FC<ResultProps> = ({ status, amount = 0 }) => {
	const navigate = useNavigate();

	const goBack = () => {
		navigate('/search');
	};

	const renderSuccess = () => {
		return (
			<div className={styles.area_wrapper}>
				<div className={styles.text_and_icon}>
					<FontAwesomeIcon
						icon={faCircleCheck}
						className={styles.successIcon}
					/>
					<p>Kabin seçiminiz tamamlandı.</p>
				</div>
				<div className={styles.text_area}>
					<p className={styles.total_price}>Toplam tutar</p>
					<p className={styles.amount}>{`TRY ${amount}`}</p>
				</div>
			</div>
		);
	};

	const renderError = () => {
		return (
			<div className={styles.area_wrapper}>
				<div className={styles.text_and_icon}>
					<FontAwesomeIcon
						icon={faCircleXmark}
						className={styles.errorIcon}
					/>
					<p>Kabin seçiminiz tamamlanamadı.</p>
				</div>
				<div className={styles.text_area}>
					<span></span>
					<button onClick={goBack} className={styles.button}>
						Başa dön
					</button>
				</div>
			</div>
		);
	};

	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.info_message_area}>
				{status === 'available' ? renderSuccess() : renderError()}
			</div>
		</div>
	);
};

export default Result;
