import PropTypes from 'prop-types'
import styles from './index.module.scss'
import RichTextComponent from 'components/Slices/RichText'
import { useScrollSpy } from 'lib/hooks'
import prismicRichTextShape from 'shapes/prismic/richtext'
import classNames from 'classnames'
import { useMemo, useRef, useState } from 'react'
import Grid from 'components/Layout/Grid'
import { RichText } from 'prismic-reactjs'
import Image from 'next/image'
import ButtonIcon from 'components/Pieces/ButtonIcon'
import { capitalize } from 'lodash'
import Video from 'components/Pieces/Video'
import prismicVideoShape from 'shapes/prismic/video'
import prismicImageShape from 'shapes/prismic/image'

const Item = ({
  title,
  description,
  categories,
  image,
  video,
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
          <a
            role="button"
            aria-label="Click to go to external project"
            href={link?.url}
            target={link?.target}
            className={styles.media}
            rel="noreferrer">
            <sup className={styles.buttons}>
              <ButtonIcon
                className={styles.buttonIcon}
                active={inView}
                tooltip={
                  <sup className={styles.meta}>
                    <strong>Status</strong>{' '}
                    {isInProgress ? 'In Progress' : 'Complete'}
                  </sup>
                }
                type={isInProgress ? 'cross' : 'checkmark'}
              />
              <ButtonIcon
                className={styles.buttonIcon}
                active={inView}
                type="lines"
                tooltip={
                  <sup className={styles.meta}>
                    {categories?.length > 0 && (
                      <sup className={styles.categories}>
                        <strong>Categories</strong>{' '}
                        {categories
                          ?.map(({ category }) =>
                            capitalize(category?.data?.name)
                          )
                          ?.join(', ')}
                      </sup>
                    )}
                    <sup>
                      {tags?.length > 0 && (
                        <>
                          <strong>Affiliates</strong> {tags.join(', ')}
                        </>
                      )}
                    </sup>
                    <sup>
                      {roles?.length > 0 && (
                        <>
                          <strong>Roles</strong>{' '}
                          {roles?.map((data) => data.text)}
                        </>
                      )}
                    </sup>
                  </sup>
                }
                rotation={180}
                // delay={500}
              />
            </sup>
            {video?.url && inView ? (
              <Video
                src={video?.url}
                className={styles.video}
                controls={false}
              />
            ) : (
              image?.url && (
                <Image
                  src={image?.url}
                  alt={image?.alt}
                  layout="fill"
                  className={styles.image}
                />
              )
            )}
          </a>
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
  video: prismicVideoShape,
  image: prismicImageShape,
}
