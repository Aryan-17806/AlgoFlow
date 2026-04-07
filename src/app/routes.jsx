import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import SearchingPage from "../pages/Searching/SearchingPage";
import SortingPage from "../pages/Sorting/SortingPage";
import LinkedListPage from "../pages/LinkedList/LinkedListPage";
import StackPage from "../pages/Stack/StackPage";

import OperationsPage from "../pages/Stack/operations/OperationsPage";
import PrefixPage from "../pages/Stack/polishNotation/PrefixPage";
import PostfixPage from "../pages/Stack/polishNotation/PostfixPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/searching" element={<SearchingPage />} />
      <Route path="/sorting" element={<SortingPage />} />
      <Route path="/linkedlist" element={<LinkedListPage />} />
      <Route path="/stack" element={<StackPage />} />

      {/* ✅ Stack Sub Pages */}
      <Route path="/stack/operations" element={<OperationsPage />} />
      <Route path="/stack/prefix" element={<PrefixPage />} />
      <Route path="/stack/postfix" element={<PostfixPage />} />
    </Routes>
  );
}

export default AppRoutes;