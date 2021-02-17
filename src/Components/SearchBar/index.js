import axios from "axios";
import React, { useEffect, useState } from "react";
import { useVideosDispatch } from "../../context";
import { getVideosAction, setSearchedTermAction } from "../../context/actions";
import "./style.css";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const videosDispatch = useVideosDispatch();

  useEffect(() => {
    let searchWiki = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setSuggestions(data.query.search.map((result) => result.title));
    };
    if (!term) {
      setSuggestions([]);
    }
    if (term && !suggestions.length) {
      searchWiki();
    } else {
      const timeoutId = setTimeout(() => {
        if (term) searchWiki();
      }, 500);

      return function () {
        clearTimeout(timeoutId);
      };
    }
  }, [term]);

  const onInputChange = (event) => {
    setTerm(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    setSearchedTermAction(videosDispatch)(term);
    getVideosAction(videosDispatch)(term);
    setSuggestions([]);
    setTerm("");
  };
  const searchFromSuggetion = (selectedSuggention) => {
    setSuggestions([]);
    setTerm("");
    setSearchedTermAction(videosDispatch)(selectedSuggention);
    getVideosAction(videosDispatch)(selectedSuggention);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={onFormSubmit} className="search-video-form">
        <input
          id="search_term_for_videos"
          className="search-input"
          type="text"
          value={term}
          onChange={onInputChange}
          placeholder="&#128269; search video"
          autoComplete="off"
        />
      </form>
      <div
        className="suggestions"
        data-suggetions_active={!!suggestions.length}
      >
        {suggestions.length
          ? suggestions.map((suggetion) => (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  searchFromSuggetion(suggetion);
                }}
              >
                {suggetion}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default SearchBar;
