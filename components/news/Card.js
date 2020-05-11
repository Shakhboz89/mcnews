import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const Card = ({ news }) => {
  const showNewsCategories = (news) =>
    news.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));

  const showNewsTags = (news) =>
    news.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  return (
    // <div className="lead pb-4">
    //   <header>
    //     <Link href={`/allnews/${news.slug}`}>
    //       <a>
    //         <h2 className="pt-3 pb-3 font-weight-bold">{news.title}</h2>
    //       </a>
    //     </Link>
    //   </header>
    //   <section>
    //     <p className="mark ml-1 pt-2 pb-2">
    //       Written by {news.postedBy.name} | Published{" "}
    //       {moment(news.updatedAt).fromNow()}
    //     </p>
    //   </section>
    //   <section>
    //     {showNewsCategories(news)}
    //     {showNewsTags(news)}
    //     <br />
    //     <br />
    //   </section>
    //   <Link href={`/allnews/${news.slug}`}>
    //     <a>
    //       <div className="row">
    //         <div className="col-md-4">
    //           <section>
    //             <img
    //               className="img img-fluid"
    //               style={{ maxHeight: "auto", width: "100%" }}
    //               src={`${API}/news/photo/${news.slug}`}
    //               alt={news.title}
    //             ></img>
    //           </section>
    //         </div>
    //         <div className="col-md-8">
    //           <section>
    //             <div className="pb-3">{renderHTML(news.excerpt)}</div>

    //             {/* <a className="btn btn-primary pt-2">Подробнее</a> */}
    //           </section>
    //         </div>
    //       </div>
    //     </a>
    //   </Link>
    // </div>
    <div className="card-deck">
      <Link href={`/allnews/${news.slug}`}>
        <a>
          <div className="card">
            <section>
              {/* <Link href={`/allnews/${news.slug}`}>
            <a> */}
              <img
                className="card-img-top"
                style={{ height: "250px" }}
                src={`${API}/news/photo/${news.slug}`}
                alt={news.title}
              ></img>
              {/* </a>
          </Link> */}
            </section>

            <div className="card-body">
              <section>
                {/* <Link href={`/allnews/${news.slug}`}>
              <a>
                {" "} */}
                <h5 className="card-title">{news.title}</h5>
                {/* </a>
            </Link> */}
                <p className="card-text">{renderHTML(news.excerpt)}</p>
              </section>
            </div>

            <div className="card-footer">
              <small className="text-muted">
                Posted {moment(news.updatedAt).fromNow()} by{" "}
                {news.postedBy.name}
              </small>
            </div>
          </div>
        </a>
      </Link>
    </div>

    // <div className="card-deck">
    //   <div className="card">
    //     <img
    //       className="card-img-top"
    //       style={{ maxHeight: "auto", width: "100%" }}
    //       src={`${API}/news/photo/${news.slug}`}
    //       alt={news.title}
    //     />
    //     <div className="card-body">
    //       <h5 className="card-title">{news.title}</h5>
    //       <p className="card-text">{renderHTML(news.excerpt)}</p>
    //     </div>
    //     <div className="card-footer">
    //       <small className="text-muted">
    //         Written by {news.postedBy.name} | Published{" "}
    //         {moment(news.updatedAt).fromNow()}
    //       </small>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Card;
