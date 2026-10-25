import { useEffect, useRef, useState } from 'react'

// Tiny data hook.
//   const { data, loading, error, reload } = useFetch(() => service.list(), 'optional-key')
// Pass a changing `key` (e.g. JSON of params) to refetch when inputs change.
export const useFetch = (fn, key = '') => {
  const fnRef = useRef(fn)
  const [tick, setTick] = useState(0)
  const [result, setResult] = useState({ id: null, data: null, error: '' })
  const requestId = `${key}#${tick}`

  useEffect(() => {
    fnRef.current = fn
  })

  useEffect(() => {
    let cancelled = false
    fnRef
      .current()
      .then((res) => !cancelled && setResult({ id: requestId, data: res?.data ?? res, error: '' }))
      .catch((e) => !cancelled && setResult({ id: requestId, data: null, error: e.message }))
    return () => {
      cancelled = true
    }
  }, [requestId])

  return {
    data: result.data,
    error: result.id === requestId ? result.error : '',
    loading: result.id !== requestId,
    reload: () => setTick((t) => t + 1),
  }
}
