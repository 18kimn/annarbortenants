"use client";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState, useRef } from "react";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Link from "next/link";
import classes from "./Header.module.css";

export default function DropdownNav(props: {
  name: string;
  links: { display: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as Node)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <button
        ref={anchorRef}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={handleToggle}
        className={classes.navButton}
      >
        {props.name}
        <ArrowDropDownIcon fontSize="small" />
      </button>
      <Popper
        sx={{ zIndex: 60 }}
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: "top left" }}>
            <div className={classes.dropdownPaper}>
              <ClickAwayListener onClickAway={handleClose}>
                <div role="menu">
                  {props.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      className={classes.dropdownItem}
                      onClick={() => setOpen(false)}
                    >
                      {link.display}
                    </Link>
                  ))}
                </div>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </>
  );
}
