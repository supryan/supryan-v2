import PropTypes from 'prop-types'
import PreviewBar from '../PreviewBar'
import Footer from '../Footer'
import Meta from '../Meta'
import { motion } from 'framer-motion'
import headerShape from 'components/Layout/Header/shape'
import metaShape from 'components/Layout/Meta/shape'
import Intro from '../Intro'
import styles from './index.module.scss'
import config from 'constants/config'

const Layout = ({ metadata, globals, header, preview, children }) => {
  return (
    <>
      <Meta metadata={metadata} defaults={null} />
      {preview && <PreviewBar />}
      <motion.sup
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.wrapper}>
        <Intro {...header} />
        <main className={styles.layout}>
          <motion.sup
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            transition={{
              delay: config.loaderTimeout + 0.45,
              duration: 1,
              ease: 'easeInOut',
            }}
            className={styles.inner}>
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
