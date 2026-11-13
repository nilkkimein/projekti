import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { RiDeleteBinLine, RiStarFill } from 'react-icons/ri';

export default function WatchlistPage({ watchlist, onRemove, onUpdateStatus, onRate }) {
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredList = watchlist.filter((item) => {
    if (filterStatus === 'All') return true;
    return item.status === filterStatus;
  });

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2>My Watchlist ({filteredList.length})</h2>
        <Form.Select
          style={{ width: '220px' }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Plan to Watch">Plan to Watch</option>
          <option value="Watching">Watching</option>
          <option value="Completed">Completed</option>
        </Form.Select>
      </div>

      {watchlist.length === 0 ? (
        <p className="text-muted">Katselulistasi on tyellä. Lisää sarjoja Discover-sivulta!</p>
      ) : filteredList.length === 0 ? (
        <p className="text-muted">Ei sarjoja tällä suodattimella.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredList.map((item) => (
            <Col key={item.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.name}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-6 fw-bold">{item.name}</Card.Title>
                  <div className="mb-2">
                    <Badge
                      bg={
                        item.status === 'Completed'
                          ? 'success'
                          : item.status === 'Watching'
                          ? 'primary'
                          : 'secondary'
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>

                  <Form.Group className="mb-2">
                    <Form.Label className="small text-muted mb-1">Status:</Form.Label>
                    <Form.Select
                      size="sm"
                      value={item.status}
                      onChange={(e) => onUpdateStatus(item.id, e.target.value)}
                    >
                      <option value="Plan to Watch">Plan to Watch</option>
                      <option value="Watching">Watching</option>
                      <option value="Completed">Completed</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="small text-muted mb-1 d-flex align-items-center gap-1">
                      <RiStarFill className="text-warning" /> Rating (1-5):
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      value={item.rating}
                      onChange={(e) => onRate(item.id, e.target.value)}
                    >
                      <option value="0">Not rated</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Masterpiece</option>
                    </Form.Select>
                  </Form.Group>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="mt-auto d-flex align-items-center justify-content-center gap-1"
                    onClick={() => onRemove(item.id)}
                  >
                    <RiDeleteBinLine /> Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}