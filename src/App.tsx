import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import ToDoList from "./components/ToDoList";

const GlobalStyle = createGlobalStyle`
  ${reset};
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ToDoList></ToDoList>
    </>
  );
};

export default App;
