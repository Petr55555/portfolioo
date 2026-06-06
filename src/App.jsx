import { useState } from 'react'
import Layout from './components/Layout.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'

const pages = { home: Home, projects: Projects, contact: Contact }

export default function App() {
  const [page, setPage] = useState('home')
  const Page = pages[page]

  return (
    <Layout page={page} setPage={setPage}>
      <Page setPage={setPage} />
    </Layout>
  )
}
