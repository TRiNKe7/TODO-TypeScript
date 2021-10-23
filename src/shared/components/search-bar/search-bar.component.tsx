import {FC} from "react";

export interface SearchProps {
	showSearchBox: boolean;

}

const Search: FC<SearchProps> = ({showSearchBox}) => {
	return <>{!showSearchBox && <button></button>}</>;
};

export default Search;