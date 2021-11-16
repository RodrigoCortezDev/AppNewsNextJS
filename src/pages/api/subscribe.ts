/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { stripe } from '../../services/stripe';
import { fauna } from '../../services/fauna';
import { query as q } from 'faunadb';

type User = {
	ref: {
		id: string;
	};
	data: {
		stripe_customer_id: string;
	};
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		try {
			//Usuário da sessão
			const session = await getSession({ req });

			//Pega user do banco
			const user = await fauna.query<User>(q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email))));

			//Validações para não repetir o usuário
			let customerId = user.data.stripe_customer_id;

			if (!customerId) {
				//Salvando user no Stripe
				const stripeCustomer = await stripe.customers.create({
					email: session.user.email,
				});

				customerId = stripeCustomer.id;
			}

			//Atualizando o banco com o user
			await fauna.query(
				q.Update(q.Ref(q.Collection('users'), user.ref.id), {
					data: {
						stripe_customer_id: customerId,
					},
				}),
			);

			const stripeCheckoutSession = await stripe.checkout.sessions.create({
				customer: customerId,
				payment_method_types: ['card'],
				billing_address_collection: 'required',
				line_items: [
					{
						price: 'price_1JtJKLHPrPesVqvMqNT7HIHl',
						quantity: 1,
					},
				],
				mode: 'subscription',
				allow_promotion_codes: true,
				success_url: 'http://localhost:3000/posts',
				cancel_url: 'http://localhost:3000/',
			});

			return res.status(200).json({ sessionId: stripeCheckoutSession.id });
		} catch (error) {
			console.log('ERRO NO APP: ' + error.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method not allowed');
	}
};
