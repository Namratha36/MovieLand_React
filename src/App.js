import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

//3a15394
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'https://www.omdbapi.com/?apikey=3a15394';

// const movie1 = {
//   "Title": "The Amazing Spider-Man 2",
//   "Year": "2014",
//   "imdbID": "tt1872181",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BOTA5NDYxNTg0OV5BMl5BanBnXkFtZTgwODE5NzU1MTE@._V1_SX300.jpg"
// }


const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      console.log('API Response:', data);
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
        console.log('No movies found for:', title);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    }
  }

  useEffect(() => {
    searchMovies('spider-man');
  }, []);
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input placeholder="Search for movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;