import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signout, useSession } from 'next-auth/client';

export function SignInButton() {
	const [session] = useSession();

	return session ? (
		<button className={styles.signInButton} onClick={() => signout()}>
			<FaGithub color="#04d361" /> {session.user.name} <FiX color="#737380" className={styles.closeIcon} />
		</button>
	) : (
		<button
			className={styles.signInButton}
			onClick={() => {
				signIn('github');
			}}
		>
			<FaGithub color="#eba417" /> Sign in with Github
		</button>
	);
}
