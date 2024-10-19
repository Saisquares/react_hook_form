import { Provider } from '@chakra-ui/react/provider'
import React from 'react'
import { Box, baseTheme } from '@chakra-ui/react'
import ReactHookForm from './ReactHookForm.tsx'

const App = () => {
  return (
   <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
     <ReactHookForm />
   </Box>
  )
}

export default App