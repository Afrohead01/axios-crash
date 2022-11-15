// GET REQUEST
function getTodos() {
  axios.get('https://jsonplaceholder.typicode.com/todos')
  .then(res=>showOutput(res))
  .catch(err=>console.log(err))
  console.log('GET Request');
}

// POST REQUEST
function addTodo() {
  //Long Procedure
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'New Todo',
    completed: false
  })
  .then(res=>showOutput(res))
  .catch(err=>console.log(err))
  console.log('POST Request');
}

// PUT/PATCH REQUEST
function updateTodo() {
  // axios.put('https://jsonplaceholder.typicode.com/todos/1', {
  //   title: 'Updated todo',
  //   completed: true
  // })
  // .then(res=>showOutput(res))
  // .catch(err=>console.log(err))
  axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
    title: 'Updated todo',
    completed: true
  })
  .then(res=>showOutput(res))
  .catch(err=>console.log(err))
  console.log('PUT/PATCH Request');
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(res=>showOutput(res))
  .catch(err=>console.log(err))
  console.log('DELETE Request');
}

// // SIMULTANEOUS DATA
// // Long syntax
// function getData() {
//   axios.all([
//     axios.get('https://jsonplaceholder.typicode.com/todos'),
//     axios.get('https://jsonplaceholder.typicode.com/posts')
//   ])
//   .then(res=>{
//     console.log(res[0]);
//     console.log(res[1]);
//     showOutput(res[0]);
//   })
//   .catch(err=>console.log(err))
//   console.log('Simultaneous Request');
// }

// SIMULTANEOUS DATA
// Long syntax
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos'),
    axios.get('https://jsonplaceholder.typicode.com/posts')
  ])
  .then(axios.spread((todos,posts)=> showOutput(posts)))
  .catch(err=>console.log(err))
  console.log('Simultaneous Request');
}
// CUSTOM HEADERS
function customHeaders() {
  const Config = {
    headers: {
     'Content-Type' : 'application/json',
     Authorization : 'someone'
    }
  }
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'New Todo',
    completed: false
  },Config)
  .then(res=>showOutput(res))
  .catch(err=>console.log(err))
  console.log('Custom Headers');
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todoss')
  .then(res=>showOutput(res))
  .catch(err=> {
    if(err.response){
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)

      if(err.response.status === 404){
        alert('Error: Page not found!')
      }
    }
  })
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config=>{
    console.log(`${config.method.toUpperCase()} request sent to
    ${config.url} at ${new Date().getTime()}`)
    return config
  },
  error => {
    return new Promise.reject(error)
  }
)
// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
