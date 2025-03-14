import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MyBookings = () => {
    const { id } = useParams();  // Get carId from URL
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/MegaCity_war_exploded/booking`, {
                    params: { userId }
                });
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [userId]);

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/MegaCity_war_exploded/booking?id=${id}&action=updateStatus&status=${newStatus}`
            );
    
            if (response.data === "Booking Status Updated Successfully") {
                alert(`Booking ${newStatus} successfully!`);
    
                // Update the state immediately
                setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking.id === id ? { ...booking, status: newStatus } : booking
                    )
                );
            } else {
                alert("Failed to update booking!");
            }
        } catch (error) {
            console.error(`Error updating booking to ${newStatus}:`, error);
            alert(`Error updating booking to ${newStatus}. Check console for details.`);
        }
    };

    return (
        <div className="container mt-5">
            {/* Title and Refresh Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-info">📅 My Recent Bookings</h3>
                <Button 
                    variant="outline-info" 
                    onClick={() => window.location.reload()} 
                    className="shadow-sm p-2"
                    style={{ fontWeight: "bold" }}
                >
                    🔄 Refresh
                </Button>
            </div>

            {/* Loading Indicator */}
            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status" variant="info">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : bookings.length === 0 ? (
                <p className="text-center text-muted">No bookings found.</p>
            ) : (
                <Table striped bordered hover responsive className="text-center shadow-lg rounded-3">
                    <thead className="table-info">
                        <tr>
                            <th>Car ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking.id} className="hover-effect">
                                <td>{booking.carId}</td>
                                <td>{booking.startDate}</td>
                                <td>{booking.endDate}</td>
                                <td>RS. {booking.totalAmount}</td>
                                <td className={booking.status === "Pending" ? "text-warning fw-bold" : "text-success fw-bold"}>
                                    {booking.status}
                                </td>
                                <td>
                                    {booking.status === "Pending" && (
                                        <button 
                                            className="btn btn-danger btn-sm shadow-sm"
                                            onClick={() => handleUpdateStatus(booking.id, "Cancelled")}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default MyBookings;
