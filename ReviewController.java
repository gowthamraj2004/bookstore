package com.example.demo.Controller;

import com.example.demo.Entity.Review;
import com.example.demo.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins="http://localhost:3000")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/book/{bookId}")
    public List<Review> getReviewsByBookId(@PathVariable Long bookId) {
        return reviewService.getReviewsByBookId(bookId);
    }

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }
}
