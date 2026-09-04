const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // On Render, make sure `npm install` is your build command.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  {'firstName': 'Samura', 'lastName': 'Poncet', 'birthday': '10-21-2004', 'zodiacSign': 'Libra', 'zodiacImage': '♎️'  },
  {'firstName': 'Maya', 'lastName': 'Dixon', 'birthday': '03-15-2004', 'zodiacSign': 'Pisces', 'zodiacImage': '♓️' },
  {'firstName': 'Mish', 'lastName': 'Bernard', 'birthday': '03-25-2004', 'zodiacSign': 'Aries', 'zodiacImage': '♈️'},
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' && request.url== '/api/zodiac'){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const getZodiacSign = function(Birthday){
  const date = new Date(Birthday)

  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()

  if((month === 3 && day >= 21 ) || (month === 4 && day <= 19)){
     return {sign:'Aries', image: '♈️'}
     
} else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)){
  return {sign: 'Taurus', image:'♉️'}
} else if((month === 5 && day >= 21) || (month === 6 && day <= 20)){
  return{sign: 'Gemini', image: '♊️'}
} else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)){
  return{sign: 'Cancer', image: '♋️'}
} else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)){
  return{sign: 'Leo', image: '♌️'}
} else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)){
  return{sign: 'Virgo', image:'♍️'}
} else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)){
  return{sign: 'Libra', image: '♎️'}
} else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)){
  return{sign: 'Scorpio', image:'♏️'}
} else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)){
  return{sign: 'Sagittarius', image: '♐️'}
} else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)){
  return{sign: 'Capricorn', image:'♑️'}
} else if ((month === 1 && day >= 20) || (month === 2 && day <= 19)){
  return{sign: 'Aquarius', image: '♒️'}
}else {
  return{sign: 'Pisces', image: '♓️'}
}
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
    const incomingData = JSON.parse(dataString)
    const zodiac = getZodiacSign(incomingData.birthday)

    const newPerson = {
      firstName : incomingData.firstName, 
      lastName : incomingData.lastName, 
      Birthday : incomingData.birthday, 
      zodiacSign: zodiac.sign,
      zodiacImage: zodiac.image
    }
    appdata.push(newPerson)

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
