import WiktionaryIcon from "../assets/wiktionary.ico";
import "../styles/wiktionary-icon.css";

interface WiktionaryLinkProps {
  link: string;
}
export default function WiktionaryLink({ link }: WiktionaryLinkProps) {
  return (
    <>
      {/* <strong>
            <a href={props.link} target="_blank" rel="noopener noreferrer">
              Wiktionary
            </a>
          </strong>
          <img
            src={require("../images/wiktionary.ico")}
            alt="icon"
            className="wiktionary-icon"
          /> */}
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src={WiktionaryIcon}
          alt="wiktionary-icon"
          className="wiktionary-icon"
        />
      </a>
    </>
  );
}
