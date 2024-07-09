"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useGlobalTheme } from "@/utils/themeContext";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PageSearch from "./PageSearch";
import { NotificationAdd, NotificationFetched, openProps } from "@/types";
import { quickLinks } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Apps from "./Apps";
import { useAuth } from "@/utils/AuthContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { db } from "@/utils/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
} from "@firebase/firestore";
import NotificationsList from "./NotificationsList";
export default function Navbar({ open, setOpen }: openProps) {
  const router = useRouter();
  const { logout, admin, user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [popOverEl, setPopOverEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [notifications, setNotifications] = React.useState<
    NotificationFetched[]
  >([]);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopOverEl(event.currentTarget);
  };

  const handleClose = () => {
    setPopOverEl(null);
  };

  const openPopOver = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  //notication list anchor
  const [notificationAnchorEl, setNotificationAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationOpen = Boolean(notificationAnchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  React.useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      where("receiver", "==", user._id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedNotifications = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as NotificationFetched)
      );
      setNotifications(updatedNotifications);
    });
    return () => unsubscribe();
  }, [user]);

  const menuId = "primary-search-account-menu";
  const notificationId = "primary-search-notification-menu";
  const renderNotifications = (
    <Menu
      anchorEl={notificationAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={notificationId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNotificationOpen}
      onClose={handleNotificationClose}
    >
      <NotificationsList {...{ notifications, setNotifications }} />
    </Menu>
  );
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          router.push(`/profile/${user._id}`);
          handleMenuClose();
        }}
      >
        Account
      </MenuItem>
      <MenuItem
        onClick={() => {
          router.push("/profile/edit");
          handleMenuClose();
        }}
      >
        Edit
      </MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleNotificationOpen}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={notifications?.length || 0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );
  //render notifications

  return (
    <>
      <AppBar
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: {
            xs: "100vw",
            md: `calc(100vw - 460px)`,
          },
          marginLeft: {
            xs: 0,
            md: "220px",
          },
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
            }}
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            size="large"
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => router.back()}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => setIsSearchOpen(true)}>
            <SearchIcon />
          </IconButton>
          {/* <Button
            variant="text"
            onClick={(event) => setPopOverEl(event.currentTarget)}
            className="hidden sm:flex"
            endIcon={<KeyboardArrowDownIcon />}
          >
            Apps
          </Button> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotificationOpen}
            >
              <Badge badgeContent={notifications?.length || 0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Popover
        id={id}
        open={Boolean(popOverEl)}
        anchorEl={popOverEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          width: "100%",
        }}
      >
        <Apps />
      </Popover>
      {renderMobileMenu}
      {renderMenu}
      {renderNotifications}
      <PageSearch {...{ open: isSearchOpen, setOpen: setIsSearchOpen }} />
    </>
  );
}
