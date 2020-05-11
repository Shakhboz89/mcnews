import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState } from "react";
import { listNewsWithCategoriesAndTags } from "../../actions/news";
import Card from "../../components/news/Card";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

const AllNews = ({
  allnews,
  categories,
  tags,
  totalAllNews,
  allnewsLimit,
  newsSkip,
  router,
}) => {
  const head = () => (
    <Head>
      <title>Автомобильные новости | {APP_NAME}</title>
      <meta
        name="description"
        content="Автомобильные новости со всего мира"
      ></meta>
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta property="og:title" content={`Свежие авто новости | ${APP_NAME}`} />
      <meta
        property="og:description"
        content="Автомобильные новости со всего мира"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/project.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/project.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const [limit, setLimit] = useState(allnewsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalAllNews);
  const [loadedAllNews, setLoadedAllNews] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listNewsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedAllNews([...loadedAllNews, ...data.allnews]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
          Загрузить еще
        </button>
      )
    );
  };

  const showAllNews = () => {
    return allnews.map((news, i) => {
      return (
        <div className="col-md-4" key={i}>
          <article>
            <Card news={news} />
            <hr />
          </article>
        </div>
      );
    });
  };

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  };

  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href={`/tags/${t.slug}`} key={i}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">#{t.name}</a>
      </Link>
    ));
  };

  const showLoadedAllNews = () => {
    return loadedAllNews.map((news, i) => (
      <article key={i}>
        <Card news={news}></Card>
      </article>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <header>
                <div className="col-md-12 pt-3">
                  <h1 className="display-4 font-weight-bold text-center">
                    Новости из мира авто
                  </h1>
                </div>
                <section>
                  <div className="pb-5 text-center">
                    {showAllCategories()}
                    <br />
                    {showAllTags()}
                  </div>
                </section>
              </header>
            </div>
            <div className="container">
              <div className="row">{showAllNews()}</div>
            </div>
            {/* <div className="container">{showLoadedAllNews()}</div>
            <div className="text-center pt-5 pb-5">{loadMoreButton()}</div> */}
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

AllNews.getInitialProps = () => {
  let skip = 0;
  let limit = 6;

  return listNewsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        allnews: data.allnews,
        categories: data.categories,
        tags: data.tags,
        totalAllNews: data.size,
        allnewsLimit: limit,
        newsSkip: skip,
      };
    }
  });
};

export default withRouter(AllNews);
