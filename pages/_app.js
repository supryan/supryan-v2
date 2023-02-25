import 'normalize.css'
import '../styles/fonts.css'
import '../styles/global.scss'
import PropTypes from 'prop-types'
import { AnimatePresence } from 'framer-motion'
import * as analytics from 'lib/analytics'
import { useCallback, useEffect } from 'react'
import ScrollSpyContextProvider from 'lib/contexts/scroll-spy-context'

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    const handleRouteChangeStart = () => {}
    const handleRouteChangeComplete = (url) => {
      // Artificial delay to ensure accurate page title data flows into analytics service
      setTimeout(() => analytics.pageview(url), 1000)
    }
    const handleRouteChangeError = () => {}

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router])

  const addLogger = useCallback(() => {
    console.log(` ________   ___  ___   ________   \r\n|\\   ____\\ |\\  \\|\\  \\ |\\   __  \\  \r\n\\ \\  \\___|_\\ \\  \\\\\\  \\\\ \\  \\|\\  \\ \r\n \\ \\_____  \\\\ \\  \\\\\\  \\\\ \\   ____\\\r\n  \\|____|\\  \\\\ \\  \\\\\\  \\\\ \\  \\___|\r\n    ____\\_\\  \\\\ \\_______\\\\ \\__\\   \r\n   |\\_________\\\\|_______| \\|__|   \r\n   \\|_________|
    `)
  }, [])

  useEffect(() => {
    addLogger()
  }, [addLogger])

  return (
    // to remove page transitions, remove AnimatePresence wrapper and motion.div in Layout component
    <ScrollSpyContextProvider>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </ScrollSpyContextProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
  router: PropTypes.any,
}

export default MyApp
