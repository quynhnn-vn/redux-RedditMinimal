import searchReducer, {
  selectSearchTerm,
  setSearchTerm,
} from "../../../features/search/searchSlice";

const initialState = {
  searchTerm: ""
};
const previousState = {
  searchTerm: "popular",
};
const fullState = {
  search: previousState,
}

describe("searchReducer", () => {
  it("should have the initial state", () => {
    expect(searchReducer(undefined, {})).toEqual(initialState);
  });
  it("should set a new search term", () => {
    expect(searchReducer(initialState, setSearchTerm("popular"))).toEqual(previousState);
  });
  it("should replace a new search term", () => {
    expect(searchReducer(previousState, setSearchTerm("pic"))).toEqual({
      searchTerm: "pic",
    });
  });
});

describe("selectSearchTerm", () => {
  it("should select search term from state", () => {
    expect(selectSearchTerm(fullState)).toEqual("popular");
  });
});
