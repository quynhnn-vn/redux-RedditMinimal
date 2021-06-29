import React from "react";
import { useDispatch } from "react-redux";
import "./Subreddits.css";
import { setSelectedSubreddit } from "./subredditsSlice";

export const Subreddit = ({ subreddit, selectedSubreddit }) => {
    const dispatch = useDispatch();
    const handleOnClick = () => {
        dispatch(setSelectedSubreddit(subreddit.url))
    }
    return (
        <li key={subreddit.id} className={`${selectedSubreddit === subreddit.url && `selected-subreddit`}`}>
            <button type="button" onClick={handleOnClick}>
                <img className="subreddit-icon" src={subreddit.icon_img || `https://api.adorable.io/avatars/25/${subreddit.display_name}`} alt="" style={{border: `3px solid ${subreddit.primary_color}`}} />
                {subreddit.display_name}
            </button>
        </li>
    )
}