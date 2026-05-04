import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import SearchingPage from "../pages/Searching/SearchingPage";
import SortingPage from "../pages/Sorting/SortingPage";
import LinkedListPage from "../pages/LinkedList/LinkedListPage";
import StackPage from "../pages/Stack/StackPage";

import LinearSearchPage from "../pages/Searching/LinearSearchPage";
import BinarySearchPage from "../pages/Searching/BinarySearchPage";

import BubbleSortPage from "../pages/Sorting/BubbleSortPage";
import SelectionSortPage from "../pages/Sorting/SelectionSortPage";
import InsertionSortPage from "../pages/Sorting/InsertionSortPage";
import MergeSortPage from "../pages/Sorting/MergeSortPage";
import QuickSortPage from "../pages/Sorting/QuickSortPage";

import InsertPage from "../pages/LinkedList/InsertPage";
import DeletePage from "../pages/LinkedList/DeletePage";
import SearchPage from "../pages/LinkedList/SearchPage";
import TraversalPage from "../pages/LinkedList/TraversalPage";

import OperationsPage from "../pages/Stack/operations/OperationsPage";
import PrefixPage from "../pages/Stack/polishNotation/PrefixPage";
import PostfixPage from "../pages/Stack/polishNotation/PostfixPage";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/searching" element={<SearchingPage />} />
      <Route path="/sorting" element={<SortingPage />} />
      <Route path="/linkedlist" element={<LinkedListPage />} />
      <Route path="/stack" element={<StackPage />} />

      <Route path="/searching/linear" element={<LinearSearchPage />} />
      <Route path="/searching/binary" element={<BinarySearchPage />} />

      <Route path="/sorting/bubble" element={<BubbleSortPage />} />
      <Route path="/sorting/selection" element={<SelectionSortPage />} />
      <Route path="/sorting/insertion" element={<InsertionSortPage />} />
      <Route path="/sorting/merge" element={<MergeSortPage />} />
      <Route path="/sorting/quick" element={<QuickSortPage />} />

      <Route path="/linkedlist/insert" element={<InsertPage />} />
      <Route path="/linkedlist/delete" element={<DeletePage />} />
      <Route path="/linkedlist/search" element={<SearchPage />} />
      <Route path="/linkedlist/traversal" element={<TraversalPage />} />

      <Route path="/stack/operations" element={<OperationsPage />} />
      <Route path="/stack/prefix" element={<PrefixPage />} />
      <Route path="/stack/postfix" element={<PostfixPage />} />

    </Routes>
  );
}

export default AppRoutes;