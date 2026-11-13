import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { RiTvLine, RiCheckboxCircleLine, RiStarFill } from 'react-icons/ri';

const COLORS = ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1', '#fd7e14'];

export default function StatsPage({ watchlist }) {
  // 1. Yhteenvetotiedot
  const totalShows = watchlist.length;
  const completedShows = watchlist.filter((item) => item.status === 'Completed').length;
  
  const ratedShows = watchlist.filter((item) => item.rating > 0);
  const averageRating = ratedShows.length > 0
    ? (ratedShows.reduce((acc, item) => acc + item.rating, 0) / ratedShows.length).toFixed(1)
    : '0.0';

  // 2. Katselutilan jakauma (PieChart)
  const statusCounts = {
    'Plan to Watch': 0,
    'Watching': 0,
    'Completed': 0,
  };

  watchlist.forEach((item) => {
    if (statusCounts[item.status] !== undefined) {
      statusCounts[item.status]++;
    }
  });

  const statusData = Object.keys(statusCounts).map((key) => ({
    name: key,
    count: statusCounts[key],
  }));

  // 3. Genrejakauma (BarChart)
  const genreCounts = {};
  watchlist.forEach((item) => {
    item.genres?.forEach((genre) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });

  const genreData = Object.keys(genreCounts).map((key) => ({
    name: key,
    count: genreCounts[key],
  }));

  return (
    <Container className="py-4">
      <h2 className="mb-4">Watchlist Analytics</h2>

      {totalShows === 0 ? (
        <Alert variant="info">
          Katselulistasi on tällä hetkellä tyhjä. Lisää sarjoja Discover-sivulta nähdäksesi tilastoja!
        </Alert>
      ) : (
        <>
          {/* Yhteenvetokortit */}
          <Row className="g-3 mb-4">
            <Col md={4}>
              <Card className="shadow-sm border-0 bg-white">
                <Card.Body className="d-flex align-items-center gap-3">
                  <div className="p-3 bg-primary bg-opacity-10 text-primary rounded fs-3">
                    <RiTvLine />
                  </div>
                  <div>
                    <span className="text-muted small d-block">Total Shows</span>
                    <h3 className="mb-0 fw-bold">{totalShows}</h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm border-0 bg-white">
                <Card.Body className="d-flex align-items-center gap-3">
                  <div className="p-3 bg-success bg-opacity-10 text-success rounded fs-3">
                    <RiCheckboxCircleLine />
                  </div>
                  <div>
                    <span className="text-muted small d-block">Completed</span>
                    <h3 className="mb-0 fw-bold">{completedShows}</h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm border-0 bg-white">
                <Card.Body className="d-flex align-items-center gap-3">
                  <div className="p-3 bg-warning bg-opacity-10 text-warning rounded fs-3">
                    <RiStarFill />
                  </div>
                  <div>
                    <span className="text-muted small d-block">Average Rating</span>
                    <h3 className="mb-0 fw-bold">{averageRating} <span className="fs-6 text-muted">/ 5</span></h3>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Kaaviot */}
          <Row className="g-4">
            {/* Pylväskaavio: Genrejakauma */}
            <Col md={6}>
              <Card className="shadow-sm h-100 border-0">
                <Card.Body>
                  <Card.Title className="fs-6 fw-bold mb-3">Shows by Genre</Card.Title>
                  {genreData.length === 0 ? (
                    <p className="text-muted py-5 text-center">Ei genre-dataa saatavilla.</p>
                  ) : (
                    <div style={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer>
                        <BarChart data={genreData}>
                          <XAxis dataKey="name" angle={-15} textAnchor="end" height={50} />
                          <YAxis allowDecimals={false} />
                          <Tooltip />
                          <Bar dataKey="count" fill="#0d6efd" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Ympyräkaavio: Katselutila */}
            <Col md={6}>
              <Card className="shadow-sm h-100 border-0">
                <Card.Body>
                  <Card.Title className="fs-6 fw-bold mb-3">Shows by Status</Card.Title>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={statusData}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          label
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}