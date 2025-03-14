import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

// Import .jpeg images from the assets folder
import image5 from '../../assets/images/car-1.jpg';
import image6 from '../../assets/images/car-2.jpg';
import image7 from '../../assets/images/car-3.jpg';
import image8 from '../../assets/images/car-4.jpg';
import image1 from '../../assets/images/car-5.jpg';
import image2 from '../../assets/images/car-6.jpg';
import image3 from '../../assets/images/car-7.jpg';
import image4 from '../../assets/images/car-8.jpg';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState(""); 
    const [selectedModel, setSelectedModel] = useState(""); 

    const token = localStorage.getItem("token");
    let userRole = null;
    let userId = null;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userRole = decodedToken.role;
            userId = decodedToken.userId;
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage")
            .then(response => {
                const carsWithValidImages = response.data.map((car, index) => ({
                    ...car,
                    imageUrl: car.imageUrl || imagePool[index % imagePool.length]  
                }));
                setCars(carsWithValidImages);
            })
            .catch(error => console.error("There was an error fetching the cabs:", error));
    }, []);

    const imagePool = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];

    const handleFilterChange = async () => {
        try {
            const response = await axios.get("http://localhost:8080/MegaCity_war_exploded/filteringUserCars", {
                params: {
                    status: selectedStatus || undefined,
                    model: selectedModel || undefined
                }
            });

            if (Array.isArray(response.data)) {
                const carsWithValidImages = response.data.map((car, index) => ({
                    ...car,
                    imageUrl: car.imageUrl || imagePool[index % imagePool.length]
                }));
                setCars(carsWithValidImages);
            } else {
                console.error("Invalid filtered data:", response.data);
                setCars([]);
            }
        } catch (error) {
            console.error("Error fetching filtered cabs:", error);
        }
    };

    return (
        <div className="container mt-5">
            {token && userId && userRole === "customer" && (
                <div className="d-flex justify-content-between mb-5">
                    <button className="btn btn-warning btn-lg" onClick={() => navigate("/my-bookings")}>
                        📅 View My Bookings
                    </button>
                    <button className="btn btn-danger btn-lg" onClick={() => navigate("/payments")}>
                        💳 View & Pay Bookings
                    </button>
                </div>
            )}
            <h2 className="text-center mb-5 text-primary font-weight-bold">🚖 Cab List</h2>

            {/* Filter Controls */}
            <div className="row mb-5 justify-content-center">
                <div className="col-md-3 mb-3">
                    <select 
                        className="form-select shadow-lg border-0 rounded-3 p-3" 
                        value={selectedStatus} 
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        style={{ backgroundColor: "#F0F8FF" }}
                    >
                        <option value="">All Status</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>
                </div>

                <div className="col-md-3 mb-3">
                    <input 
                        type="text" 
                        className="form-control shadow-lg border-0 rounded-3 p-3" 
                        placeholder="Filter by Model..." 
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        style={{ backgroundColor: "#F0F8FF" }}
                    />
                </div>

                <div className="col-md-2 mb-3">
                    <button 
                        className="btn btn-teal w-100 shadow-lg border-0 rounded-3 p-3" 
                        onClick={handleFilterChange}
                        style={{ backgroundColor: "#20B2AA" }}
                    >
                        Apply Filters
                    </button>
                </div>

                <div className="col-md-2 mb-3">
                    <button 
                        className="btn btn-light w-100 shadow-lg border-0 rounded-3 p-3" 
                        onClick={() => {
                            setSelectedStatus("");
                            setSelectedModel("");
                            handleFilterChange();
                        }}
                        style={{ backgroundColor: "#DCDCDC" }}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Cab Cards */}
            <div className="row">
                {cars.map(car => (
                    <div key={car.id} className="col-lg-3 col-md-4 mb-4">
                        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                            <img
                                src={car.imageUrl}
                                className="card-img-top"
                                alt={car.name}
                                style={{ height: "280px", objectFit: "cover" }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title font-weight-bold text-dark">{car.name}</h5>
                                <p className="card-text text-muted mb-2">{car.model} - {car.year}</p>
                                <p className={`fw-semibold mb-4 ${car.status === "Available" ? "text-success" : "text-danger"}`}>
                                    {car.status}
                                </p>

                                {token && userId && userRole === "customer" && (
                                    <Link to={`/bookings/${car.id}`} state={{ carImageUrl: car.imageUrl, carName: car.name, carPrice: 5000 }}
                                        className={`btn w-100 fw-bold ${car.status !== "Available" ? "btn-secondary disabled" : "btn-primary"}`}
                                        aria-disabled={car.status !== "Available"}
                                        tabIndex={car.status !== "Available" ? -1 : 0}
                                        style={{ backgroundColor: car.status === "Available" ? "#008CBA" : "#B0C4DE" }}
                                    >
                                        {car.status === "Available" ? "Book Now" : "Unavailable"}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarList;
