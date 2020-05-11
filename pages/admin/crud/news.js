import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import NewsCreate from "../../../components/crud/NewsCreate";
import Link from "next/link";

const News = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Создание статьи</h2>
            </div>
            <div className="col-md-12">
              <NewsCreate />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default News;
