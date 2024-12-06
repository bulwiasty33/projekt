import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import './Wyszukiwanie.css';

function Wyszukiwanie(){
    
  
    const API_URL = 'http://www.omdbapi.com/?apikey=263d22d8&'
    const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page,setPage]=useState(1)
  const [totalElements, setTotalElements]= useState(0)

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}s=${title}&page=${page ?? 1}`);
    const data = await response.json();
  
    setMovies(data.Search);
    if (data.Search) {
        setMovies(data.Search);
        setTotalElements(data.totalResults)
    } else {
        setMovies([]);
    }
};


useEffect(() => {
    searchMovies(searchTerm);
}, [searchTerm,page]);

return <div>
        <h1 className="s">WYSZUKIWARKA</h1>
        <input 
            type='text' 
            placeholder="Nazwa filmu" 
            value={searchTerm} 
            onChange={(e) => {setSearchTerm(e.target.value);
                setPage(1);} }
        />
        
        <ol  className="text">
            {movies.map((movie, idx)=><div className="m" key={idx}> <img src={movie.Poster}></img><hr></hr>{movie.Title} <br></br> {movie.Year} </div>)}
        </ol>
        <hr></hr>
        <div className="button">
            <br></br>
        <button onClick={()=>setPage(prev=>prev-1)} disabled={page<=1}>-</button>
                {page}
            <button onClick={()=>setPage(prev=>prev+1)} 
            disabled={page>=totalElements/10}
            > +</button>
            </div>
    </div>
        
    
};

export default Wyszukiwanie