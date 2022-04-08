import PropTypes from 'prop-types'
import styles from './index.module.scss'
import RichTextComponent from 'components/Slices/RichText'
import { useScrollSpy } from 'lib/hooks'
import prismicRichTextShape from 'shapes/prismic/richtext'

const Item = ({ title, description, categories, date, ...props }) => {
  const { ref } = useScrollSpy({
    date,
    delay: 500,
  })

  return (
    <sup ref={ref} className={styles.item}>
      <sup className={styles.overlay} />
      <sup className={styles.title}>
        <RichTextComponent richtext={title} />
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
