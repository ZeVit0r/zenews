import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'

/* export function linkResolver(doc) {
  switch (doc.type) {
    case 'homepage':
      return '/'
    case 'posts':
      return `posts/${doc.uid}`
    default:
      return null
  }
} */

export function getPrismicClient(req?:unknown) {
  const cliente = prismic.createClient(
    process.env.PRISMIC_ENDPOINT,
    {   
        accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
    )

  return cliente
}