import React from "react";

const Loader = () => {
  return (
    <div style={{ width: "100wh", height: "100vh", display: 'flex', justifyContent:'center', alignItems:'center' }}>
      <div class="ripple-loader">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
