package com.example.demo.Service;

import com.example.demo.Entity.Review;
import com.example.demo.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsByBookId(Long bookId) {
        return reviewRepository.findByBookId(bookId);
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }
}
