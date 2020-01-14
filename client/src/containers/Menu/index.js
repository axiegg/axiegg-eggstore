import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

// import logo from 'assets/logo.png';

import MenuAccount from './MenuAccount';

const MENU_ITEMS = [
  { link: '/teams', title: 'Teams' },
];

class Menu extends Component {
  state = {
    fixed: false,
    hovered: false,
    forceNoHover: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollY = window.pageYOffset;
    const { fixed } = this.state;

    if (scrollY > 0 && !fixed) {
      this.setState({ fixed: true });
    } else if (scrollY === 0 && fixed) {
      this.setState({ fixed: false });
    }
  }

  setHovered = (hovered) => {
    this.setState({ hovered });
  }

  setForceNoHover = (e, url) => {
    if (url) {
      e.preventDefault();
      e.stopPropagation();
      this.props.history.push(url);
    }

    this.setState({ forceNoHover: true });
    setTimeout(() => {
      this.setState({ forceNoHover: false });
    }, 1000);
  }

  render() {
    const { fixed, hovered, forceNoHover } = this.state;

    return (
      <nav className={classnames(
        styles.nav,
        {
          [styles.fixed]: fixed,
          [styles.hovered]: hovered,
          [styles.hoveredNo]: forceNoHover,
        },
      )}
      >
        <Link to="/" className={styles.logo}>
          Logo here
        </Link>
        <ul className={styles.menuList}>
          {MENU_ITEMS.map(item => (
            <li key={item.link} className={styles.menuItem}>
              <Link className={styles.menuItemLink} to={item.link}>
                <span className={styles.menuItemTitle}>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.right}>
          <MenuAccount />
        </div>
      </nav>
    );
  }
}

export default withRouter(Menu);
