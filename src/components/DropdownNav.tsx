import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {useState, useRef} from 'react'
import Popper from '@mui/material/Popper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Link from 'next/link'
import classes from './Header.module.css'

export default function DropdownNav(props: {
  name: string
  links: {display: string; href: string}[]
}) {
  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  const anchorRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(1)

  const handleClose = (event: any) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }
  return (
    <>
      <div ref={anchorRef}>
        <button
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label={`select page from ${props.name}`}
          aria-haspopup="menu"
          onClick={handleToggle}
          className={classes.button}
        >
          {props.name} <ArrowDropDownIcon />
        </button>
      </div>
      <Popper
        sx={{zIndex: 1}}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom'
                  ? 'center top'
                  : 'center bottom',
            }}
          >
            <div style={{background: 'var(--red)'}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {props.links.map((link, index) => (
                    <MenuItem
                      key={link.href}
                      selected={index === selectedIndex}
                      component={Link}
                      href={link.href}
                      style={{margin: '0.5rem'}}
                      onClick={handleClose}
                    >
                      {link.display}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </>
  )
}
