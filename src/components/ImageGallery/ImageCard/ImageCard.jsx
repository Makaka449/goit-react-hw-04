import css from './ImageCard.module.css'

const ImageCard = ({ image, onClick }) => {
  return (
      <div>
        <img
          onClick={() => onClick(image)}
          src={image.urls.small}
          alt={image.alt_description}
          width={400}
          height= {300}
          className={css.cardsImage}
        />
      </div>
  );
};

export default ImageCard;
