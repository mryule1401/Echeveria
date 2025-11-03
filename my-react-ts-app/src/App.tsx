import { router } from "./route/routes";
import { RouterProvider} from "react-router-dom";
import styles from "./App.module.css"
const App = () => {
  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App
