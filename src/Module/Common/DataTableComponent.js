import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

function DataTableComponent({ columns, data, filterPlaceholder }) {

  const tableData = {
    columns,
    data,
    filterPlaceholder,
  };
  return (
    <DataTableExtensions exportHeaders={false} {...tableData}>
      <DataTable
        columns={columns}
        data={data}
        noHeader
        defaultSortField="id"
        defaultSortAsc={false}
        pagination={true}
        paginationRowsPerPageOptions={[10, 20, 50, 100, 500]}
        paginationPerPage={10}
      />
    </DataTableExtensions>
  );
}

export default DataTableComponent;
