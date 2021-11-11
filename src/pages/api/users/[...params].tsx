/* eslint-disable import/no-anonymous-default-export */

//Nesse caso o [...params] devolve tudo que foi informado apos o /users.
//se eu chamar: http://localhost:3000/api/users/edit/1/novo
//No request.query, virá:  { params: [ 'edit', '1', 'novo' ] }

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
