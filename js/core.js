//slides

let db = {
  info: {
    class:'.slider',
    type:'arrows', // pagination or arrows
    page:1, // select active page (default)
    elements:1, // amount elements on page
    created:false, // reset for render
  },
  slides: [
  {type:'iframe',html:'<iframe width="1170" height="600" src="https://www.youtube.com/embed/WHzhfjSGm5k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>'},
  {type:'iframe',html:'<iframe width="1170" height="600" src="https://www.youtube.com/embed/QQjb_EH2m7g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>'}
  ]
}
db.info.elements_old = db.info.elements

db.info.page_end = Math.floor(db.slides.length / db.info.elements);
if ( Math.floor(db.slides.length % db.info.elements) > 0 ) {
  db.info.page_end += 1
}


  function slider(page = db.info.page){

    let class_slider = document.querySelector(db.info.class)
    let string = ''

    if ( !db.info.created ) {
      class_slider.innerHTML = ''
    }

    let start = page * db.info.elements - db.info.elements
    let end = start + db.info.elements
    for (var i = start; i < end; i++) {
      if ( db.slides[i] !== undefined ) {
        if ( db.slides[i].type == 'image' ) {
          string += 
          ' <div class="slide" onclick="popupInner(this)">'+
          '   <div class="team__img"><img src="'+db.slides[i].url+'" alt=""></div>'+
          ' </div>'
        }
        if ( db.slides[i].type == 'iframe' ) {
          string += 
          ' <div class="slide" onclick="popupInner(this)">'+
          '   <div class="iframe">'+db.slides[i].html+'</div>'+
          ' </div>'
        }
      } else {
        //db.info.page = 1
        break
      }
    }

    let screen = document.createElement('div')
    screen.classList.add('screen')
    screen.innerHTML = string
    if ( !db.info.created ) {
      class_slider.appendChild(screen)
    } else {
      document.querySelector('.screen').replaceWith(screen)
    }




    db.info.created = true


    if ( db.info.type === 'pagination' ) {
      if ( document.querySelector('.pagination') == undefined ) {
        let pagination = document.createElement('div')
        pagination.classList.add('pagination')
        Math.ceil(db.slides.length / db.info.elements)

        for (var i = 1; i <= Math.ceil(db.slides.length / db.info.elements); i++) {
          let page_item = document.createElement('div')
          page_item.setAttribute('onclick','slider('+i+')')
          if (i == 1){page_item.classList.add('active')}
            page_item.addEventListener('click',function(e){
              let item = document.querySelectorAll('.pagination div')
              for (var i = 0; i < item.length; i++) {
                item[i].classList.remove('active')
              }
              this.classList.add('active')
            })
          pagination.appendChild(page_item)
        }
        class_slider.appendChild(pagination)
      }
    }

    if ( db.info.type === 'arrows' ) {
      if ( document.querySelector('.arrows') == undefined ) {

        let arrows = document.createElement('div')
        arrows.classList.add('arrows')

        let next = document.createElement('div')
        next.classList.add('slider_back')
        next.addEventListener('click',function(){
          db.info.page += 1
          console.log(db.info.page)
          if ( db.info.page > db.info.page_end ) {
            db.info.page = 1
          }
          slider() 
        })
        arrows.appendChild(next)

        let back = document.createElement('div')
        back.classList.add('slider_next')
        back.addEventListener('click',function(){
          db.info.page -= 1
          if ( db.info.page < 1 ) {
            db.info.page = db.info.page_end
          }
          console.log(db.info.page)
          slider() 
        })
        arrows.appendChild(back)

        class_slider.appendChild(arrows)
      }
    }
  }


  function sliderSize(){
    if (window.outerWidth < 576){
      db.info.elements = 1
      db.info.created = false
      slider()
    } else {
      db.info.elements = db.info.elements_old
      db.info.created = false
      slider()
    } 
  }

  window.onresize = function(){
    sliderSize()
  }
  

  sliderSize()



let history_pos = 1;

function historyScroll(step) {
  history_pos += step
  if ( history_pos <= 0 ) {
    history_pos = 1
  }
  if ( history_pos >= 10 ) {
    history_pos = 2 
  }
  let width = document.querySelector('.history .container .moverflow-x').scrollWidth
  let screen = document.querySelector('.container').offsetWidth
  let where = Math.floor((width / 10 * history_pos) - (screen / 2))
  document.querySelector('.history .container .moverflow-x').scrollLeft = where
}





//popup

function popupOpen(popup_id) {
  document.querySelector(popup_id).classList.remove('hidden')
  document.querySelector('body').classList.add('overflow-hidden')
}

function popupClose(popup_id) {
  document.querySelector(popup_id).classList.add('hidden')
  document.querySelector('body').classList.remove('overflow-hidden')
}
function popupInner(el) {
    document.querySelector('#popup-slider .overlay-overflow-box').innerHTML = el.innerHTML
    popupOpen('#popup-slider')
}

//menu

window.onload = function() {
  setInterval(function(){
    if ( window.pageYOffset > 200 ) {
      document.querySelector('.menu-bar').classList.add('active')
    } else {
      document.querySelector('.menu-bar').classList.remove('active')
    }
  },300)

  document.querySelector('#popup-slider .overlay-overflow-close').onclick = function() {
    popupClose('#popup-slider')
  }

  document.querySelector('.menu_button').onclick = function(e){
    this.classList.toggle('active') 
    document.querySelector('nav').classList.toggle('active')
    document.body.classList.toggle('active')
  }

  for (var i = 0; i < document.querySelectorAll('.menu__item').length; i++) {
    console.log(1)
    document.querySelectorAll('.menu__item')[i].onclick = function() {
      document.querySelector('nav').classList.remove('active')
      document.body.classList.toggle('active')
      document.querySelector('.menu_button').classList.remove('active')
    }
  }

}