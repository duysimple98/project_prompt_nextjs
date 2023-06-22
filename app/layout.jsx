import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
        <ToastContainer autoClose={3000} pauseOnHover={false} />
      </Provider>
    </body>
  </html>
);

export default RootLayout;
