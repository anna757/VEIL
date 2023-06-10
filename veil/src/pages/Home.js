import PageLayout from '../components/PageLayout';
import image2 from '../images/background2.jpg';
import "../styles/Home.css";

const Home = () => {
  return (
    <PageLayout>
        <img src={image2} alt="Background 2" className="background-image" />
        <div className="background-text">
          <h1>Welcome to VEIL</h1>
          <h4>
            We are a unique online store offering a variety of fashion items directly from Turkey.
            Our mission is to provide high-quality products at affordable prices.
            Explore our product range, and let us know if you have any questions or feedback.
          </h4>
        </div>
    </PageLayout>
  );
};

export default Home;