import PropTypes from 'prop-types'
import PreviewBar from '../PreviewBar'
import Footer from '../Footer'
import Header from '../Header'
import Meta from '../Meta'
import { motion } from 'framer-motion'
import headerShape from 'components/Layout/Header/shape'
import metaShape from 'components/Layout/Meta/shape'
import Intro from '../Intro'
import ProjectList from 'components/Slices/ProjectList'

const Layout = ({ metadata, header, preview, children }) => {
  return (
    <>
      <Meta metadata={metadata} defaults={null} />
      {preview && <PreviewBar />}
      {/* <Header header={header} /> */}
      <motion.sup
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <main>
          <Intro />
          <ProjectList />
        </main>
      </motion.sup>
      {/* <Footer /> */}
    </>
  )
}

Layout.propTypes = {
  metadata: metaShape,
  header: headerShape,
  preview: PropTypes.bool,
  children: PropTypes.node,
}

export default Layout
