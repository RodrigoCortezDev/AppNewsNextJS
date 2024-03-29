import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-front';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
	priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
	const [session] = useSession();

	async function handleSubscrible() {
		if (!session) {
			signIn('github');
			return;
		}

		try {
			const response = await api.post('/subscribe');
			const { sessionId } = response.data;
			const stripe = await getStripeJs();
			stripe.redirectToCheckout({ sessionId });
		} catch (err) {
			alert(err.message);
		}
	}

	return (
		<button className={styles.subscribeButton} onClick={handleSubscrible}>
			Subscrib Now
		</button>
	);
}
