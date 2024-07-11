"use client";
import { Button, Typography } from "@mui/material";
import EmployeeDetails, { Employee } from "../components/Card";
import { Key, useEffect, useState } from "react";
import SearchBox from "@/components/Search";
import BasicModal from "@/components/Modal";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const fetchAndSetEmployees = async (query?: string) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/employee/all${
        query ? `?query=${query}` : ""
      }`
    );
    setEmployees(await response.json());
  };
  useEffect(() => {
    fetchAndSetEmployees();
  }, []);
  return (
    <>
      <Typography
        className="m-4 text-center text-xl font-semibold text-gray-600"
        gutterBottom
      >
        Employee Information
      </Typography>

      <div className="flex flex-col ">
        <div className=" flex flex-col w-max justify-evenly mx-4">
          <div className="self-start">
            <BasicModal variant="ADD" fetchAndSetEmployees={fetchAndSetEmployees}/>
          </div>
          <div className="self-end">
            {" "}
            <SearchBox
              className="ring-1 w-48"
              searchEmployees={fetchAndSetEmployees}
            />
          </div>
        </div>
        <div className="flex-wrap flex gap-1 ">
          {employees?.map((employee: Employee, i: Key | null | undefined) => (
            <EmployeeDetails className="w-80" key={i} employee={employee} fetchAndSetEmployees={fetchAndSetEmployees} />
          ))}
        </div>
      </div>
    </>
  );
}
