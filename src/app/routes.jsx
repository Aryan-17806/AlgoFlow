import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import SearchingPage from "../pages/Searching/SearchingPage";
import SortingPage from "../pages/Sorting/SortingPage";
import LinkedListPage from "../pages/LinkedList/LinkedListPage";
import StackPage from "../pages/Stack/StackPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/searching" element={<SearchingPage />} />
      <Route path="/sorting" element={<SortingPage />} />
      <Route path="/linkedlist" element={<LinkedListPage />} />
      <Route path="/stack" element={<StackPage />} />
    </Routes>
  );
}

export default AppRoutes;