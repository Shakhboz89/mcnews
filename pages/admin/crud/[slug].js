import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import NewsUpdate from "../../../components/crud/NewsUpdate";
import Link from "next/link";

const News = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Обновление статьи</h2>
            </div>
            <div className="col-md-12">
              <NewsUpdate />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default News;
