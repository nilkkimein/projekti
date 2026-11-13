import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { RiSearchLine, RiAddLine, RiCheckLine } from 'react-icons/ri';

export default function DiscoverPage({ watchlist, onAdd }) {
  const [query, setQuery] = useState('');
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Haetaan oletuksena päivän ohjelmia (tai suosittuja sarjoja) latautuessa
  useEffect(() => {
    fetchShows('friends'); // Oletushaku alkuun
  }, []);

  const fetchShows = async (searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`);
      if (!res.ok) throw new Error('Verkkovirhe ladattaessa sarjoja TVMazesta.');
      const data = await res.json();
      setShows(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchShows(query);
  };

  const isAlreadyInWatchlist = (id) => {
    return watchlist.some((item) => item.id === id);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Discover TV Shows</h2>

      {/* Hakulomake */}
      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="g-2">
          <Col xs={10} md={10}>
            <Form.Control
              type="text"
              placeholder="Search for TV shows (e.g. Breaking Bad, Office, Game of Thrones)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col xs={2} md={2}>
            <Button type="submit" variant="primary" className="w-100 d-flex align-items-center justify-content-center gap-1">
              <RiSearchLine /> <span className="d-none d-md-inline">Search</span>
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Virheilmoitus */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Latausanimaatio */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Ladataan sarjoja...</p>
        </div>
      ) : (
        /* Sarjojen ruudukko */
        <Row xs={1} md={3} lg={4} className="g-4">
          {shows.map(({ show }) => {
            const added = isAlreadyInWatchlist(show.id);
            return (
              <Col key={show.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'}
                    alt={show.name}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-6 fw-bold text-truncate">{show.name}</Card.Title>
                    <Card.Text className="small text-muted mb-2">
                      {show.genres?.join(', ') || 'Genre ei tiedossa'}
                    </Card.Text>

                    <Button
                      variant={added ? 'success' : 'outline-primary'}
                      size="sm"
                      className="mt-auto d-flex align-items-center justify-content-center gap-1"
                      onClick={() => !added && onAdd(show)}
                      disabled={added}
                    >
                      {added ? (
                        <>
                          <RiCheckLine /> In Watchlist
                        </>
                      ) : (
                        <>
                          <RiAddLine /> Add to Watchlist
                        </>
                      )}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}