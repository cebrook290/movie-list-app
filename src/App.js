import React, { useState, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddToFavorites';
import RemoveFavorites from './components/RemoveFavorites';


const App = () => {
	const [movies, setMovies] = useState([]);
	let [favorites, setFavorites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		let movieFavorites = JSON.parse(
			localStorage.getItem('react-movie-app-favorites')
		);

		setFavorites(movieFavorites);
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
	};

	const addFavoriteMovie = (movie) => {
		const newFavoriteList = [...favorites, movie];
		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList);
	};

	const removeFavoriteMovie = (movie) => {
		let newFavoriteList = favorites.filter(
			(favorite) => favorite.imdbID !== movie.imdbID
		);

		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavoritesClick={addFavoriteMovie}
					favoriteComponent={AddFavorites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favorites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favorites}
					handleFavoritesClick={removeFavoriteMovie}
					favoriteComponent={RemoveFavorites}
				/>
			</div>
		</div>
	);
};

export default App;