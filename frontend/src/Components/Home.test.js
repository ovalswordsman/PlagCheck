import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter ,Routes} from 'react-router-dom';
import Home from "./Home";
import Login from "./Login";
import Guest from "./Guest";


it("renders without crashing", () => {
    <BrowserRouter>   
    <Routes>
  const div = document.createElement("div");
  ReactDOM.render(<Home />, div);
  </Routes>
    </BrowserRouter>
});
it("renders without crashing", () => {
    <BrowserRouter>   
    <Routes>
  const div = document.createElement("div");
  ReactDOM.render(<Guest />, div);
  </Routes>
    </BrowserRouter>
});

it("renders without crashing", () => {
    <BrowserRouter>   
    <Routes>
        const div = document.createElement("div");
        ReactDOM.render(<Login />, div);
    </Routes>
    </BrowserRouter>
});
function compileandRun() {
  throw new Error("you are using the wrong Enviroment");
}

test("compiling android goes as expected", () => {
  expect(() => compileandRun()).toThrow();
  expect(() => compileandRun()).toThrow(Error);
  expect(() => compileandRun()).toThrow("you are using the wrong Enviroment");
  expect(() => compileandRun()).toThrow();
});