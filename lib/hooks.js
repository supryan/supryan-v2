import { useEffect, useContext } from 'react'
import { ScrollSpyContext } from 'lib/contexts/scroll-spy-context'
import { useInView } from 'react-intersection-observer'

export const useScrollSpy = (item) => {
  const { setActiveItem } = useContext(ScrollSpyContext)

  // Intersection observer options
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '-50% 0px',
    triggerOnce: false,
  })

  // Grab id from section ref parent
  // Assign to active scroll spy context
  useEffect(() => {
    if (inView && item) {
      setActiveItem(item)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return { ref }
}
