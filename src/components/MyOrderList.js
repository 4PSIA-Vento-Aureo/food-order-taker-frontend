import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React from 'react'
import { getPrice } from 'src/utils/getPrice'

const MyOrderList = ({ food, handleDeleteMenu }) => {
  const { name, count, image, price } = food

  return (
    <div className="order-list row d-flex align-items-center ms-1 mb-3 pe-2">
      <div className="col-5 p-0">
        <div className="order-list-image-parent d-flex align-items-center">
          <img
            className="order-list-image"
            src={image}
            alt="food"
            style={{
              borderRadius: '0.5rem',
            }}
          />
        </div>
      </div>
      <div className="col-6 p-0">
        <h6>{`${count} x ${name}`}</h6>
        <div>{getPrice(price ? price : 0)}</div>
      </div>
      <div className="col-1 p-0  d-flex justify-content-end">
        <CIcon
          className="text-danger"
          icon={cilTrash}
          height={24}
          onClick={() => handleDeleteMenu(food)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  )
}

MyOrderList.propTypes = {
  name: MyOrderList.string,
  count: MyOrderList.number,
  image: MyOrderList.string,
  price: MyOrderList.number,
}

export default MyOrderList
