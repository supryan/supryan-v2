import PropTypes from 'prop-types'
import styles from './index.module.scss'
import { motion } from 'framer-motion'
import Grid from '../Grid'
import { intro } from 'lib/animations'
import useScrollLock from 'use-scroll-lock'
import { useEffect, useState } from 'react'
import Loader from 'components/Pieces/Loader'
import ShadowText from 'components/Pieces/ShadowText'
import RichTextComponent from 'components/Slices/RichText'
import PrismicLink from 'components/Pieces/PrismicLink'
import prismicRichTextShape from 'shapes/prismic/richtext'
import CameraIcon from 'public/images/camera.svg'
import DocumentIcon from 'public/images/document.svg'
import ArrowIcon from 'public/images/arrow.svg'

const Intro = ({ title, description, links }) => {
  const [scrollLock, setScrollLock] = useState(true)
  const [complete, setComplete] = useState(false)

  useScrollLock(scrollLock)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  return (
    <>
      <Loader timeout={1000} />
      <sup className={styles.intro}>
        {intro?.map(({ animation }, index) => (
          <motion.sup
            key={`intro-animation-${index}`}
            initial="hidden"
            animate="visible"
            variants={animation}
            transition={{ duration: 1 + index * 0.3, delay: 1.5 }}
            className={styles.background}
          />
        ))}
        <motion.sup
          initial={{ visibility: 'hidden' }}
          animate={{ visibility: 'visible' }}
          transition={{ delay: 2.11 }}
          onAnimationComplete={() => {
            setScrollLock(false)
            setComplete(true)
          }}
          className={styles.container}>
          <Grid className={styles.grid}>
            <sup className={styles.sup}>
              <ShadowText animate={complete} className={styles.supText}>
                SUP!
              </ShadowText>
            </sup>
            <sup className={styles.hero}>
              {title && <h1 className={styles.heroTitle}>{title}</h1>}
              <sup className={styles.heroBody}>
                <RichTextComponent richtext={description} />
              </sup>
              <nav className={styles.nav}>
                {links?.map(({ link, link_text }, i) => {
                  return (
                    <sup key={i} className={styles.linkWrapper}>
                      {link_text === 'Video Reel' ? (
                        <CameraIcon />
                      ) : (
                        <DocumentIcon />
                      )}
                      <PrismicLink link={link} className={styles.link}>
                        {link_text}
                      </PrismicLink>
                      <ArrowIcon />
                    </sup>
                  )
                })}
              </nav>
            </sup>
          </Grid>
        </motion.sup>
      </sup>
    </>
  )
}

export default Intro

Intro.propTypes = {
  title: PropTypes.string,
  description: prismicRichTextShape,
  links: PropTypes.array,
}
