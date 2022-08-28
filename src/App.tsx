import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BiLoader } from "react-icons/bi";
import routes from "./routes";
import { BikesContextProvider } from "./contexts/useBikesContext";

function App() {
  return (
    <BikesContextProvider>
      <div className="bg-gray-900 min-h-screen min-w-screen p-0 m-0 flex justify-center items-center">
        <section className="w-10/12 h-[40rem] max-h-screen bg-gray-600 text-gray-100 rounded-md shadow-lg shadow-gray-500/50 overflow-y-scroll">
          <BrowserRouter>
            <Routes>
              {routes.map(({ key, Component, path }) => {
                return (
                  <Route
                    key={key}
                    element={
                      <React.Suspense
                        fallback={
                          <div className="flex flex-wrap justify-center content-center h-full">
                            <span className="flex justify-center">
                              <BiLoader
                                className="animate-spin"
                                color="#000"
                                size={32}
                              />
                            </span>
                          </div>
                        }
                      >
                        <Component />
                      </React.Suspense>
                    }
                    path={path}
                  />
                );
              })}
            </Routes>
          </BrowserRouter>
        </section>
      </div>
    </BikesContextProvider>
  );
}

export default App;
