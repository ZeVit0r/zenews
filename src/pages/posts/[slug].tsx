import { asHTML, asText } from "@prismicio/helpers"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import { getPrismicClient } from "../../services/prismicio"

import styles from './post.module.scss'

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function({ post }: PostProps) {
    return(
        <>
            <Head>
                <title>{post.title} | zenews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req })
    const { slug } = params;

    if(!session?.activeSubscription) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    console.log(session)

    const prismic = getPrismicClient(req)

    const response = await prismic.getByUID('Publication', String(slug), {})

    const post = {
        slug,
        title: asText(response.data.Title),
        content: asHTML(response.data.Content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }
    return {
        props: {
            post
        }
    }
}