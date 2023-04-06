import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import DataTableFilter from "./DataTableFilter";

const ReactDatatable = ({ data, columns }) => {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = data.filter(
    (item) => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <DataTableFilter onFilter={(e) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      direction="auto"
      fixedHeaderScrollHeight="300px"
      pagination
      responsive
      subHeaderAlign="right"
      subHeaderWrap
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
  );
};

export default ReactDatatable;
