import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query"; // ✅ ADD THIS
import useAllGames from "../../hooks/useAllGames";

const AllGames = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient(); // ✅ INIT
  const { data, isLoading, isError, error, isFetching } =
    useAllGames(currentPage);

  // ✅ Check cache per page (include currentPage in key)
  const queryInfo = queryClient.getQueryState(["allGames", currentPage]);
  console.log("Cache Info:", queryInfo);

  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  console.log("Is Loading:", isLoading);
  console.log("Is Fetching:", isFetching);
  console.log("Data:", data);

  if (isLoading) return <div>Loading games...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>All Games - Page {currentPage}</h2>

      {/* Game List */}
      {/* {data?.games?.map((game) => (
        <div key={game.id}>{game.name}</div>
      ))} */}

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>

        {/* {data?.allGames?.map((game) => (
          <div key={game.id}>{game.name}</div>
        ))} */}

        {/* {data?.allGames?.length === 10 && ( */}
          <button onClick={handleNext}>Next</button>
        {/* )} */}
      </div>

      {/* Refetch indicator */}
      {isFetching ? (
        <p style={{ color: "orange" }}>🔄 Fetching from API...</p>
      ) : (
        <p style={{ color: "green" }}>✅ Data served from cache</p>
      )}

      {/* Show detailed cache status */}
      <pre style={{ background: "#f0f0f0", padding: "10px" }}>
        {JSON.stringify(queryInfo, null, 2)}
      </pre>
    </div>
  );
};

export default AllGames;
