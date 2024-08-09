import ReactDOM from 'react-dom/client'
import BlogContext from './contexts/BlogContext'
import UserContext from './contexts/UserContext'
import NotiContext from './contexts/NotiContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router} from 'react-router-dom'
import Menu from './components/Menu'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotiContext>
      <UserContext>
        <BlogContext>
            <Router>
              <Menu />
            </Router>
        </BlogContext>
      </UserContext>
    </NotiContext>
  </QueryClientProvider>
)
