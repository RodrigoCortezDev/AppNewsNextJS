/* eslint-disable import/no-anonymous-default-export */

//nome do arquivo tem o [id] quando digita a rota: http://localhost:3000/api/users/1
//o que veio depois do /users ele captura como parametro em "request.query"

import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
	console.log(request.query);

	const users = [
		{ id: 1, name: 'Rodrigo' },
		{ id: 2, name: 'Rodrigo 2' },
		{ id: 3, name: 'Rodrigo 3' },
	];

	return response.json(users);
};
