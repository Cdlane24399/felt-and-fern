import { useEffect, useRef, useState } from 'react'

let modelViewerPromise

function loadModelViewer() {
  modelViewerPromise ||= import('@google/model-viewer')
  return modelViewerPromise
}

export default function LazyModelViewer({ className = '', style, children, src, srcLoader, ...props }) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)
  const [resolvedSrc, setResolvedSrc] = useState(src)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    let cancelled = false
    const load = () => {
      const sourcePromise = srcLoader ? srcLoader().then((module) => module.default) : Promise.resolve(src)

      Promise.all([loadModelViewer(), sourcePromise]).then(([, nextSrc]) => {
        if (cancelled) return
        setResolvedSrc(nextSrc)
        setReady(true)
      })
    }

    if (!('IntersectionObserver' in window)) {
      load()
      return () => {
        cancelled = true
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        load()
      },
      { rootMargin: '360px 0px' },
    )

    observer.observe(el)

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [src, srcLoader])

  return (
    <div ref={ref} className={className} style={style}>
      {ready && resolvedSrc ? (
        <model-viewer src={resolvedSrc} {...props} style={{ width: '100%', height: '100%' }} />
      ) : (
        children
      )}
    </div>
  )
}
