import React from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
	isSearchPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSearchPage }) => (
	<header>
		<div
			className={`${styles.header_container} ${isSearchPage ? styles.searchPage : ''}`}
		>
			<span>turkishairlines.com</span>
			<span>
				search<b>Flight Challenge</b>
			</span>
		</div>
	</header>
);

export default Header;
