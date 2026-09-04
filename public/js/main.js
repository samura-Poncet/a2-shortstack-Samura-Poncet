// FRONT-END (CLIENT) JAVASCRIPT HERE
const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const firstName = document.querySelector('#fname').value
  const lastName = document.querySelector('#lname').value
  const birthday = document.querySelector('#birthday'). value
  
  const  json = { 
    firstName: firstName, 
    lastName: lastName, 
    birthday: birthday
  }
  const body = JSON.stringify(json)

  const response = await fetch( '/api/zodiac', {
    method:'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: body
  })

  const data = await response.json()
  const result = document.querySelector('#result')
  const person = data[data.length - 1]

  result.innerHTML = `
  <div style = 'font-size: 50px;'>
  ${person.firstName}, your zodiac sign is
  ${person.zodiacImage} ${person.zodiacSign}!
  </div>
`

}

window.onload = function() {
  const form = document.querySelector('#zodiacForm')
  form.onsubmit = submit
}
