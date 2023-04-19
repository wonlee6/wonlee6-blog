import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function LoadingSpinner() {
  return (
    <Box
      component={'div'}
      sx={{
        display: 'flex',
        width: '100%',
        height: '25rem',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <CircularProgress />
    </Box>
  )
}
