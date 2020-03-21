import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import SearchModal from "../SearchModal";

import siftedLogo from "../../assets/images/logo.png"

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  primeColor: {
    backgroundColor: "#0b234a",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#335da1"
    }
  },
  secColor: {
    backgroundColor: "#d19200",
    color: "#0b234a",
    "&:hover": {
      backgroundColor: "#deab35"
    }
  },
  logoDiv: {
    flex: 1,
    textAlign: "center"
  },
  logoMain: {
    width: "110px",
    textAlign: "center"
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small" variant="contained" className={classes.primeColor}>
          Subscribe
        </Button>
        <div className={classes.logoDiv}>
        <img src={siftedLogo} alt="Sifted Truth Logo" className={classes.logoMain} />
        </div>
        <SearchModal />
        <Link href="/register">
        <Button size="small" variant="contained" className={classes.secColor}>
          Register
        </Button>
        </Link>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map(section => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            <Button color="default">
            {section.title}
            </Button>
            
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string
};
