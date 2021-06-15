// const API = необходимый ключ
const startContainer = document.querySelector('.startContainer')
const randomForm = document.querySelector('.randomForm')
const oneDay = document.querySelector('.oneDay')
const forAppendInformation = document.querySelector('.forAppendInformation')
const solInput = document.querySelector('.solInput')
const containerForPicture = document.querySelector('.containerForPicture')
const formStart = document.querySelector('.selectForm')
const startEndForm = document.querySelector('.startEndForm')
const eventPlanet = document.querySelector('.btnEvents')
const eventForm = document.querySelector('.eventForm')
const eventStartEndForm = document.querySelector('.eventStartEndForm')
const containerForEvents = document.querySelector('.containerForEvents')
const selectFormEvent = document.querySelector('.selectFormEvent')


function getRandomArbitary(max) {
  return Math.floor(Math.random() * max)
}

function spacePicture(result, n) {
  for (let i = 0; i < n; i++) {

    const h5 = document.createElement("h5")
    h5.innerText = 'Photo title: ' + result[i].title
    h5.classList = "h4"

    const h6 = document.createElement("h6")
    h6.innerText = 'Photo date: ' + result[i].date

    const div = document.createElement("div")
    div.innerText = result[i].explanation
    if (!result[i].url.includes('https://www.youtube.com/')) {
      const newImg = document.createElement("img")
      newImg.src = result[i].url
      newImg.style = "width: 28rem;"
      containerForPicture.append(h5, h6, div, newImg)
    } else {
      const newIframe = document.createElement('iframe')
      newIframe.style.width = "560"
      newIframe.style.height = "315"
      newIframe.classList.add('ifr')
      newIframe.src = result[i].url
      newIframe.title = "YouTube video player"
      newIframe.frameborder = "0"
      newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      newIframe.allowFullscreen = true
      containerForPicture.append(h5, h6, div, newIframe)
    }
  }
}

function picturePlanet(result, n, inputYear, inputMouth, inputDay) {
  for (let i = 0; i < n; i++) {
    const divTime = document.createElement('div')
    divTime.innerText = 'Date and time of the photo: ' + result[i].date
    divTime.classList = "h6"
    divTime.style.margin = "8px"
    const newImg = document.createElement("img")
    newImg.src = `https://epic.gsfc.nasa.gov/archive/natural/${inputYear}/${inputMouth}/${inputDay}/png/` + result[i].image + '.png'
    newImg.style = "width: 22rem;"
    forAppendInformation.append(divTime, newImg)
  }
}
let resultCoordination = []
function events(result, n) {
  for (let i = 0; i < n; i++) {
    const h5 = document.createElement('h5')
    h5.innerText = i + 1 + '.' + " Event location: " + result[i].title
    h5.classList = 'h4'
    resultCoordination.push({ name: result[i].title, cood: { lat: result[i].geometry[0].coordinates[1], lng: result[i].geometry[0].coordinates[0] } })

    for (let j = 0; j < result[i].geometry.length; j++) {
      const div2 = document.createElement('div')
      div2.classList = "h6"
      if (result[i].geometry[j].magnitudeValue === null || result[i].geometry[j].magnitudeValue == undefined) {
        div2.innerText = 'Magnitude value: No data available'
      } else {
        div2.innerText = 'Magnitude value: ' + result[i].geometry[j].magnitudeValue
      }
      const div3 = document.createElement('div')
      if (result[i].geometry[j].magnitudeUnit === null || result[i].geometry[j].magnitudeUnit == undefined) {
        div3.innerText = 'Magnitude unit: No data available'
      } else {
        div3.innerText = 'Magnitude unit: ' + result[i].geometry[j].magnitudeUnit
      }

      const div4 = document.createElement('div')
      div4.innerText = 'Date of last event: ' + result[i].geometry[j].date

      const div5 = document.createElement('div')
      div5.innerText = 'Event coordinates: [Longitude: (долгота), Latitude: (широта)]' + ': ' + '[' + [result[i].geometry[0].coordinates[1] + ' ', result[i].geometry[0].coordinates[0]] + ']'

      const a = document.createElement('a')
      a.href = `${result[i].sources[0].url}`
      a.innerText = 'А source: ' + result[i].sources[0].url

      const h6 = document.createElement('h6')
      h6.innerText = 'Title event: ' + result[i].categories[0].title

      containerForEvents.append(h5, h6, div2, div3, div4, div5, a)

    }
  }
  console.log(resultCoordination)
  return resultCoordination
}


