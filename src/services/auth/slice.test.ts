import { AuthError } from "../../types/UserTypes";
import authReducer, { setLoading, setError, setUser, logout, setAuthChecked, setSuccess, initialState } from "./slice";

describe("auth reducer", () => {
  it("should return the initial state when passed an empty action", () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle setLoading", () => {
    expect(authReducer(initialState, setLoading(true))).toEqual({ ...initialState, loading: true });
  });

  it("should handle setError", () => {
    const error = "Test error";
    expect(authReducer(initialState, setError(error))).toEqual({ ...initialState, error });

    expect(authReducer({ ...initialState, error }, setError(null))).toEqual(initialState);
  });

  it("should handle setUser", () => {
    const userData = { id: 1, name: "John Doe", email: "john.doe@example.com" };
    const accessToken = "fake-token";
    const refreshToken = "fake-refresh";

    expect(authReducer(initialState, setUser({ user: userData, accessToken, refreshToken }))).toEqual({
      ...initialState,
      user: userData,
      accessToken,
      refreshToken,
      isAuthChecked: true,
    });
  });

  it("should handle logout and remove tokens from localStorage", () => {
    const loggedInState = {
      ...initialState,
      user: { id: 1, name: "John Doe", email: "john.doe@example.com" },
      accessToken: "fake-token",
      refreshToken: "fake-refresh",
      isAuthChecked: true,
    };

    const removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");

    expect(authReducer(loggedInState, logout())).toEqual({ ...initialState, isAuthChecked: true });

    expect(removeItemSpy).toHaveBeenCalledWith("accessToken");
    expect(removeItemSpy).toHaveBeenCalledWith("refreshToken");

    removeItemSpy.mockRestore();
  });

  it("should handle setAuthChecked", () => {
    expect(authReducer(initialState, setAuthChecked(true))).toEqual({ ...initialState, isAuthChecked: true });
  });

  it("should handle setSuccess", () => {
    expect(authReducer(initialState, setSuccess(true))).toEqual({ ...initialState, success: true });
  });
});