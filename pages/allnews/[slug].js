import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { singleNews, listRelated } from "../../actions/news";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import SmallCard from "../../components/news/SmallCard";

const SingleNews = ({ news, query }) => {
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated({ news }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const head = () => (
    <Head>
      <title>
        {news.title} | {APP_NAME}
      </title>
      <meta name="description" content={news.mdesc}></meta>
      <link rel="canonical" href={`${DOMAIN}/allnews/${query.slug}`} />
      <meta property="og:title" content={`${news.title} | ${APP_NAME}`} />
      <meta property="og:description" content={news.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/allnews/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/news/photo/${news.slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${API}/news/photo/${news.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const showNewsCategories = (news) =>
    news.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-1">{c.name}</a>
      </Link>
    ));

  const showNewsTags = (news) =>
    news.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-1">#{t.name}</a>
      </Link>
    ));

  const showRelatedNews = () => {
    return related.map((news, i) => (
      <div className="col-md-4" key={i}>
        <article>
          <SmallCard news={news} />
        </article>
      </div>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: "-30px" }}>
                  <img
                    src={`${API}/news/photo/${news.slug}`}
                    alt={news.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>

              <section>
                <div className="container">
                  <h1 className="display-5 pb-3 pt-3 text-center font-weight-bold">
                    {news.title}
                  </h1>
                  <p className="lead mt-3 mark">
                    {news.postedBy.name} | Опубликовано{" "}
                    {moment(news.updatedAt).fromNow()}
                  </p>

                  <div className="pb-3 text-center">
                    <div className="text-center">Категории</div>
                    {showNewsCategories(news)}
                    {/* {showNewsTags(news)} */}
                  </div>

                  <div className="pb-3 text-center">
                    <div className="text-center">Теги</div>
                    {/* {showNewsCategories(news)} */}
                    {showNewsTags(news)}
                    <hr />
                  </div>
                </div>
              </section>
            </div>

            <div className="container">
              <section>
                <div className="row">{renderHTML(news.body)}</div>
              </section>
            </div>

            <div className="container">
              <h4 className="text-center pt-5 pb-5 h2">Похожие новости</h4>
              <hr />
              <div className="row">{showRelatedNews()}</div>
            </div>

            <div className="container pb-5">{/* <p>Show comments</p> */}</div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleNews.getInitialProps = ({ query }) => {
  return singleNews(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      // console.log("GET INITIAL PROPS IN SINGLE NEWS", data);
      return { news: data, query };
    }
  });
};

export default SingleNews;
