import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Login from "../../component/LoginSection";
import FeaturedProducts from "../../component/FeaturedProducts";
import { useState, useEffect } from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './Home.css'

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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        // Check for the presence of a token in localStorage on component mount
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);
    return (
        <>
            <HeroCarouselSection />

            {isAuthenticated && (
                <FeaturedProducts />
            )}

            {!isAuthenticated && (
                <Login />
            )}


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