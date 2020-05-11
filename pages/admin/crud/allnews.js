import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import NewsRead from "../../../components/crud/NewsRead";
import Link from "next/link";

const News = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Управление новостью</h2>
            </div>
            <div className="col-md-12">
              <NewsRead />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default News;
