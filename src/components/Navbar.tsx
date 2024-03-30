import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <div id="navbar">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          to="/search_translations"
        >
          Search All Translations of a Word
        </NavLink>
        <NavLink to="/search_genders">Search all Genders of a Word</NavLink>
        <NavLink to="/search_etymologies">
          Search by content of Etymology
        </NavLink>
        <NavLink to="/grouped_etymologies">
          Search Etymology Grouped (Beta)
        </NavLink>
        {/* <NavLink
          activeClassName="selected"
          to="/all_translations_by_macrofamily"
        >
          Search all Translations by Macrofamily
        </NavLink> */}
        <NavLink to="/all_translations_by_language">
          Search all Translations by Language
        </NavLink>
        <NavLink to="/search_languages_by_area">
          Search Languages by Area
        </NavLink>
        <NavLink to="/search_translations_by_area">
          Search Translations by Area
        </NavLink>
        {/* <NavLink activeClassName="selected" to="/new_word">
          Create a New Word
        </NavLink> */}
        <NavLink to="/all_words">View all Words</NavLink>
        {/* <NavLink activeClassName="selected" to="/new_language">
          Create a new Language
        </NavLink> */}
        <NavLink to="/all_languages">View all Languages</NavLink>
        <NavLink to="/create_translation_map">
          Create Translation Map by Area
        </NavLink>
        <NavLink to="/create_gender_map">Create Gender Map by Area</NavLink>
        <NavLink to="/create_etymology_map">
          Create Etymology Map by Area (Beta)
        </NavLink>
        <NavLink to="/edit_translation_form">Edit Translation</NavLink>
        <NavLink to="/login_form">LogIn</NavLink>
      </nav>
    </div>
  );
}
