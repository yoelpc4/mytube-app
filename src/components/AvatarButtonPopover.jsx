import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import AvatarMenuList from './AvatarMenuList.jsx'

export default function AvatarButtonPopover() {
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <>
      <Button onClick={handleClick}>
        <Avatar alt="avatar" src="https://i.pravatar.cc/200" />
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleClose}
      >
        <AvatarMenuList onMenuClicked={handleClose} />
      </Popover>
    </>
  )
}
