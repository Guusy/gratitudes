
class GratitudesClient {

    add(gratitude){
        fetch('/api/gratitudes', {
            method: 'POST',
            body: JSON.stringify(gratitude), 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
    }
}

export default new GratitudesClient()