package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.demo.Entity.Book;
import com.example.demo.Service.BookService;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Integer id) {
        Optional<Book> book = bookService.getBookById(id);
        return book.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Book> addBook(@RequestParam("title") String title,
                                        @RequestParam("author") String author,
                                        @RequestParam("description") String description,
                                        @RequestParam("genre") String genre,
                                        @RequestParam("price") String price,
                                        @RequestParam("pages") Integer pages,
                                        @RequestParam("rating") Double rating,
                                        @RequestParam("cover") String cover,
                                        @RequestParam("publishedYear") String publishedYear,
                                        @RequestParam("thumbnail") MultipartFile thumbnail) throws IOException {
        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setDescription(description);
        book.setGenre(genre);
        book.setPrice(price);
        book.setPages(pages);
        book.setRating(rating);
        book.setCover(cover);
        book.setPublishedYear(publishedYear);
        book.setThumbnail(thumbnail.getBytes());

        Book savedBook = bookService.saveBook(book);
        return ResponseEntity.ok(savedBook);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Integer id,
                                           @RequestParam("title") String title,
                                           @RequestParam("author") String author,
                                           @RequestParam("description") String description,
                                           @RequestParam("genre") String genre,
                                           @RequestParam("price") String price,
                                           @RequestParam("pages") Integer pages,
                                           @RequestParam("rating") Double rating,
                                           @RequestParam("cover") String cover,
                                           @RequestParam("publishedYear") String publishedYear,
                                           @RequestParam("thumbnail") MultipartFile thumbnail) throws IOException {
        Optional<Book> bookOptional = bookService.getBookById(id);
        if (!bookOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        Book book = bookOptional.get();
        book.setTitle(title);
        book.setAuthor(author);
        book.setDescription(description);
        book.setGenre(genre);
        book.setPrice(price);
        book.setPages(pages);
        book.setRating(rating);
        book.setCover(cover);
        book.setPublishedYear(publishedYear);
        if (!thumbnail.isEmpty()) {
            book.setThumbnail(thumbnail.getBytes());
        }

        Book updatedBook = bookService.saveBook(book);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Integer id) {
        if (!bookService.getBookById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/thumbnail/{id}")
    public ResponseEntity<byte[]> getBookThumbnail(@PathVariable Integer id) {
        Optional<Book> book = bookService.getBookById(id);
        if (book.isPresent() && book.get().getThumbnail() != null) {
            return ResponseEntity.ok().body(book.get().getThumbnail());
        }
        return ResponseEntity.notFound().build();
    }
}
