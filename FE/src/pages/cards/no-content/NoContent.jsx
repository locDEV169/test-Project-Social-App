import "./style.css";
import { ReactComponent as EmptyIcon } from "../../../image/image-empty.svg";

function NoContent(props) {
    return (
        <div className="no-content">
            <diV className="item-content">
                <EmptyIcon />
                <div className="no-result">No Results Found</div>
                <div className="content-fail">No content matched your criteria. Try searching for something else.</div>
            </diV>
        </div>
    );
}

export default NoContent;
