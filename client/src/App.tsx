import React from "react";
import logo from "./logo.svg";
import "./App.css";
//import {} from "@react-ro"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PhotoGrid from "./pages/photo_grid/PhotoGrid";
import PhotoSelection from "./pages/photo_selection/PhotoSelection";
import { NavigationPaths } from "./constants/AppConatants";
import Layout from "./templates/Layout";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { orange, grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[400],
    },
    secondary: {
      main: grey[400],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Switch>
            <Layout>
              <Route
                exact
                path={NavigationPaths.PhotoGrid}
                component={PhotoGrid}
              />
              <Route
                exact
                path={NavigationPaths.PhotoSeletion}
                component={PhotoSelection}
              />
            </Layout>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
