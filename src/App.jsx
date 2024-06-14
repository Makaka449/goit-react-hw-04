import { useEffect, useState } from "react";
import { searchImagesApi } from "./api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster, toast} from "react-hot-toast";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () =>{
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState();

  useEffect(() => {
    const searchImages = async () => {
      try {
        setIsLoading(true);
        const data = await searchImagesApi(query, page);
        setImages((prev) => [...prev, ...data]);
        console.log("data", data);
      } catch (error) {
        setError(true);
        toast.error("Зображення не знайдено😮");
      } finally {
        setIsLoading(false);
      }
    };
    query && searchImages();
  }, [query, page]);

  const handleSubmit = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1)

  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleImageClick = (image) => {
    setModalImage(image)
  }

  const handleCloseModal = () =>{
    setModalImage(null)
  }

  return (
    <div>
    <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage message={error}/>}
      {isLoading && <Loader />}
      <ImageGallery images={images} onImageClick={handleImageClick}/>
      {images.length > 0 && (
       <LoadMoreBtn onClick={handleLoadMore}/> 
      )}
      {modalImage && <ImageModal image={modalImage} onClose={handleCloseModal} />}
     
    </div>
  );
}

export default App;
