import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader } from "src/components";
import Table from "src/components/Table";
import { token } from "src/utils/getToken";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_API_URL}/api/user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    }
  }, [token, isLoading]);

  if (isLoading) {
    return <Loader />;
  }
  if (!users) {
    return <div>Users Not Found!</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Users</h4>
        </div>
        <div className="mb-2 mb-md-0">
          <button
            type="button"
            className="btn btn-primary"
            onClick={console.log}
          >
            Create User
          </button>
        </div>
      </div>

      <Table
        tableHeaders={["Name"]}
        tableBody={users.map((value, index) => (
          <tr className="bg-white" key={index}>
            <td>{value.user.name}</td>
            {/* <td>{value.status}</td>
            <td>{getPrice(value.totalPrice)}</td>
            <td>
              <Button
                className="text-white"
                variant="primary"
                onClick={() => viewDetail(value.id)}
              >
                View Detail
              </Button>
            </td> */}
          </tr>
        ))}
      />
    </>
  );
};

export default Users;
