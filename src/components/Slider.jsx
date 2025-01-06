import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { slides } from "../services/data";

const Slider = () => {
  // Configuración de Swiper
  const swiperConfig = {
    modules: [Navigation, Pagination, Autoplay, A11y],
    navigation: true,
    pagination: { clickable: true },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1,
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 1 },
    },
  };

  return (
    <section className="relative">
      <div className="bg-bg-slider absolute w-full h-full z-[-1] opacity-40"></div>
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        <Swiper {...swiperConfig} className="rounded-xl shadow-xl overflow-hidden">
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-64 md:h-80 lg:h-[30rem]">
                {/* Imagen del slide */}
                <img
                  src={slide.imageUrl}
                  alt={slide.title || `Slide ${slide.id}`}
                  className="w-full h-full object-cover object-center"
                />
                {/* Gradiente de superposición */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-80"></div>
                {/* Contenido superpuesto */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold">{slide.title}</h3>
                  <p className="text-sm md:text-base">{slide.description}</p>
                  {slide.link && (
                    <a
                      href={slide.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-all"
                    >
                      Learn More
                    </a>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Slider;
