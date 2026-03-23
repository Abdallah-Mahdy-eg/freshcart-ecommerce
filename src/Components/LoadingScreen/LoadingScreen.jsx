const LoadingScreen = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-center flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>

      {/* <div className="h-screen flex justify-center items-center">
            <i className="fa-solid fa-spinner fa-spin fa-7x"></i>
        </div> */}

     
    </>
  );
};

export default LoadingScreen;
