import notFoundImage from "../assets/man.webp";
import PropTypes from "prop-types";

Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  gender: PropTypes.string,
  opening_crawl: PropTypes.string,
};

export default function Card({ name, image, gender, opening_crawl }) {
  return (
    <div className="relative bg-black shadow-lg hover:shadow-2xl rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300">
      {/* Imagen con bordes redondeados */}
      <div className="relative">
        <img
          src={image || notFoundImage}
          alt="Imagen representativa"
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {/* Efecto degradado sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Contenedor de información */}
      <div className="p-4 space-y-3">
        {/* Título */}
        <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
          {name}
        </h3>
        {/* Género */}
        <p className="text-sm text-gray-400">
          {gender === "n/a" ? "Robot" : gender}
        </p>
        {/* Texto de apertura */}
        <p className="text-sm text-gray-300 line-clamp-3">
          {opening_crawl || "No description available."}
        </p>
      </div>

      {/* Línea decorativa en la parte inferior */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 to-yellow-600" />
    </div>
  );
}
