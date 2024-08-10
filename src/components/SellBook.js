import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const SellBook = () => {
  const [data, setData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    price: "",
    pages: "",
    rating: "",
    cover: "",
    publishedYear: "",
    thumbnail: null
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFileChange = (e) => {
    setData({ ...data, thumbnail: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const url = "http://localhost:8080/api/books/add";
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Book added successfully");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.sellbook_container}>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <h1>Sell a Book</h1>
        <input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
          value={data.title}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Author"
          name="author"
          onChange={handleChange}
          value={data.author}
          required
          className={styles.input}
        />
        <textarea
          placeholder="Description"
          name="description"
          onChange={handleChange}
          value={data.description}
          required
          className={styles.textarea}
        />
        <input
          type="text"
          placeholder="Genre"
          name="genre"
          onChange={handleChange}
          value={data.genre}
          required
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          onChange={handleChange}
          value={data.price}
          required
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Pages"
          name="pages"
          onChange={handleChange}
          value={data.pages}
          required
          className={styles.input}
        />
        <input
          type="number"
          step="0.1"
          placeholder="Rating"
          name="rating"
          onChange={handleChange}
          value={data.rating}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Cover Type"
          name="cover"
          onChange={handleChange}
          value={data.cover}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Published Year"
          name="publishedYear"
          onChange={handleChange}
          value={data.publishedYear}
          required
          className={styles.input}
        />
        <input
          type="file"
          name="thumbnail"
          onChange={handleFileChange}
          className={styles.input}
        />
        {error && <div className={styles.error_msg}>{error}</div>}
        <button type="submit" className={styles.green_btn}>
          Sell Book
        </button>
      </form>
    </div>
  );
};

export default SellBook;
