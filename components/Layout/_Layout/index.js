import PropTypes from 'prop-types'
import PreviewBar from '../PreviewBar'
import Footer from '../Footer'
import Meta from '../Meta'
import { motion } from 'framer-motion'
import headerShape from 'components/Layout/Header/shape'
import metaShape from 'components/Layout/Meta/shape'
import Intro from '../Intro'
import styles from './index.module.scss'

const Layout = ({ metadata, globals, header, preview, children }) => {
  return (
    <>
      <Meta metadata={metadata} defaults={null} />
      {preview && <PreviewBar />}
      <motion.sup
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <Intro {...header} />
        <main className={styles.layout}>
          <motion.sup
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            transition={{ delay: 1.25, duration: 1 }}
            className={styles.wrapper}>
            {children}
          </motion.sup>
        </main>
      </motion.sup>
      <Footer footer={globals} />
    </>
  )
}

Layout.propTypes = {
  metadata: metaShape,
  globals: PropTypes.object,
  header: headerShape,
  preview: PropTypes.bool,
  children: PropTypes.node,
}

export default Layout
