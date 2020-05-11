import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { singleTag } from "../../actions/tag";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import Card from "../../components/news/Card";

const Tag = ({ tag, allnews, query }) => {
  const head = () => (
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`Свежие новости из мира авто в категории ${tag.name}`}
      ></meta>
      <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`} />
      <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Свежие новости из мира авто в категории ${tag.name}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`} />
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

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">#{tag.name}</h1>
              </div>
              <article>
                <div className="container">
                  <div className="row">
                    {allnews.map((n, i) => (
                      <div className="col-md-4">
                        <Card key={i} news={n} />
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </header>
          </div>
        </main>

        {/* <main>
          <div className="container text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{category.name}</h1>
              </div>
              <article>
                <div className="container">
                  <div className="row">
                    {allnews.map((n, i) => (
                      <div className="col-md-4">
                        <Card key={i} news={n} />
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </header>
          </div>
        </main> */}
      </Layout>
    </React.Fragment>
  );
};

Tag.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { tag: data.tag, allnews: data.allnews, query };
    }
  });
};

export default Tag;
