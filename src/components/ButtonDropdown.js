import { cilMagnifyingGlass, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import React from 'react'

/* eslint-disable react/prop-types */
const ButtonDropdown = ({ handleViewDetail, handleEdit, handleDelete }) => {
  return (
    <CDropdown variant="btn-group">
      <CDropdownToggle className="text-white" split />
      <CDropdownMenu>
        {handleViewDetail && (
          <CDropdownItem onClick={handleViewDetail}>
            <CIcon icon={cilMagnifyingGlass} /> View Detail
          </CDropdownItem>
        )}
        <CDropdownItem onClick={handleEdit}>
          <CIcon icon={cilPencil} /> Edit
        </CDropdownItem>
        <CDropdownItem className="dropdown-item-danger text-danger" onClick={handleDelete}>
          <CIcon icon={cilTrash} /> Remove
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default ButtonDropdown
