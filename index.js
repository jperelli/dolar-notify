const notifier = require('node-notifier');
const axios = require('axios');
const cheerio = require('cheerio');

let PRECIO = 0

function notify_precio() {
  axios.get('http://www.bna.com.ar/Personas').then(response => {
    let $ = cheerio.load(response.data);
    let precio = $('.table.cotizacion tbody tr').first().find('td').last().text()
    precio = precio.split(',').join('.')
    if (parseFloat(precio) != PRECIO) {
      const str = 'ANT:'+PRECIO+' ACT:'+parseFloat(precio)
      console.log(str)
      PRECIO = parseFloat(precio)
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
