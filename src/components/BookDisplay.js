import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './BookDisplay.css';
import { useCart } from './CartContext';
import axios from 'axios';

const BookDisplay = ({ books }) => {
  const navigate=useNavigate();
  const { addToCart} = useCart();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [review, setReview] = useState('');
  const [showRentDropdown, setShowRentDropdown] = useState(false);
  const [rentalTime, setRentalTime] = useState('');
  const [rentalUnit, setRentalUnit] = useState('hours');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const selectedBook = books.find(b => b.id === parseInt(id));
        if (selectedBook) {
          setBook(selectedBook);
          await fetchReviews(selectedBook.id);
        } else {
          setError('Book not found');
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError('Error fetching book details');
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async (bookId) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reviews/book/${bookId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Error fetching reviews');
      }
    };

    fetchBook();
  }, [id, books]);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleReviewSubmit = async () => {
    if (review.length > 1000) {
      alert('Review cannot exceed 1000 words.');
      return;
    }

    try {
      const newReview = {
        bookId: book.id,
        author: 'Anonymous', // Or use a logged-in user's name
        rating: 5, // Set a default rating or get it from user input
        content: review
      };

      await axios.post('http://localhost:8080/api/reviews', newReview);
      setReviews([...reviews, newReview]);
      setReview('');
      alert('Review submitted!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>Book not found</div>;
  
  const bookImages = [`data:image/jpeg;base64,${book.thumbnail}`];


  const handleImageClick = (event) => {
    const imageElement = event.target;
    const clickX = event.clientX - imageElement.getBoundingClientRect().left;
    const imageWidth = imageElement.clientWidth;

    if (clickX < imageWidth / 2) {
      setCurrentImageIndex(prevIndex => (prevIndex === 0 ? bookImages.length - 1 : prevIndex - 1));
    } else {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % bookImages.length);
    }
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleBuyNow = () => {
    alert('Proceed to Buy Now');
  };

  const handleAddToCart = async (book) => {
    try {
      const userId = localStorage.getItem("userId");
      if(!userId){
        navigate("/login");
        return;
      }
      console.log(userId);
      console.log("Book details",book);
        
        const requestBody = {
            bookId: Number(book.id),
            // quantity: 1, // Default quantity
            userId: Number(userId) // Send userId to the backend
        };

        await axios.post('http://localhost:8080/api/cart/add', requestBody);
        // Optionally, fetch updated cart items to reflect changes
        alert("Item added to the cart successfully");
    } catch (error) {
      if (error.response) {
        console.error('Backend error:', error.response.data);
    } else {
        console.error('Network error:', error.message);
    }
    }
};




  const handleRentDropdownToggle = () => {
    setShowRentDropdown(prevState => !prevState);
  };

  const handleRentTimeChange = (event) => {
    setRentalTime(event.target.value);
  };

  const handleRentUnitChange = (event) => {
    setRentalUnit(event.target.value);
  };

  const handleRentConfirm = () => {
    const time = parseFloat(rentalTime);

    if (isNaN(time) || time <= 0) {
      alert('Please enter a valid rental time.');
      return;
    }

    if (rentalUnit === 'hours' && time > 24 * 30) {
      alert('Rental duration cannot exceed 720 hours (30 days).');
      return;
    }

    if (rentalUnit === 'days' && time > 12 * 30) {
      alert('Rental duration cannot exceed 12 months.');
      return;
    }

    if (rentalUnit === 'months' && time > 12) {
      alert('Rental duration cannot exceed 12 months.');
      return;
    }

    if (rentalUnit === 'years' && time > 1) {
      alert('Rental duration cannot exceed 1 year.');
      return;
    }

    alert(`You have selected to rent for ${rentalTime} ${rentalUnit}`);
    setShowRentDropdown(false);
  };

  return (
    <div className="book-card">
      <div className="image-info-container">
        <div className="image-container">
          <div className="book-name">{book.title}</div>
          <img 
            src={bookImages[currentImageIndex]} 
            alt="Book" 
            className="book-image" 
            onClick={handleImageClick} 
          />
          <div className="dot-container">
            {bookImages.map((_, index) => (
              <span 
                key={index}
                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
        <div className="book-info">
          <div className="book-info-main">
            <p><strong>Price:</strong> {book.price}</p>
            <p><strong>Pages:</strong> {book.pages}</p>
            <p><strong>Rating:</strong> {book.rating} ★</p>
            <p><strong>Cover:</strong> {book.cover}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Published Year:</strong> {book.publishedYear}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
          </div>
          <div className="book-info-extra">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>
          <div className="button-container">
            <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
            <button className="add-to-cart" onClick={()=>handleAddToCart(book)}>Add to Cart</button>
            <button className="buy-for-rent" onClick={handleRentDropdownToggle}>
              {showRentDropdown ? 'Cancel Rent' : 'Buy for Rent'}
            </button>
            {showRentDropdown && (
              <div className="rent-dropdown">
                <h3>Select Rental Duration</h3>
                <div className="rent-time-input">
                  <input
                    type="number"
                    value={rentalTime}
                    onChange={handleRentTimeChange}
                    placeholder="Enter time"
                    min="0"
                  />
                  <select value={rentalUnit} onChange={handleRentUnitChange}>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
                <button className="rent-confirm" onClick={handleRentConfirm}>Confirm</button>
                <button className="rent-cancel" onClick={handleRentDropdownToggle}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="review-section">
        <h3>Write a Review</h3>
        <textarea
          value={review}
          onChange={handleReviewChange}
          maxLength="1000"
          placeholder="Write your review here (up to 1000 words)..."
          rows="6"
          className="review-textarea"
        />
        <button className="submit-review" onClick={handleReviewSubmit}>Submit Review</button>
        
        <div className="reviews-list">
          <h3>Customer Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-item">
                <h4>{review.author} <span>({review.rating} ★)</span></h4>
                <p>{review.content}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDisplay;
