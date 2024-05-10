import userReducer, {
  initialState,
  fetchUsers,
  addUser,
  deleteUser,
  editUser,
} from "./redux/slice/users";
import { cleanup } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
require("jest-fetch-mock").enableMocks();

afterEach(cleanup);
beforeEach(() => {
  fetchMock.resetMocks();
});

describe("tests for userSlice", () => {
  test("initializing slice with initial value", () => {
    const userSliceinit = userReducer(initialState, { type: "unknown" });
  });
});

test("fetchUserReducer", () => {
  const testData = {
    data: [
      {
        id: "1",
        name: "Taimoor",
        username: "MooR",
      },
    ],
  };

  const afterReducerOperation = userReducer(
    initialState,
    fetchUsers.fulfilled(testData)
  );
  expect(afterReducerOperation).toEqual({
    data: {
      data: [
        {
          id: "1",
          name: "Taimoor",
          username: "MooR",
        },
      ],
    },
    isError: false,
    isLoading: false,
  });
});

test("Add user in an empty list", () => {
  const previousState = [];
  const response = userReducer(
    previousState,
    addUser.fulfilled([{ id: "2", name: "Khan", username: "KK" }])
  );

  expect(response).toEqual({
    data: [{ id: "2", name: "Khan", username: "KK" }],
    isLoading: false,
  });
});

test("Add user in an existing list", () => {
  const previousState = [{ id: "2", name: "Khan", username: "KK" }];
  const response = userReducer(
    previousState,
    addUser.fulfilled([{ id: "3", name: "Ali", username: "Don" }])
  );

  expect(response).toEqual({
    0: { id: "2", name: "Khan", username: "KK" },
    data: [{ id: "3", name: "Ali", username: "Don" }],
    isLoading: false,
  });
});

test("Delete user from a list", () => {
  const initialState = {
    isLoading: false,
    data: [
      { id: "1", name: "John", username: "john_doe" },
      { id: "2", name: "Jane", username: "jane_doe" },
    ],
  };

  const action = {
    type: "deleteUser/fulfilled",
    payload: { id: "1" }, // Simulate successful deletion
    // ID of user to delete
  };

  console.log("action.payload is", action.payload);
  const newState = userReducer(initialState, action);

  console.log("New deleted state is:", newState);

  expect(newState).toEqual({
    isLoading: false,
    data: [{ id: "2", name: "Jane", username: "jane_doe" }],
  });
});

test("Edit a username", () => {
  const initialState = {
    isLoading: false,
    data: [{ id: "1", name: "John", username: "john_doe" }],
  };

  const action = {
    type: "editUser/fulfilled",
    payload: { id: "1", username: "Johnny Don" },
  };

  const newState = userReducer(initialState, action);

  expect(newState).toEqual({
    isLoading: false,
    data: [{ id: "1", name: "John", username: "Johnny Don" }],
  });
});
