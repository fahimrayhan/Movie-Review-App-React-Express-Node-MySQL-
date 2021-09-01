import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./App.css"
export default function App() {

    const [movieName,setMovieName] = useState('');
    const [review,setReview] = useState('');
    const [moviewReviewList,setMoviewReviewList] = useState([]);
    const [newReview,setNewReview] = useState("")
    
    const submitReview = () =>{
        axios.post("http://localhost:5050/api/insert",
        {movieName:movieName, review:review}).then((response) =>{
            alert("Inserted to the database successfully");
        })
    }

    const deleteReview = (id) =>{
        axios.delete(`http://localhost:5050/api/delete/${id}`)
    }

    const updateReview = (name) =>{
        axios.put("http://localhost:5050/api/update",
        {
            movieName:name,
            review: newReview
        })
        setNewReview("");
    }

    useEffect(() => {
        
        axios.get("http://localhost:5050/api/reviews").then((response) =>{
            setMoviewReviewList(response.data)
        })
        
    }, [])

    return (
        <div>
            <h1 className="title">Movie Reviews</h1>
            <form>
                <div className="form">
                    <label htmlFor="movie-name">Movie Name: </label>
                    <input type="text" name="movie-name" placeholder="SPY" required onChange={(e)=>{
                        setMovieName(e.target.value);
                    }}/>
                    
                    <label htmlFor="review">Review: </label>
                    <textarea name="review" placeholder="Nice!" 
                        onChange={(e)=>{
                            setReview(e.target.value);
                        }}
                    />
                    
                    <input type="submit" value="Submit" onClick={submitReview}/>
                </div>
            </form>

            <div className="CardList">
                {
                    moviewReviewList.map((val,key) => {
                        return(
                            <div className="card" key={key}> 
                                <div className="list-group">
                                    <h1>Movie Name: {val.movie_name}</h1>
                                    <p>Movie Review: {val.movie_review}</p>
                                    <div className="Buttons"> 
                                        <button id="button"  onClick={()=>{
                                            deleteReview(val.id)
                                        }}>Delete</button>
                                        <input type="text" name="update" required onChange={(e)=>{
                                                setNewReview(e.target.value);
                                        }}/>
                                        <button id="button" onClick={()=>{
                                            updateReview(val.movie_name);
                                        }} >Update</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
