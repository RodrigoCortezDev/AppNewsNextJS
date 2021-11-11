/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
	const users = [
		{ id: 1, name: 'Rodrigo' },
		{ id: 2, name: 'Rodrigo 2' },
		{ id: 3, name: 'Rodrigo 3' },
	];

	return response.json(users);
};
