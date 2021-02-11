import axios from "axios";
import React, { useEffect, useState } from "react";
import { useVideosDispatch } from "../../context";
import { getVideosAction } from "../../context/actions";
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
    getVideosAction(videosDispatch)(term);
  };

  return (
    <div className="search-bar-conteiner">
      <form onSubmit={onFormSubmit} className="ui form">
        <div className="search-field">
          <input
            className="search-input"
            type="text"
            value={term}
            onChange={onInputChange}
            placeholder="search video"
          />
        </div>
      </form>
      <div className="suggestions">
        {suggestions.map((suggetion) => (
          <div>{suggetion}</div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
