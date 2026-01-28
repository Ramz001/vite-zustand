import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "../lib/filter.store";
import { getUsers } from "../api/user.api";

export default function AsyncExample() {
  const { filters, setFilters } = useFilterStore();

  const currentFilters = filters ?? {};

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", filters],
    queryFn: () => getUsers({ filters }),
  });

  const handleFilterChange = (
    key: keyof typeof currentFilters,
    value: string | number | undefined,
  ) => {
    setFilters({
      ...currentFilters,
      [key]: value === "" ? undefined : value,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Async Example with Zustand Filters</h2>

      {/* Filter Controls */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <label>
          Skip:
          <input
            type="number"
            min="0"
            value={currentFilters?.skip ?? ""}
            onChange={(e) =>
              handleFilterChange(
                "skip",
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
            style={{ marginLeft: "5px", padding: "5px" }}
          />
        </label>

        <label>
          Limit:
          <input
            type="number"
            min="1"
            value={currentFilters?.limit ?? ""}
            onChange={(e) =>
              handleFilterChange(
                "limit",
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
            style={{ marginLeft: "5px", padding: "5px" }}
          />
        </label>

        <label>
          Sort By:
          <input
            type="text"
            value={currentFilters?.sortBy ?? ""}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            placeholder="e.g., firstName"
            style={{ marginLeft: "5px", padding: "5px" }}
          />
        </label>

        <label>
          Order:
          <select
            value={currentFilters?.order ?? ""}
            onChange={(e) => handleFilterChange("order", e.target.value)}
            style={{ marginLeft: "5px", padding: "5px" }}
          >
            <option value="">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>

        <button onClick={() => setFilters(undefined)}>Clear Filters</button>
      </div>

      {/* Results */}
      {isLoading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>Error loading users</p>}

      {data && (
        <div>
          <p style={{ fontSize: "1.1em", marginBottom: "15px" }}>
            Total Users: <strong>{data?.total}</strong> | Showing:{" "}
            <strong>{data?.users?.length || 0}</strong>
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "15px",
            }}
          >
            {data.users?.map((user) => (
              <div
                key={user.id}
                style={{
                  border: "1px solid #555",
                  padding: "15px",
                  borderRadius: "8px",
                  backgroundColor: "#1a1a1a",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#646cff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(100,108,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#555";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #646cff",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: "1.1em",
                        fontWeight: "600",
                        marginBottom: "2px",
                      }}
                    >
                      {user.firstName} {user.lastName}
                    </div>
                    <div style={{ fontSize: "0.85em", color: "#888" }}>
                      @{user.username}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "0.9em", lineHeight: "1.6" }}>
                  <div style={{ marginBottom: "5px" }}>
                    <span style={{ color: "#888" }}>📧</span> {user.email}
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    <span style={{ color: "#888" }}>📱</span> {user.phone}
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    <span style={{ color: "#888" }}>🏢</span>{" "}
                    {user.company.title} at {user.company.name}
                  </div>
                  <div>
                    <span style={{ color: "#888" }}>📍</span>{" "}
                    {user.address.city}, {user.address.state}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
