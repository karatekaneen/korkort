exports.test = (req, res) => {
   res.send({
      success: true, response: {
         "Korkortsnummer": 67621,
         "Efternamn": "Macro", "Namn": "Ode", "Fodelsedatum": "1991-08-15 07:20:58", "DatumForUtforande": "2014-10-27 03:46:01", "UpphorGalla": "2028-08-26 15:38:41", "UtfardandeMyndighet": "24 Hours on Craigslist", "Referensnummer": "37000-839", "Bild": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALPSURBVDjLjZNbSFNxHMcXm+BDBEFBvgRS9CBFrxJRoUlPs4ceJMiHsIshSTdSi7AI1K6KOfOSaZgXQmyic5u3TJ3zNue8TEvP5tl0czed7uy+nW//DV3ajQ58D+fh9/nwP/8fX85s9e1okkySVhKKhCEJqspvYKjoEnrykoOtD08zjbeOU++vxbYKUvdlFqbsjgbACYVDhgcWxfkwDApgVlbBOvUBFlUNVkYqsdxXCl1HIaiWfEzX5mCg6DKas0+BCAYiAnXtA9WWwKSoJHkHo7wcS18FWJS8BiV8htmGJ1BW3kXfy9SwoCg1RhURyCbpOIWsFwviCszUP8KIIA09+edBjg1ybFRfP4SytIOoyDiKhqcXUFFSgJI6cVxEEHr1zPskCr0XVocfbh8Lj5+FzRnAjMGNMdoFrdULyuJF27gFJe1ayRYcEYQiVbs+S9VOdpEMM54gDHY/Zo0eaAgo+76Bt1Id+0akbd4O7xCEIlSux7co7dQw5YBu1ReG2ydsKJXS88UiTfyv8G+CrdQPmvvHaQZjWgcEErrvTzP/FDQOmuQTegYKIihu0/T/t6BeZjohHDXTkzoHbEwAxnU/RGMmFDTNLYjTE0p7+XvorgQeK03i6kiydwhq+1eETUMmVmN2hzfhDbDYcAehs/nQXfYCynsn4Ra9AquWwNl4B6MZxwIdibybYbimzyjtnLJh2e6D0xuEj8CBIAuGfCv1LnRdPAwXgVHMB7L2AnmxsDw/A+lZrobT0DkVV9dvQK96DeYNfxgmbFhgdwXwbcWDrsQosIrQBn8+a7kHEPqdcBempWUYkMsgn7NCb3Fh3UlWaHSg/osWjz9OoCU5BkxVGkAgz30OVknodC7IPSztKNPfuqDI5WP46hEYsmJhzokCdWUXuvm8gCSJ+4Czvc6kwhSpMLNZ4XAXSIWDpMLMp5T9NtE5nnNzC0shOHR/PwBGKPcL7gZY5gAAAABJRU5ErkJggg==", "Signatur": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALNSURBVDjLpZLZT1NBFMb5N3zx2RcTedGYGB6MLyZuSTWoiVgMimFL2KRQUKsClR1MKbKVpUhbBKmQlhbK0pQKpFDaAtLShQKytdTblrJchM97G3PVYIyJJ/kyZ86Z+c2ZMxMBIOJ/dCwwJCm6qO94qpns4WxN93HJyd4cUidNXVc1pHZ3v805/1eAVlZQbVZz9petY9hcc8Dv94EgvFhZNMOsk6CvPn5bWp6U90fAsCS/0m4Qwudxw+r24f2gC9Wds6iSzaBVaceUbR0uqx6KuscQ5cdl/gZQtfIvGHoySO+GC1rjKrqGXLAv++H1B+Hxb8O65Eer2o4PI07MG5UQv7wdqitIiGQAA81ZigUq8XlxCzKNE7T5CAK2L2vYpXxawSOgptcOncmNfnE6anLvtDKAwZbktVW3BWLVAuaok0MHRwiGQhA0irBBgQJ7e+hUDUJrI1DcboJlQoo6LsvFADTNSbs+7wqK2kzY2CHh2zvEPpXIfs6DuEuOrGc8qPXjsBAk0gTjWHKNo5F7c4cB9NXG73o3HeCJjFgKkhTkEMtEAK9KSsObtUYzPAeAwUsiueIT3I4RNGSzfgI6y2KcDosSFTITRhYIrFKXXg6QUAyPwrnlx/o3QKrvQqqQjUdl13G/8BJSsqIIBtCUHyMalnKgN9nAl1nhoRrmI4HAISXK7xiVgNcRi94ZAaZX1SjvT0B0+WmcSzxREgY0FCaeaXkRvTNvaEGbchKvZfMwur4iSPUjGCIRW3QZcksF5HNV4RcqGXiI8oF4GrDLfKRaXiznHf8W5saqMTRhQIFoDE+qRpFeocMVbiQUM/X41T6aBTTg938tyL2XV8u5EZQL72JKkw/nnBjO2SZEpZxEsfoBCtXs8OZCFft4BQwkL/ZsZSar/U3aNbcw4+oOLXZKpJ9Vcgql6rjwyfRIz5ke/IuoxXxKAbrsHyOfjn8HcjT9RjDIr5sAAAAASUVORK5CYII=", "Villkor": "Kids Crest"
      }
   })
}
exports.showUsers = (req, res) => {
   const data = require('../data/Personer.json')

   res.send(data.map(user => {
      return user.Korkortsnummer
   }))
}
exports.showDiff = (req, res) => {
   const data = require('../data/Personer.json')
   const dateArr = data
      .map(date => {
         return date.Fodelsedatum.split(' ')
      }).map(date => {
         date[0] = date[0].split('-')
         date[1] = date[1].split(':')

         const outputString = date[0].join('') + ' ' + date[1][1] + date[1][2]
         return outputString
      })




   res.send(dateArr[0])
}
