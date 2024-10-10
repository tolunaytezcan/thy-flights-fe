import React from 'react';
import Header from '@App/layout/Header/Header';
import styles from './Result.module.scss';
import {
	faCircleCheck,
	faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';

const Result: React.FC = () => {
	const location = useLocation();
	const { status, price, passengerCount } = location.state || {};
	const navigate = useNavigate();

	const goBack = () => {
		navigate('/flights');
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
					<p className={styles.total_price}>Kişi sayısı</p>
					<p className={styles.amount}>{` ${passengerCount ?? 1}`}</p>
				</div>
				<div className={styles.text_area}>
					<p className={styles.total_price}>Toplam tutar</p>
					<p
						className={styles.amount}
					>{` ${price.amount} x ${passengerCount ?? 1} = ${price.currency}  ${Number(price.amount) * Number(passengerCount)}`}</p>
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
