import PropTypes from 'prop-types'
import styles from './index.module.scss'
import RichTextComponent from 'components/Slices/RichText'
import { useScrollSpy } from 'lib/hooks'
import prismicRichTextShape from 'shapes/prismic/richtext'
import classNames from 'classnames'
import { useMemo, useRef, useState } from 'react'
import Grid from 'components/Layout/Grid'
import Button from 'components/Pieces/Button'
import ArrowIcon from 'public/images/arrow.svg'
import { hasLink } from 'lib/links'
import { RichText } from 'prismic-reactjs'
import Image from 'next/image'
import ButtonIcon from 'components/Pieces/ButtonIcon'

const Item = ({
  title,
  description,
  categories,
  image,
  date,
  link,
  roles,
  tags,
  ...props
}) => {
  const { ref, inView } = useScrollSpy({ date })
  const detailsRef = useRef(null)
  const [showDetails, setShowDetails] = useState(false)

  // Project contains in progress category
  const isInProgress =
    useMemo(
      () =>
        categories?.length &&
        categories?.filter(({ category }) =>
          category.data?.name.includes('progress')
        ),
      [categories]
    )?.length > 0

  const handleItemClick = (e) => {
    const element = e?.target ?? null

    // Go to center of clicked element for accessibility.
    if (element && !inView) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    }
  }

  return (
    <sup
      role="button"
      aria-label={`Click to expand project: ${RichText.asText(title)}`}
      ref={ref}
      className={classNames(styles.item, { [styles.active]: inView })}
      tabIndex={inView ? -1 : 0}
      onClick={handleItemClick}
      {...props}>
      <sup className={styles.overlay} />
      <sup className={styles.title}>
        <RichTextComponent richtext={title} />
      </sup>
      <sup
        ref={detailsRef}
        className={classNames(styles.details, {
          [styles.active]: inView,
        })}>
        <Grid className={styles.grid}>
          <sup className={styles.image}>
            <sup className={styles.buttons}>
              <ButtonIcon
                className={styles.buttonIcon}
                active={inView}
                type={isInProgress ? 'cross' : 'checkmark'}
                onClick={() => setShowDetails(!showDetails)}
              />
              <ButtonIcon
                className={styles.buttonIcon}
                active={inView}
                type="lines"
                rotation={180}
                // delay={500}
                onClick={() => setShowDetails(!showDetails)}
              />
            </sup>
            {/* <Image src={} layout="fill" /> */}
          </sup>
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
