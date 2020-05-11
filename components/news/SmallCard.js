import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const SmallCard = ({ news }) => {
  return (
    <div className="card">
      <section>
        <Link href={`/allnews/${news.slug}`}>
          <a>
            <img
              className="img img-fluid"
              style={{ maxHeight: "250px", width: "100%" }}
              src={`${API}/news/photo/${news.slug}`}
              alt={news.title}
            ></img>
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/allnews/${news.slug}`}>
            <a>
              {" "}
              <h5 className="card-title">{news.title}</h5>
            </a>
          </Link>
          <p className="card-text">{renderHTML(news.excerpt)}</p>
        </section>
      </div>

      <div className="card-body">
        Posted {moment(news.updatedAt).fromNow()} by {news.postedBy.name}
      </div>
    </div>
  );
};

export default SmallCard;
