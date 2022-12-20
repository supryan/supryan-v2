import PropTypes from 'prop-types'
import styles from './index.module.scss'
import RichTextComponent from 'components/Slices/RichText'
import { useScrollSpy } from 'lib/hooks'
import prismicRichTextShape from 'shapes/prismic/richtext'
import classNames from 'classnames'
import { useEffect, useMemo, useRef } from 'react'
import Grid from 'components/Layout/Grid'
import Button from 'components/Pieces/Button'
import ArrowIcon from 'public/images/arrow.svg'
import { hasLink } from 'lib/links'

const Item = ({
  title,
  description,
  categories,
  date,
  link,
  roles,
  tags,
  ...props
}) => {
  const { ref, inView } = useScrollSpy({ date })
  const detailsRef = useRef(null)

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
    if (element) {
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
      aria-label={`Click to expand project: ${title}`}
      ref={ref}
      className={classNames(styles.item, { [styles.active]: inView })}
      tabIndex="0"
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
          <sup className={styles.image}></sup>
          <sup className={styles.meta}>
            <sup className={styles.metaWrap}>
              <sup className={styles.data}>
                <sup>
                  <strong>Status:</strong>{' '}
                  {isInProgress ? 'In Progress' : 'Complete'}
                </sup>
                <sup>
                  {tags?.length > 0 && (
                    <>
                      <strong>Affiliates:</strong> {tags.join(', ')}
                    </>
                  )}
                </sup>
                <sup>
                  {roles?.length > 0 && (
                    <>
                      <strong>Roles:</strong> {roles?.map((data) => data.text)}
                    </>
                  )}
                </sup>
              </sup>
              <sup className={styles.categoriesWrap}>
                <sup className={styles.categories}>
                  {categories?.map(({ category }, i) => {
                    return (
                      <button key={`category-${i}`} className={styles.category}>
                        {category?.data?.name}
                      </button>
                    )
                  })}
                </sup>
                {hasLink(link) && (
                  <Button link={link} className={styles.cta}>
                    Check it out <ArrowIcon />
                  </Button>
                )}
              </sup>
            </sup>
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
