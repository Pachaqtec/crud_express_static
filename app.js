const express = require('express')
const { v4: uuid } = require('uuid')

const PORT = 8080
const app = express()

const data = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/list', (request, response) => {
  // const { body, query, params, url } = request
  // const { cod } = params
  // const { name, age } = query
  // console.log('query: ', url)

  // response.write('Node.js v14')

  // const json = {
  //   status: cod,
  //   auth: true,
  //   response: {
  //     name,
  //     age: Number(age)
  //   }
  // }

  response.status(200).json(data)
})

app.post('/list', (request, response) => {
  const { body } = request
  
  const json = {
    status: 200,
    auth: true,
    response: {
      id: uuid(),
      ...body
    }
  }

  data.push(json.response)

  response.status(200).json(json)
})

app.put('/list/:id', (request, response) => {

  const { params, body } = request
  const { id } = params

  const dataUpdated = data.map((item) => {
    if (item.id === id) {
      return {
        id,
        ...body
      }
    }
    return item
  })

  data.splice(0, data.length)
  
  data.push(...dataUpdated)

  const json = {
    status: 200,
    auth: true,
    response: dataUpdated.find((item) => item.id === id)
  }

  response.status(200).json(json)

})

app.delete('/list/:id', (req, res) => {
  const { params } = req

  const dataUpdated = data.filter((item) => {
    if (item.id === params.id) {
      return false
    }
    return item
  })

  data.splice(0, data.length)
  
  data.push(...dataUpdated)

  res.status(200).json({
    status: 200,
    message: 'Se eliminó el registro con el código ' + params.id
  })

})

app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`)
})