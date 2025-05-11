import { useFetch } from "../../hooks/useFetch";
import "./UseFetchDemo.css";

const DEMO_URL = "https://jsonplaceholder.typicode.com/posts";

const UseFetchDemo = () => {
  const { data, refetch, isLoading, error } = useFetch(DEMO_URL);
  return (
    <div className="UseFetchDemo_container">
      <h2 className="container_title">UseFetchDemo</h2>
      <button
        onClick={() =>
          refetch({
            params: {
              _limit: 3,
            },
          })
        }
        className="container_btn"
      >
        Перезапросить
      </button>

      {isLoading && "Загрузка..."}
      {error && "Произошла ошибка"}

      {data && !isLoading && (
        <div className="container_content">
          {data.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UseFetchDemo;
