import { Box, Heading } from '@chakra-ui/react'
import './App.css'
import Header from './components/header'
import Search from './components/search/search'

function App() {
  

  return (
    <>
      <Box>
        <Header />

        <Search />
      </Box>
    </>
  )
}

export default App
