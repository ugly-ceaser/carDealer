import { Car, Handshake, Shield } from "lucide-react";
import BgImage from "../../assets/images/banner/eq-electric.jpg"
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-5" style={{ height: '60vh', backgroundImage: `url(${BgImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div className="container text-white">
          <h1 className="display-3 fw-bold mb-4">Welcome to Benz-World</h1>
          <p className="lead mb-5">Discover our exclusive collection of luxury vehicles</p>
          <Link to="/user/catalog" className="btn btn-primary btn-lg">
            Browse Cars
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-dark">
        <div className="container">
          <h2 className="text-center mb-5 text-white">Why Choose Benz-World</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm text-center p-4">
                <div className="card-body">
                  <Car className="mb-3 text-primary" size={40} />
                  <h3 className="card-title">Premium Selection</h3>
                  <p className="card-text">
                    We offer only the finest luxury vehicles from top manufacturers.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm text-center p-4">
                <div className="card-body">
                  <Shield className="mb-3 text-primary" size={40} />
                  <h3 className="card-title">Quality Guaranteed</h3>
                  <p className="card-text">
                    All our vehicles undergo rigorous inspection and maintenance.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm text-center p-4">
                <div className="card-body">
                  <Handshake className="mb-3 text-primary" size={40} />
                  <h3 className="card-title">Expert Service</h3>
                  <p className="card-text">
                    Our team of experts is here to help you find the perfect car.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Featured Models</h2>
          <div className="row g-4" id="featured-models">
            {/* You can map featured car components here */}
          </div>
          <div className="text-center mt-5">
            <Link to="/user/catalog" className="btn btn-primary btn-lg">
              View All Models
            </Link>
          </div>
        </div>
      </section>
    </div >
  );
};

export default DashboardPage;
