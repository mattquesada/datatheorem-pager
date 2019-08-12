export const employees = [
  {
    first_name: 'Joe',
    last_name: 'Bob',
    department: 'Nursing',
    salary: 100000,
    assignments: ['assist doctor', 'administer shots']
  },
  {
    first_name: 'Sarah',
    last_name: 'Stevens',
    department: 'Engineering',
    salary: 150000,
    assignments: ['build things', 'create reports', 'take nap']
  },
  {
    first_name: 'Johnny',
    last_name: 'Smith',
    department: 'Library',
    salary: 80000,
    assignments: ['look grumpy', 'shush people']
  }
];

// simulates an API response by returning the status piece
// we need
export const fakeResponses = {
  '199': { status: 199, json: () => 'Hello, 199' },
  '200': { status: 200, json: () => 'Hello, 200' },
  '201': { status: 201, json: () => 'Hello, 201' },
  '202': { status: 201, json: () => 'Hello, 202' },
  '204': { status: 204, json: () => 'Hello, 204' },
  '299': { status: 299, json: () => 'Hello, 299' },
  '300': { status: 300, json: () => 'Hello, 300' },
  '400': { status: 400, json: () => 'Hello, 400' },
  '500': { status: 500, json: () => 'Hello, 500' }
};

export const sampleSurveys = {
  validSurvey: {
    name: 'Malory Jenkins',
    email: 'mjenkins@gmail.com',
    message: 'Hello, World!'
  },
  emptyField: {
    name: 'Malory Jenkins',
    email: 'mjenkins@gmail.com',
    message: ''
  }
};