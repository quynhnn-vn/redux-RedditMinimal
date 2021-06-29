import "./App.css";
import { FaReddit } from "react-icons/fa";
import { Search } from "../features/search/Search";
import { Posts } from "../features/posts/Posts";
import { Subreddits } from "../features/subreddits/Subreddits";

const App = () => {
  return (
    <>
      <header>
        <div className="logo">
          <FaReddit className="logo-icon" />
          <p>
            Reddit<span>Minimal</span>
          </p>
        </div>
        <Search />
      </header>
      <main>
        <Posts />
      </main>
      <aside>
        <Subreddits />
      </aside>
    </>
  );
}

export default App;
