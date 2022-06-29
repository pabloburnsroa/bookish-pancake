import { SpinnerContainer, SpinnerOverlay } from './loading-spinner.styles';

const LoadingSpinner = () => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};

export default LoadingSpinner;
