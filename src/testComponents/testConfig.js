export const employees = [
  {
    first_name: 'Joe',
    last_name: 'Bob',
    department: 'Nursing',
    salary: 100000
  },
  {
    first_name: 'Sarah',
    last_name: 'Stevens',
    department: 'Engineering',
    salary: 150000
  },
  {
    first_name: 'Johnny',
    last_name: 'Smith',
    department: 'Library',
    salary: 80000
  }
];

// simulates an API response by returning the status piece
// we need
export const fakeResponses = {
  '199': { status: 199, json: () => 'Hello, 199' },
  '200': { status: 200, json: () => 'Hello, 200' },
  '201': { status: 201, json: () => 'Hello, 201' },
  '299': { status: 299, json: () => 'Hello, 299' },
  '300': { status: 300, json: () => 'Hello, 300' }
}