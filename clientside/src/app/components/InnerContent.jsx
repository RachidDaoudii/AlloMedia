import { Outlet } from "react-router-dom";
import Header from "./Header";
export default function InnerContent() {
  return (
    <div>
      <Header />
      <main style={{ margintop: 58 }}>
        <div class="container pt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
