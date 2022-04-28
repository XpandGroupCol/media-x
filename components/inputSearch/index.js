import { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import { Search, SearchIconWrapper, StyledInputBase } from './styles'

const InputSearch = ({ placeholder, clear, onSubmit, queryValue = '' }) => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    setSearch(queryValue)
  }, [queryValue])

  const handleChange = ({ target }) => {
    setSearch(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return null
    onSubmit(search)
  }

  const handleClear = () => {
    setSearch('')
    if (clear && search === queryValue) clear()
  }

  const onBlur = () => {
    if (search !== queryValue) setSearch(queryValue)
  }

  return (
    <Search onSubmit={handleSubmit}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        value={search}
        placeholder={placeholder}
        onBlur={onBlur}
      />

      {search && (
        <IconButton size='small' onClick={handleClear}>
          <CloseIcon fontSize='small' />
        </IconButton>
      )}

    </Search>
  )
}

export default InputSearch
