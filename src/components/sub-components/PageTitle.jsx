const PageTitle = ({ pageTitle }) => {
  return (
    <div
      className="bg-black text-white text-center font-semibold cursive--font position-relative d-flex align-items-end justify-content-center"
      style={{ minHeight: "150px" }}
    >
      <span className="mb-4 md:text-5xl text-3xl">{pageTitle}</span>
    </div>
  );
};

export default PageTitle;
