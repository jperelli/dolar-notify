const notifier = require('node-notifier');
const axios = require('axios');
const cheerio = require('cheerio');

let PRECIO = 0

function notify_precio() {
  axios.get('http://www.bna.com.ar/Personas').then(response => {
    let $ = cheerio.load(response.data);
    let precio = $('.table.cotizacion tbody tr').first().find('td').last().text()
    precio = parseFloat(precio.split(',').join('.'))
    let str = `${PRECIO ? 'ANTERIOR: ' + PRECIO + '\n' : ''}ACTUAL: ${precio}`

    if (precio !== PRECIO) {
      console.log(str)
      PRECIO = precio

      notifier.notify({
        title: 'Precio Dolar',
        message: str,
        wait: true,
        closeLabel: 'cerrar',
        time: 2000000
      });
    }
    setTimeout(notify_precio, 10000)
  });
}
notify_precio()
