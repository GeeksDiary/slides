(function(window, document){
  var head = {};
  var slides = {};
  var current = head;

  var prepareSlides = function(container){
    var tail = head;
    var sections = container.getElementsByTagName('section');

    for(var i = 0; i < sections.length; i++){
      var section = sections[i];
      var dataset = section.dataset;

      var slide = {
        element: section,
        name: dataset.name ? dataset.name : i.toString(),
        previous: tail
      };
      tail.next = slide;
      tail = slide;

      slides[slide.name] = slide;
    }

    tail.next = head;
    head.previous = tail;

    return head.next || head;
  };

  var activate = function(slide){
    current.element.classList.remove('active');
    slide.element.classList.add('active');
    current = slide;
  };

  var currentHash = function(value){
      if(value){
        window.location.hash = value;
      }
      return window.location.hash.substr(1);
  };

  document.addEventListener('DOMContentLoaded', function(){
      var container = document.getElementsByClassName('slides');

      if(container.length === 0){
        return;
      }

      current = prepareSlides(container[0]);
      current = slides[window.location.hash] || current;

      if(currentHash() === current.name){
        activate(current);
      } else {
        currentHash(current.name);
      }

  });

  document.addEventListener('keyup', function(event){
      var next = current;

      if(event.keyIdentifier === 'Right'){
        next = current.next === head ? head.next : current.next;
      } else if (event.keyIdentifier === 'Left'){
        next = current.previous === head ? head.previous : current.previous;
      }

      currentHash(next.name);
  });

  window.addEventListener('hashchange', function(event){    
    var slide = slides[currentHash()];

    if(!slide){
      event.preventDefault();
      return;
    }

    activate(slide);
  });

})(window, document);
