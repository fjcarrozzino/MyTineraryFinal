import Carousel from "react-grid-carousel";
import { Link } from "react-router-dom";
import "../styles/Carousel.css";
import { useSelector } from "react-redux"


const CarouselItem = () => {


  const cities = useSelector(store => store.citiesReducer.cities)
  
  return (
    <>
      <h2 className="titulo-carousel"> Popular MYtineraries</h2>
      <Carousel
        className="images-breakpoint"
        cols={2}
        rows={2}
        gap={16}
        autoplay={2500}
        loop
        mobileBreakpoint={300}
        responsiveLayout={[
          {
            breakpoint: 800,
            cols: 2,
            rows: 2,
            gap: 10,
            loop: true,
            autoplay: 3000,
          },
        ]}
      >
        {cities.map((item) => (
          <Carousel.Item key={item._id}>
            <Link className="link-carousel" to="/cities">
              <img className="img-carousel" src={item.image} alt={item.name} />
              <h3 className="nombre-carousel">{item.name}</h3>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default CarouselItem