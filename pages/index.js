// An index.js file is required for deploying w/ vercel
import { PrismicClient, api } from 'lib/api'
import Page from 'components/Templates/Page'
import { pageSlugFetchLinks } from 'constants/page'

export default Page

export async function getStaticProps({ preview = false, previewData }) {
  const { masterRef } = await PrismicClient.getApi()
  const ref = previewData?.ref || masterRef.ref
  const HOME_ID = api.HOME_ID
  const { data: header } = await PrismicClient.getSingle('header', {
    fetchLinks: pageSlugFetchLinks,
    ref,
  })

  let page = await PrismicClient.getByID(HOME_ID, { ref })

  // Manually set homepage data
  if (!page?.data?.body) {
    page.data.body = [
      {
        slice_type: 'featured',
      },

      {
        slice_type: 'project_list',
        items: [],
      },
    ]
  }

  return {
    props: {
      preview,
      page: page ?? null,
      header: header ?? null,
    },
    revalidate: 1,
  }
}
