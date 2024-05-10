import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser, deleteUser, editUser } from "./redux/slice/users";
import { useEffect, useState } from "react"; // Import useState
import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [theme, setTheme] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [editMode, setEditMode] = useState("");


  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  console.log("state ", state);

  const remUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  if (state.user.isLoading) {
    return <Typography variant="h1">Loading....</Typography>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        {" "}
        <div className="App" style={{ marginTop: "20px" }}>
          <Button
          variant="contained"
            style={{ position: "absolute", right: "30px" }}
            onClick={toggleTheme}
          >
            Theme
          </Button>
          <Typography
            variant="h3"
            component="h2"
            style={{ marginBottom: "30px" }}
          >
            Contact List Application
          </Typography>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              maxWidth="sm"
              style={{ border: "1px solid blue", padding: "20px" }}
            >
              <form>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <label>Enter Name :</label>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Enter Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <label>Enter Username :</label>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Enter Username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      dispatch(
                        addUser({
                          id:
                            state.user.data.length > 0
                              ? parseInt(state.user.data[state.user.data.length - 1].id) +
                                1
                              : 1,
                          name,
                          username,
                        })
                      );
                    }}
                  >
                    <AddIcon />
                  </Button>{" "}
                  {/* Call handleAddUser function on button click */}
                </Grid>
              </form>
            </Grid>
          </Box>
          <br></br>

          {state.user.data &&
            state.user.data.map((e) => (
              <Box
                key={e.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "40px auto",
                  width: "100%",
                  maxWidth: "60rem",
                  border: "1px solid black",
                  padding: "10px",
                  boxShadow: "5px 5px 1px",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={4}>
                      <Typography
                        style={{ fontSize: "15px" }}
                        variant="body1"
                        align="center"
                      >
                        <b>ID</b>: {e.id} | <b>Name:</b> {e.name} |{" "}
                        <b>Username:</b> {e.username}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="edit username"
                        onChange={(e) => setEditMode(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4} container justifyContent="flex-end">
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => remUser(e.id)}
                      >
                        <DeleteIcon />
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ marginLeft: "10px" }}
                        onClick={() =>
                          dispatch(editUser({ id: e.id, username: editMode }))
                        }
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ))}
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
