// An index.js file is required for deploying w/ vercel
import { PrismicClient, api } from 'lib/api'
import Prismic from 'prismic-javascript'
import Page from 'components/Templates/Page'
import { pageFetchLinks } from 'constants/page'
import { parser } from 'html-metadata-parser'

export default Page

export async function getStaticProps({ preview = false, previewData }) {
  const { masterRef } = await PrismicClient.getApi()
  const ref = previewData?.ref || masterRef.ref
  const HOME_ID = api.HOME_ID
  const { data: globals } = await PrismicClient.getSingle('globals', {
    fetchLinks: pageFetchLinks,
    ref,
  })

  const { data: header } = await PrismicClient.getSingle('header', {
    fetchLinks: pageFetchLinks,
    ref,
  })

  let page = await PrismicClient.getByID(HOME_ID, { ref })

  const { results, ...props } = await PrismicClient.query(
    Prismic.Predicates.at('document.type', 'project'),
    {
      fetchLinks: pageFetchLinks,
      orderings: '[my.project.date desc]',
    }
  )

  // Parse Meta share images from project links
  const projects = await Promise.all(
    results.map(async (item) => {
      let meta_image = null

      if (item?.data?.link?.url && !item?.data?.image?.url) {
        try {
          meta_image = (await parser(item.data.link.url))?.og?.image ?? null
        } catch (err) {}
      }

      return {
        ...item,
        data: {
          ...item?.data,
          image: item?.data?.image?.url
            ? item.data.image
            : {
                url: meta_image,
              },
        },
      }
    })
  )

  // Manually set homepage data
  if (!page?.data?.body) {
    page.data.body = [
      { slice_type: 'featured' },
      {
        slice_type: 'projects',
        items: [],
      },
    ]
  }

  return {
    props: {
      preview,
      projects: projects ?? null,
      page: page ?? null,
      header: header ?? null,
      globals: globals ?? null,
    },
    revalidate: 1,
  }
}
