const FullPageLoader = ({ message = "Loading, please wait..." }) => {
  return (
    <div
      className="loader_bgColor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: "18px",
        fontWeight: "bold",
      
      }}
    >
      <img src="assets/img/fav.png" alt="loader" srcSet="" width="50%" />
      <p className="mt-3">{message}</p>
    </div>
  );
};

export default FullPageLoader;
