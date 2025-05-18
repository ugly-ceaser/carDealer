import React from 'react'
import { Link } from 'react-router-dom'

function Catalog() {
    return (
        <section class="py-5">
            <div class="container">

                <div class="row g-4 mb-5">
                    <div class="col-md-4">
                        <div class="card h-100 shadow-sm">
                            <div class="card-body">
                                <h3 class="card-title">Search Cars</h3>
                                <p class="card-text text-muted">Find the perfect car that matches your preferences</p>
                                <Link to="/user/search" class="btn btn-primary w-100">Search Cars</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row g-4"></div>
            </div>
        </section>
    )
}

export default Catalog
