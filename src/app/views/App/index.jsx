import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { Navbar, Nav, NavItem, Col, Grid, Row } from 'react-bootstrap';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        { href: '', title: 'Home' },
        { href: 'payments', title: 'Payments' },
      ],
      active: 0
    };

    this.fields = {};
    _.bindAll(this, '_onSelect', '_renderItem');
  }

  componentWillMount() {
    const active = _.findIndex(this.state.items, (i) => {
      const expr = `^/?#/${i.href || '_'}/?(.*)$`;
      if (location.hash.match(new RegExp(expr))) {
        return true;
      }
      return false;
    });
    this.setState({ active: active !== -1 ? active : 0 });
  }

  _onSelect(key) {
    this.setState({ active: key }, () => {
      const { items } = this.state;
      const { href = '#' } = items[key];

      this.props.router.push(`/${href}`);
    });
  }

  _renderItem(item, key) {
    return (
      <NavItem
        ref={(ref) => { this.fields[key] = ref; }}
        key={`navitem_${key}`}
        eventKey={key}
        href={item.href}
        title={item.title}
      >
        {item.title}
      </NavItem>
    );
  }

  _getNavArray() {
    return this.state.items;
  }

  render() {
    return (
      <Grid style={{ marginTop: 15 }}>
        <Row>
          <Col xs={12} md={12}>
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>DataArt
                </Navbar.Brand>
              </Navbar.Header>
              <Nav
                activeKey={this.state.active}
                onSelect={this._onSelect}
              >
                {this.state.items.map(this._renderItem)}
              </Nav>
            </Navbar>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
}

App.propTypes = {
  router: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.any // eslint-disable-line
};