startContainer?.addEventListener('click', async (event) => {
  event.preventDefault()
  if (event.target.classList.contains('startBtn')) {

    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${formStart.value}/photos?sol=${solInput.value}&api_key=${API}`)

    const result = await response.json()

    const formPhoto = document.querySelector('form')
    formPhoto.style.textAlign = "center"
    formPhoto.style.margin = "20px"
    formPhoto.style.display = "flex"
    formPhoto.style.justifyContent = "center"

    const inputForNumberPhoto = document.querySelector('input')
    inputForNumberPhoto.name = "numberPhoto"
    inputForNumberPhoto.type = "number"
    inputForNumberPhoto.classList = "NumberPhoto"
    inputForNumberPhoto.placeholder = `choose a photo from 0 to ${result.photos.length}`

    const newBtn = document.querySelector('button')
    newBtn.classList = 'btnNumber btn btn-primary'
    newBtn.innerText = 'Choose number of photo'
    formPhoto.append(inputForNumberPhoto, newBtn)
    startContainer.append(formPhoto)

    formPhoto.addEventListener('click', async (event) => {
      console.log(event.target);
      event.preventDefault()
      if (event.target.classList.contains('btnNumber')) {
        const inputNumber = document.querySelector('.NumberPhoto')

        const div1 = document.createElement("div")
        div1.innerText = 'Name of the selected rover: ' + result.photos[inputNumber.value].rover.name
        div1.classList = 'h4'

        const div2 = document.createElement("div")
        div2.innerText = 'Sol rover on the Mars: ' + result.photos[inputNumber.value].sol

        const div3 = document.createElement("div")
        div3.innerText = 'Date of day of photography on Earth: ' + result.photos[inputNumber.value].earth_date

        const newImg = document.createElement("img")
        newImg.src = result.photos[inputNumber.value].img_src
        newImg.style = "width: 22rem;"
        startContainer.append(div1, div2, div3, newImg)

      }
    })

  }
})

randomForm?.addEventListener('click', async (event) => {
  event.preventDefault()
  console.log(event.target.value)
  const inputValue = document.querySelector('.countInput')
  console.log(inputValue.value)
  if (event.target.classList.contains('twoBtn')) {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API}&count=${inputValue.value}`)
    const result = await response.json()
    console.log(result)

    spacePicture(result, inputValue.value)

  }
})

startEndForm?.addEventListener('click', async (event) => {
  event.preventDefault()
  const inputDateStart = document.querySelector('.dateStart').value
  const inputDateEnd = document.querySelector('.dateEnd').value
  if (event.target.classList.contains('datesBtn')) {

    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API}&start_date=${inputDateStart}&end_date=${inputDateEnd}`)
    const result = await response.json()
    console.log(result);
    spacePicture(result, result.length)

  }
})

oneDay?.addEventListener('click', async (event) => {
  event.preventDefault()
  const inputDate = document.querySelector('.date').value
  if (event.target.classList.contains('oneDayBtn')) {
    const response = await fetch(`https://api.nasa.gov/EPIC/api/natural/date/${inputDate}?api_key=${API}`)

    const result = await response.json()
    console.log(inputDate.split('-'));
    const inputDateSplit = inputDate.split('-')
    picturePlanet(result, result.length, inputDateSplit[0], inputDateSplit[1], inputDateSplit[2])

  }
})

eventPlanet?.addEventListener('click', async (event) => {
  event.preventDefault()
  if (event.target.classList.contains('btnEvents')) {
    const response = await fetch(`https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5`)

    const result = await response.json()
  }
})

eventForm?.addEventListener('click', async (event) => {
  event.preventDefault()
  const inputValue = document.querySelector('.eventInput')
  if (event.target.classList.contains('eventBtn')) {
    console.log(inputValue.value);
    const response = await fetch(`https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=${inputValue.value}`)

    const result = await response.json()

    events(result.events, result.events.length)
    addMarker(map, resultCoordination)
  }
})

eventStartEndForm?.addEventListener('click', async (event) => {
  event.preventDefault()
  const selectFormEvent = document.querySelector('.selectFormEvent').value
  if (event.target.classList.contains('eventsDatesBtn')) {
    const response = await fetch(`https://eonet.sci.gsfc.nasa.gov/api/v3/categories/${selectFormEvent}`)

    const result = await response.json()
    if (result.events == []) {
      console.log(result);
      const div = document.createElement('div')
      div.innerText = 'There were no events for the specified parameters'
      containerForEvents.append(div)
    } else {
      console.log(result);
      events(result.events, result.events.length)
      addMarker(map, resultCoordination)
    }
  }

})

let map;
const maps1 = document.querySelector('.maps')
console.log(resultCoordination)

function initMap() {
  map = new google.maps.Map(document.querySelector('#map'), {
    center: { lat: 10.397, lng: 70.644 },
    zoom: 2
  });
}

function addMarker(map, arrLocation = []) {
  arrLocation.forEach(el => {
    new google.maps.Marker({
      position: el.cood,
      title: el.name,
      map: map
    })
  })
}

