/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'

const ApiTest = () => {
  const [results, setResults] = useState<Record<string, any>>({})

  useEffect(() => {
    const testEndpoints = async () => {
      // Test 1: Base API endpoint
      try {
        const baseResponse = await fetch(
          'https://note-nest-server-ten.vercel.app/api'
        )
        const baseData = await baseResponse.json()
        setResults((prev) => ({
          ...prev,
          base: { status: baseResponse.status, data: baseData },
        }))
      } catch (error: string | any) {
        setResults((prev) => ({ ...prev, base: { error: error.message } }))
      }

      // Test 2: Products endpoint
      try {
        const productsResponse = await fetch(
          'https://note-nest-server-ten.vercel.app/api/products'
        )
        const productsData = await productsResponse.json()
        setResults((prev) => ({
          ...prev,
          products: { status: productsResponse.status, data: productsData },
        }))
      } catch (error: string | any) {
        setResults((prev) => ({ ...prev, products: { error: error.message } }))
      }

      // Test 3: Products with a query parameter
      try {
        const queryResponse = await fetch(
          'https://note-nest-server-ten.vercel.app/api/products?category=Writing'
        )
        const queryData = await queryResponse.json()
        setResults((prev) => ({
          ...prev,
          query: { status: queryResponse.status, data: queryData },
        }))
      } catch (error: string | any) {
        setResults((prev) => ({ ...prev, query: { error: error.message } }))
      }
    }

    testEndpoints()
  }, [])

  return (
    <div className='p-4 border rounded mb-6 bg-gray-50'>
      <h2 className='text-lg font-bold mb-4'>API Tests</h2>

      {Object.keys(results).length === 0 ? (
        <p>Running tests...</p>
      ) : (
        <div className='space-y-4'>
          {Object.entries(results).map(([test, result]) => (
            <div key={test} className='p-3 border rounded'>
              <h3 className='font-medium'>{test} endpoint</h3>
              {result.error ? (
                <p className='text-red-500 text-sm mt-1'>{result.error}</p>
              ) : (
                <>
                  <p className='text-sm'>
                    Status:{' '}
                    <span
                      className={
                        result.status === 200
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {result.status}
                    </span>
                  </p>
                  <p className='text-sm mt-1'>
                    Data received: {result.data ? '✓' : '✗'}
                  </p>
                  {result.data && (
                    <details className='mt-2'>
                      <summary className='text-xs text-blue-500 cursor-pointer'>
                        View data
                      </summary>
                      <pre className='text-xs mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-40'>
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ApiTest
