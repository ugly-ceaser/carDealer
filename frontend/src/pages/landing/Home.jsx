import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './Home.css'
import Login from "../../component/landing/LoginSection";

import productImage from '../../assets/images/products/1.jpg';

const HeroCarouselSection = () => {
    const slides = [
        {
            class: 'slide-1',
            car: 'The New S-Class',
            category: 'Luxury Redefined',
        },
        {
            class: 'slide-2',
            car: 'Mercedes-AMG GT',
            category: 'Performance Unleashed',
        },
        {
            class: 'slide-3',
            car: 'EQ Electric Range',
            category: 'The Future of Mobility',
        },
    ]

    return (
        <div className="hero">
            <Swiper // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                loop={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                className="h-100"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide className={`d-flex align-items-end justify-content-center pb-lg-5 ${slide.class}`} key={index} style={{ backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="w-auto text-center bg-cover bg-center text-white">
                            <h1 className="fs-14">{slide.car}</h1>
                            <p className="fs-10">{slide.category}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default function HomePage() {

    const Products = [
        {
            id: 1,
            name: 'Mercedes-Benz S-Class',
            description: 'The epitome of luxury and comfort with advanced technology',
            price: 110000,
            image: '1.JPG'
        },
        {
            id: 2,
            name: 'Mercedes-Benz GLE SUV',
            description: 'Versatile luxury SUV with spacious interior and powerful performance',
            price: 85000,
            image: '2.jpg'
        },
        {
            id: 3,
            name: 'Mercedes-Benz EQS',
            description: 'All-electric luxury sedan with impressive range and technology',
            price: 125000,
            image: '4.jpg'
        }
    ]
    return (
        <>
            <HeroCarouselSection/>

            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">Featured Models</h2>
                    <div className="row g-4">
                        {Products.map((product, index) => (
                            <div className="col-md-6 col-lg-4" key={index}>
                                <div className="card h-100 shadow-sm hover-card">
                                    <img src={productImage} className="card-img-top" alt="Mercedes-Benz S-Class" />
                                    <div className="card-body">
                                        <h3 className="card-title">{product.name}</h3>
                                        <p className="card-text text-muted">{product.description}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fs-5 fw-bold">${product.price}</span>
                                            <Link to={`catalog/${product.id}`} className="btn btn-primary">View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-5">
                        <Link to='' href="catalog.html" className="btn btn-primary btn-lg">View All Models</Link>
                    </div>
                </div>
            </section>

            <Login/>

            <section className="py-5 bg-dark text-white">
                <div className="container">
                    <h2 className="text-center mb-5">Why Choose Benz-World</h2>
                    <div className="row g-4">
                        <div className="col-md-4 text-center">
                            <div className="mb-4">
                                <i className="fas fa-award fa-3x"></i>
                            </div>
                            <h3>Premium Quality</h3>
                            <p className="text-white-50">Experience unmatched craftsmanship and attention to detail in every vehicle.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="mb-4">
                                <i className="fas fa-shield-alt fa-3x"></i>
                            </div>
                            <h3>Safety First</h3>
                            <p className="text-white-50">Advanced safety features to protect you and your loved ones on every journey.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="mb-4">
                                <i className="fas fa-bolt fa-3x"></i>
                            </div>
                            <h3>Innovation</h3>
                            <p className="text-white-50">Cutting-edge technology and innovative features that define the future of driving.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}