export default function LandingFooter () {
    return (
        <>
            <footer className="bg-dark text-white py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6">
                            <h3 className="h5 mb-3">Benz-World</h3>
                            <p className="text-white-50">Experience the best in automotive luxury and performance with Mercedes-Benz.</p>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="h6 mb-3">Quick Links</h4>
                            <ul className="list-unstyled">
                                <li><a href="index.html" className="text-white-50 text-decoration-none">Home</a></li>
                                <li><a href="catalog.html" className="text-white-50 text-decoration-none">Catalog</a></li>
                                <li><a href="search.html" className="text-white-50 text-decoration-none">Search</a></li>
                                <li><a href="register.html" className="text-white-50 text-decoration-none">Register</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="h6 mb-3">Support</h4>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white-50 text-decoration-none">Contact Us</a></li>
                                <li><a href="#" className="text-white-50 text-decoration-none">FAQs</a></li>
                                <li><a href="#" className="text-white-50 text-decoration-none">Dealership Locations</a></li>
                                <li><a href="#" className="text-white-50 text-decoration-none">Service Centers</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="h6 mb-3">Connect With Us</h4>
                            <div className="d-flex gap-3 mb-3">
                                <a href="#" className="text-white-50"><i className="fab fa-facebook-f fa-lg"></i></a>
                                <a href="#" className="text-white-50"><i className="fab fa-twitter fa-lg"></i></a>
                                <a href="#" className="text-white-50"><i className="fab fa-instagram fa-lg"></i></a>
                                <a href="#" className="text-white-50"><i className="fab fa-youtube fa-lg"></i></a>
                            </div>
                            <h5 className="h6 mb-2">Subscribe to our newsletter</h5>
                            <div className="input-group">
                                <input type="email" className="form-control" placeholder="Your email" />
                                    <button className="btn btn-primary" type="button">Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4 bg-secondary" />
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start">
                            <p className="small text-white-50">&copy; 2023 Benz-World. All rights reserved.</p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item"><a href="#" className="text-white-50 text-decoration-none small">Privacy Policy</a></li>
                                <li className="list-inline-item"><a href="#" className="text-white-50 text-decoration-none small">Terms of Service</a></li>
                                <li className="list-inline-item"><a href="#" className="text-white-50 text-decoration-none small">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            <button id="back-to-top" className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 translate-middle d-none">
                <i className="fas fa-arrow-up"></i>
            </button>
        </>
    );
}