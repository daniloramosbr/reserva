
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ContextProvider } from "./context/Context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
      <App />
    </GoogleOAuthProvider>
  </ContextProvider>
);
