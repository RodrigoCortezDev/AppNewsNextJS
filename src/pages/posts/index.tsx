import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import Prismic from '@prismicio/client';

export default function Posts() {
	return (
		<>
			<Head>
				<title>Posts | AppNews</title>
			</Head>

			<main className={styles.container}>
				<div className={styles.posts}>
					<a href="">
						<time>XX de xxxxxx de 2021</time>
						<strong>Assssss asdadas asdadasd asdasdasd</strong>
						<p>
							Aasdasd asdasd asdasda sdasdasdas dadasd asasdada sdasd asdasd asdasdad asdasdd as das dasdasd.
						</p>
					</a>

					<a href="">
						<time>XX de xxxxxx de 2021</time>
						<strong>Assssss asdadas asdadasd asdasdasd</strong>
						<p>
							Aasdasd asdasd asdasda sdasdasdas dadasd asasdada sdasd asdasd asdasdad asdasdd as das dasdasd.
						</p>
					</a>

					<a href="">
						<time>XX de xxxxxx de 2021</time>
						<strong>Assssss asdadas asdadasd asdasdasd</strong>
						<p>
							Aasdasd asdasd asdasda sdasdasdas dadasd asasdada sdasd asdasd asdasdad asdasdd as das dasdasd.
						</p>
					</a>
				</div>
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const prismic = getPrismicClient();

	const response = await prismic.query([Prismic.predicates.at('document.type', 'post')], {
		fetch: ['post.title', 'post.content'],
		pageSize: 100,
	});

	console.log(response);

	return {
		props: {},
	};
};
