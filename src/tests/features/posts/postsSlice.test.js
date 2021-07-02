import postsReducer, {
  selectFilteredPosts,
  selectPosts,
  selectIsLoading,
  selectHasError,
  fetchPosts,
  fetchComments,
  loadPosts,
} from "../../../features/posts/postsSlice";

const initialState = {
  posts: [],
  isLoading: false,
  hasError: false,
};

const posts = [
  {
    title: "title1",
    url: "http://example.com",
    author: "author1",
    ups: 1,
    created_utc: 1,
    num_comments: 1,
  },
  {
    title: "title2",
    url: "http://example.com",
    author: "author2",
    ups: 2,
    created_utc: 2,
    num_comments: 2,
  },
];

const previousState = {
  posts: posts,
  isLoading: false,
  hasError: false,
};

const fullState = {
  posts: previousState,
  search: {
    searchTerm: "",
  },
};

describe("postsReducer", () => {
  it("should have the initial state", () => {
    expect(postsReducer(undefined, {})).toEqual(initialState);
  });
});

describe("selectPosts", () => {
  it("should return posts from state", () => {
    expect(selectPosts(fullState)).toEqual(fullState.posts.posts);
  });
});

describe("selectFilteredPosts", () => {
  it("should return filtered posts by a search term from state", () => {
    fullState.search.searchTerm = "title1";
    expect(selectFilteredPosts(fullState)).toContain(fullState.posts.posts[0]);
  });
  it("should return empty array if search term doesn't match any posts", () => {
    fullState.search.searchTerm = "title3";
    expect(selectFilteredPosts(fullState)).toEqual([]);
  });
});

describe("selectIsLoading & hasError", () => {
  it("should select isLoading from state", () => {
    expect(selectIsLoading(fullState)).toEqual(false);
  });
  it("should select hasError from state", () => {
    expect(selectHasError(fullState)).toEqual(false);
  });
});
