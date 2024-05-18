import type { FC } from "react";
import { useState } from "react";
import styles from "./Header.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";

type Route =
  | {
      display: string;
      path: string;
    }
  | { display: string; routes: Route[] };
const displayRoutes: Route[] = [
  { path: "/", display: "Home" },
  { path: "/resources", display: "Resources" },
  { path: "/news", display: "News" },
  {
    display: "Campaigns",
    routes: [
      {
        path: "/campaigns/r2r",
        display: "The Early Leasing Ordinance and the Right to Renew",
      },
    ],
  },
  {
    display: "Blog",
    routes: [
      {
        path: "/blog/ten-reasons",
        display: "10 Reasons to Start a Tenant Association",
      },
    ],
  },
];

const MenuItem: FC<{ route: Route }> = ({ route }) => {
  const [isOpen, setIsOpen] = useState(true);
  if ("routes" in route) {
    return (
      <>
        <ListItemButton
          className={styles.listItem}
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        >
          {route.display}
        </ListItemButton>
        <Collapse in={isOpen}>
          <List sx={{ pl: 4 }}>
            {route.routes.map((subroute, i) => (
              <MenuItem key={i} route={subroute} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemButton component="a" href={route.path} className={styles.listItem}>
      {route.display}
    </ListItemButton>
  );
};

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsMenuOpen((prevState) => !prevState)}>
        <MenuIcon className={styles.icon} />
      </Button>
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <List className={styles.list}>
          {displayRoutes.map((route, i) => (
            <MenuItem key={i} route={route} />
          ))}
        </List>
      </Drawer>
    </>
  );
}
