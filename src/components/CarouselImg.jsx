import Carousel from 'react-bootstrap/Carousel'
const productImage = require.context('../assets/img', true)

function CarouselImg() {
  return (
    <Carousel
      indicators={false}
      pause={false}
      keyboard={false}
      className="carousel"
      fade
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={productImage('./informacion1.png')}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={productImage('./informacion2.png')}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={productImage('./informacion3.png')}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default CarouselImg
