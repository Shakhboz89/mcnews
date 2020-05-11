import Layout from "../components/Layout";
import Link from "next/link";

const Index = () => {
  return (
    <Layout>
      <h2>Index page</h2>
      {/* <Link href="/signup">
        <a>Signup</a>
      </Link> */}
    </Layout>
  );
};

// Index.getInitialProps = () => {
//   return listNewsWithCategoriesAndTags().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       return {};
//     }
//   });
// };

export default Index;
