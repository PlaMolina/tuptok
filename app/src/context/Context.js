import React from "react";

const valoresPorDefecto = {
    name: "",
    setName: () => {},
    rating: "",
    setRating: () => {},
    token: "",
    setToken: () => {}
};

const Context = React.createContext(valoresPorDefecto);
export default Context;