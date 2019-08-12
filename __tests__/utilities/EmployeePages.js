/*
  The original example component provided by DataTheorem,
  slightly modified for enzyme test access
*/

import React from 'react';
import Pager from '../../src/Pager';

export function EmployeePages({ employees }) {
  return (
    <div>
      <h1>Employees</h1>
      <Pager
        pages={employees.map(employee => (
          <ul>
            <li id='name'>Name: {employee.last_name}, {employee.first_name}</li>
            <li id='department'>Department: {employee.department}</li>
            <li id='salary'>Salary: ${employee.salary}</li>
          </ul>
        ))}
        getLabel={
          i => `${employees[i].last_name}, ${employees[i].first_name}`
        }
        pageInfoUrl={(label) => `https://www.example.com/employees/info?label=${label}`}
        supportRequestUrl="https://www.example.com/support"
      >
        {({
          page,
          goPrevious,
          goNext,
          goToLabel,
          currentPageLabel,
          pageLabels,
          openSupportDialog,
          pageInfoIsLoading,
          pageInfoError,
          pageInfo,
        }) => (
          <>
            <div>
              <select onChange={e => goToLabel(e.target.value)}>
                {pageLabels.map((label, index) => (
                  <option
                    value={label}
                    selected={label === currentPageLabel}
                    key={index}
                  >
                    {label}
                  </option>
                ))}
              </select>
              <button onClick={goPrevious}>Previous</button>
              <button onClick={goNext}>Next</button>
              <button onClick={openSupportDialog}>Help</button>
            </div>
            <div>
              {page}
            </div>
            {pageInfoIsLoading && (
              <div>Loading more info...</div>
            )}
            {pageInfoError && (
              <div>Error fetching info: {pageInfoError}</div>
            )}
            {pageInfo && (
              <div>
                # of Likes: {pageInfo.likes}
              </div>
            )}
          </>
        )}
      </Pager>
    </div>
  );
}

export function EmployeePagesWithNullProps({ employees }) {
  return (
    <div>
      <h1>Employees</h1>
      <Pager
        pages={employees.map(employee => (
          <ul>
            <li id='name'>Name: {employee.last_name}, {employee.first_name}</li>
            <li id='department'>Department: {employee.department}</li>
            <li id='salary'>Salary: ${employee.salary}</li>
          </ul>
        ))}
        getLabel={
          i => `${employees[i].last_name}, ${employees[i].first_name}`
        }
        pageInfoUrl={null}
        supportRequestUrl={null}
      >
        {({
          page,
          goPrevious,
          goNext,
          goToLabel,
          currentPageLabel,
          pageLabels,
          openSupportDialog,
          pageInfoIsLoading,
          pageInfoError,
          pageInfo,
        }) => (
            <>
              <div>
                <select onChange={e => goToLabel(e.target.value)}>
                  {pageLabels.map((label, index) => (
                    <option
                      value={label}
                      selected={label === currentPageLabel}
                      key={index}
                    >
                      {label}
                    </option>
                  ))}
                </select>
                <button onClick={goPrevious}>Previous</button>
                <button onClick={goNext}>Next</button>
                <button onClick={openSupportDialog}>Help</button>
              </div>
              <div>
                {page}
              </div>
              {pageInfoIsLoading && (
                <div>Loading more info...</div>
              )}
              {pageInfoError && (
                <div>Error fetching info: {pageInfoError}</div>
              )}
              {pageInfo && (
                <div>
                  # of Likes: {pageInfo.likes}
                </div>
              )}
            </>
          )}
      </Pager>
    </div>
  );
}