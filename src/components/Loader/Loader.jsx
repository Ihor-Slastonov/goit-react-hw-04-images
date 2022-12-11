import ClipLoader from 'react-spinners/ClipLoader';
const override = {
  display: 'block',
  margin: '50px auto',
};

export const Loader = () => {
  return (
    <>
      <ClipLoader
        color={'#006cfc'}
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
};
