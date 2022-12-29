import styles from './index.module.scss'
import prismicRichTextShape from 'shapes/prismic/richtext'
import RichTextField from 'components/Pieces/RichTextField'

const RichTextComponent = ({ richtext }) => {
  return (
    <sup className={styles.container}>
      <RichTextField text={richtext} />
    </sup>
  )
}

RichTextComponent.propTypes = {
  richtext: prismicRichTextShape,
}

export default RichTextComponent
