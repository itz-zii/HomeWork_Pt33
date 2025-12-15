import { useEffect, useState } from "react";
import { instance } from "./utils/axios.js";

export default function FetchApi() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await instance.get(`/posts`);
        setPosts(response.data.posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  const handleDetail = async (id) => {
    setShowModal(true);
    const response = await instance.get(`/posts/${id}`);
    setPost(response.data);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPost(null);
  };

  const handleSearchChange = (event) => {
    setSearchBar(event.target.value);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchBar.toLowerCase()) ||
      post.body.toLowerCase().includes(searchBar.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold items-center text-center">Blogs</h1>
      <form action="searchBar " className="mt-4 flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-400 rounded-md p-2 outline-none w-full"
          value={searchBar}
          onChange={handleSearchChange}
        />
      </form>
      <button className=" border border-gray-400 rounded-md px-4 py-2 mt-4 hover:bg-green-700 hover:text-white transition-colors cursor-pointer">
        Thêm mới
      </button>
      <div>
        <button className="mr-2 border border-gray-400 rounded-md px-4 py-2 mt-4 hover:bg-yellow-400 transition-colors cursor-pointer">
          Mới nhất
        </button>
        <button className=" border border-gray-400 rounded-md px-4 py-2 mt-4 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer">
          Cũ nhất
        </button>
      </div>
      {loading ? (
        <p className="text-2xl text-center mt-14 font-bold flex flex-col justify-center items-center">
          Loading...
          <img className="w-25 h-25" src="../kOnzy.gif" alt="" />
        </p>
      ) : error ? (
        <p className="text-red-500 mt-14 text-center font-bold text-2xl">
          Error: {error}
        </p>
      ) : (
        <div>
          {!filteredPosts.length ? (
            <p className="text-center">Không có kết quả tìm kiếm nào.</p>
          ) : (
            <>
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="mt-4 border p-4 rounded border-gray-400"
                >
                  <h2 className="text-xl pb-2 font-semibold border-b border-gray-400">
                    {post.title}
                  </h2>
                  <p className="mt-2">{post.body}</p>
                  <div className="w-full flex justify-between items-center">
                    <button
                      onClick={() => handleDetail(post.id)}
                      className="border mt-5 p-1 rounded border-gray-400 hover:bg-green-700 hover:text-white transition-colors cursor-pointer"
                    >
                      Xem Thêm
                    </button>
                    <span>
                      <button className="text-green-700 mx-2 cursor-pointer">
                        Sửa
                      </button>
                      <button className="text-red-700 mx-2 cursor-pointer">
                        Xoá
                      </button>
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
          {showModal && (
            <>
              <div className="fixed top-[5%] left-0 right-0 max-w-[70%] inline bg-white border m-auto rounded z-100 border-gray-400 p-15">
                {!post ? (
                  <h3>loading...</h3>
                ) : (
                  <>
                    <h3 className="font-bold text-2xl border-b pb-5 mb-5 border-gray-400">
                      {post?.title}
                    </h3>
                    <h3>{post?.body}</h3>
                  </>
                )}
              </div>
              <div
                className="fixed inset-0 bg-[#0000006a]"
                onClick={handleCloseModal}
              ></div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
