/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss';
import { SignInButton } from './SignInButton';

export function Header() {
	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<img src="/images/logo.svg" alt="AppNews" />
				<nav>
					<a href="" className={styles.active}>
						Home
					</a>
					<a href="">Posts</a>
				</nav>
				<SignInButton />
			</div>
		</header>
	);
}
