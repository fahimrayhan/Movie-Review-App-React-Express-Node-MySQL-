import React from 'react'
import "./App.css"
export default function App() {
    return (
        <div>
            <h1 className="title">Movie Reviews</h1>
            <form>
                <div className="form">
                    <label htmlFor="movie-name">Movie Name: </label>
                    <input type="text" name="movie-name" placeholder="SPY" required/>
                    
                    <label htmlFor="review">Review: </label>
                    <textarea name="review" placeholder="Nice!" />
                    
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    )
}
