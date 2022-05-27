import React from 'react'

/* eslint-disable react/prop-types */
const Table = ({ tableHeaders, tableBody }) => {
  return (
    <table className="table shadow-sm border border-light">
      <thead>
        <tr className="my-bg-secondary">
          {tableHeaders.map((tableHeader, index) => (
            <th className="text-white fw-bold" scope="col" key={index}>
              {tableHeader}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{tableBody}</tbody>
    </table>
  )
}
export default Table
