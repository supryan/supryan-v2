import { useEffect, useContext, useRef, useCallback } from 'react'
import { ScrollSpyContext } from 'lib/contexts/scroll-spy-context'
import { useInView } from 'react-intersection-observer'

export const useScrollSpy = (item, options) => {
  const elementRef = useRef()
  const { setActiveItem } = useContext(ScrollSpyContext)

  // Intersection observer options
  const [inViewRef, inView] = useInView({
    threshold: 0,
    rootMargin: '-50% 0px',
    triggerOnce: false,
    ...options,
  })

  // Use `useCallback` so we don't recreate the function on each render - Could result in infinite loop
  const ref = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      elementRef.current = node
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node)
    },
    [inViewRef]
  )

  // Grab id from section ref parent
  // Assign to active scroll spy context
  useEffect(() => {
    if (elementRef?.current) {
      if (inView && item) {
        setActiveItem(item)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, setActiveItem])

  return { ref, element: elementRef, inView }
}

export const useClickOutside = (ref, onClickOutside) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (onClickOutside) {
          onClickOutside()
        }
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onClickOutside])
}
