import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeNews } from "../../actions/news";
import moment from "moment";

const NewsRead = () => {
  const [allnews, setAllNews] = useState([]);
  const [message, setMessage] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    loadAllNews();
  }, []);

  const loadAllNews = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAllNews(data);
      }
    });
  };

  const deleteNews = (slug) => {
    removeNews(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadAllNews();
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Вы уверены что хотите удалить статью?");
    if (answer) {
      deleteNews(slug);
    }
  };

  const showUpdateButton = (news) => {
    if (isAuth() && isAuth.role === 0) {
      return (
        <Link href={`/user/crud/${news.slug}`}>
          <a className="btn btn-sm btn-warning">Обновить</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${news.slug}`}>
          <a className="btn btn-sm btn-warning ml-2">Обновить</a>
        </Link>
      );
    }
  };

  const showAllOfNews = () => {
    return allnews.map((news, i) => {
      return (
        <div key={i} className="pb-5">
          <h3>{news.title}</h3>
          <p className="mark">
            Автор статьи {news.postedBy.name} | Опубликована{" "}
            {moment(news.updatedAt).fromNow()}
          </p>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteConfirm(news.slug)}
          >
            Удалить
          </button>
          {showUpdateButton(news)}
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          {message && <div className="alert alert-warning">{message}</div>}
          {showAllOfNews()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewsRead;
