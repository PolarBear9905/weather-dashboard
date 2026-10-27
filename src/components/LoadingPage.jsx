import './LoadingPage.css';

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-spinner"></div>
      <p>Fetching weather data...</p>
    </div>
  );
};

export default LoadingPage;
