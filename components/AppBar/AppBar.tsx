"use client";

import React, { useState, useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import classnames from "classnames";
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Container,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./AppBar.module.css";
import Link from "next/link";

const AppBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) =>
      setAnchorElNav(event.currentTarget),
    []
  );

  const handleCloseNavMenu = useCallback(
    (to: string) => () => {
      setAnchorElNav(null);
      if (to) {
        router.push(to);
      }
    },
    [router]
  );

  const publicPages = useMemo(
    () => [
      {
        to: "/blog",
        label: "Blog",
        tooltip: "Read our blogs",
      },
      {
        to: "/income-tax-calculator",
        label: "Income Tax",
        tooltip: "Income Tax Calculator",
      },
      {
        to: "/sip-calculator",
        label: "SIP",
        tooltip: "SIP Calculator",
      },
      {
        to: "/lumpsum-calculator",
        label: "Lumpsum",
        tooltip: "Lumpsum Calculator",
      },
      {
        to: "/fd-calculator",
        label: "Fixed Deposit",
        tooltip: "FD Calculator",
      },
      {
        to: "/rd-calculator",
        label: "Recurring Deposit",
        tooltip: "RD Calculator",
      },
      {
        to: "/loan-emi-calculator",
        label: "Loan EMI",
        tooltip: "Loan EMI Calculator",
      },
    ],
    []
  );

  const handleLogoClicked = useCallback(() => router.push("/"), [router]);

  return (
    <>
      <Container className={styles.appbarContainer} maxWidth={false}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0, display: { xs: "block", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu("")}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {publicPages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={handleCloseNavMenu(page.to)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <h6 className={styles.logo} onClick={handleLogoClicked}>
            <span className="profit">Investment</span>
            <span className="loss">Calculators</span>
          </h6>

          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {publicPages.map(({ label, tooltip, to }) => {
              const isActive = pathname === to;
              return (
                <Tooltip key={label} title={tooltip}>
                  <Link
                    href={to}
                    className={classnames(styles.navLink, {
                      [styles.activeNavLink]: isActive,
                    })}
                  >
                    {label}
                  </Link>
                </Tooltip>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </>
  );
};

export default AppBar;
