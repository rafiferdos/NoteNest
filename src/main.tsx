import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './components/providers/theme-provider.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { ScrollContainer } from 'react-nice-scroll'
import 'react-nice-scroll/dist/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ScrollContainer>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
        </ScrollContainer>
      </PersistGate>
    </Provider>
  </StrictMode>
)
