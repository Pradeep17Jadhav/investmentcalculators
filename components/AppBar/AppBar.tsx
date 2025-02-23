"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Container,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IncomeTaxPage from "@/app/income-tax-calculator/IncomeTaxPage";

import styles from "./AppBar.module.css";

const AppBar = () => {
  const router = useRouter();

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
        to: "/income-tax",
        label: "Income Tax Calculator",
        Icon: IncomeTaxPage,
      },
    ],
    []
  );

  const handleLogoClicked = useCallback(() => router.push("/"), [router]);

  return (
    <>
      <Container className={styles.appbarContainer} maxWidth={false}>
        <Toolbar disableGutters>
          <h6 className={styles.logo} onClick={handleLogoClicked}>
            <span className="profit">Investment</span>
            <span className="loss">Calculators</span>
          </h6>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "none" } }}>
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
        </Toolbar>
      </Container>
    </>
  );
};

export default AppBar;
