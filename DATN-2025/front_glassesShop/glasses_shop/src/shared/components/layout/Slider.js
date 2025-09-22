import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Slider = () => {
  return (
    <section id="hero">
      <Swiper
        className="slideshow"
        pagination={{ clickable: true }}
        modules={[Pagination]}
        loop={true}
      >
        <SwiperSlide
          style={{
            backgroundImage: "url(/images/banner1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh", // Chiều cao toàn màn hình
            position: "relative",
          }}
        >
          <div className="slide-content">
            <h2 className="text-white display-3 fw-bold">Frame Your Style</h2>
            <p className="text-white fs-5">
              Elevate Your Looks with Spectacular Shades
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide
          style={{
            backgroundImage: "url(/images/banner2.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            position: "relative",
          }}
        >
          <div className="slide-content">
            <h2 className="text-white display-3 fw-bold">See the Difference</h2>
            <p className="text-white fs-5">
              Premium Eyewear for Every Occasion
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide
          style={{
            backgroundImage: "url(/images/banner3.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            position: "relative",
          }}
        >
          <div className="slide-content">
            <h2 className="text-white display-3 fw-bold">Vision with Style</h2>
            <p className="text-white fs-5">
              Find Your Perfect Pair Today
            </p>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* CSS inline hoặc file riêng */}
      <style jsx="true">{`
        .slide-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }
      `}</style>
    </section>
  );
};

export default Slider;
