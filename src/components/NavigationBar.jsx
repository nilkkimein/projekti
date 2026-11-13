import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { RiTvLine, RiBookmarkLine, RiBarChartLine } from 'react-icons/ri';

export default function NavigationBar({ watchlistCount }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold d-flex align-items-center gap-2">
          <RiTvLine className="text-primary fs-4" /> ShowTrack
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end className="d-flex align-items-center gap-1">
              <RiTvLine /> Discover
            </Nav.Link>
            <Nav.Link as={NavLink} to="/watchlist" className="d-flex align-items-center gap-1">
              <RiBookmarkLine /> Watchlist{' '}
              <Badge bg="primary" pill className="ms-1">
                {watchlistCount}
              </Badge>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/stats" className="d-flex align-items-center gap-1">
              <RiBarChartLine /> Statistics
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}