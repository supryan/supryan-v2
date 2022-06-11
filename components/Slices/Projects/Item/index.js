import PropTypes from 'prop-types'
import styles from './index.module.scss'
import RichTextComponent from 'components/Slices/RichText'
import { useScrollSpy } from 'lib/hooks'
import prismicRichTextShape from 'shapes/prismic/richtext'
import classNames from 'classnames'
import { useCallback, useEffect, useRef } from 'react'
import createScrollSnap from 'scroll-snap'
import Grid from 'components/Layout/Grid'
import Button from 'components/Pieces/Button'
import ArrowIcon from 'public/images/arrow.svg'

const Item = ({ title, description, categories, date, link, ...props }) => {
  const { ref, inView } = useScrollSpy({ date })
  const detailsRef = useRef(null)

  return (
    <sup ref={ref} className={styles.item} {...props}>
      <sup
        className={classNames(styles.overlay, {
          [styles.active]: inView,
        })}
      />
      <sup className={styles.title}>
        <RichTextComponent richtext={title} />
      </sup>
      <sup
        ref={detailsRef}
        className={classNames(styles.details, {
          [styles.active]: inView,
        })}>
        <Grid className={styles.grid}>
          <div className={styles.image}></div>
          <div className={styles.meta}>
            <Button link={link}>
              Check it out <ArrowIcon />
            </Button>
          </div>
        </Grid>
      </sup>
      <sup className={styles.description}>
        <RichTextComponent richtext={description} />
      </sup>
    </sup>
  )
}

export default Item

Item.propTypes = {
  title: prismicRichTextShape,
  description: prismicRichTextShape,
  categories: PropTypes.array,
  date: PropTypes.string,
}
