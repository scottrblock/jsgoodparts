document.writeln('Hello, world!');

//Chapter 3

//Object Literals
var stooge = {
  "first-name"  :  "Jerome",
  "last-name"   :  "Howard",
  "middle"      :  "Scott", 
};

stooge.middle = "Richard";

document.writeln(stooge["first-name"]);
document.writeln(stooge.middle);

//for in loop
for(name in stooge){
  document.write(name + ": ");
  document.write(stooge[name] + "\n")
}

//Chapter 4

//Function Literals

var add = function(a, b){
  return a + b;
}

document.writeln( add(2, 3) );

//Method Invocation
var scottObject = {
  value: 0,
  increment: function(inc){
    if(typeof inc === 'number'){
      this.value += inc;
    } else{
      this.value += 1;
    }
  }
};

scottObject.increment();
document.writeln(scottObject.value);
scottObject.increment(2);
document.writeln(scottObject.value);

//This and That
scottObject.double = function(){
  var that = this;

  var helper = function(){
    //"this" is now bound to global scope, not outter function
    that.value = add(that.value, that.value);
  };
};

//Make a "method" method for prettier prototyping
Function.prototype.method = function(name, func){
  //only add if not already there
  if(!this.prototype[name]){
    this.prototype[name] = func;
    return this;
  }
};

//Make an integer method for numbers
Number.method('integer', function(){
  if(this < 0){
    return Math['ceil'](this);
  } else{
    return Math['floor'](this);
  }
});

document.writeln((-10/3).integer());

//Closure example
var fade = function(node){
  var level = 1;
  var step = function(){
    var hex = level.toString(16);
    node.style.backgroundColor = '#FFFF' + hex + hex;

    if(level < 15){
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};

fade(document.body);

/*Closure and loops
  I've fucked this up so many times
  This is the right way!

  No function in the loop, helper outside the loop
*/
var add_the_handlers = function(nodes){
  var helper = function(i){
    return function(e){
      alert(i);
    };
  };

  var i;
  for(i = 0; i < nodes.length; i += 1){
      nodes[i].onclick = helper(i);
  }

}

//Using Modules

//module to replace some html entities
String.method('deentityify', function(){
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>' 
  };

  return function(){
    //The fancy regex isn't the important part here
    return this.replace(/&([^&;]+);/g,
      function(a, b){
        var r = entity[b];
        if(typeof r === 'string'){
          return r;
        } else{
          return a;
        }
      }
    );
  };
//invoke immediately
}());

document.writeln('&lt;&quot;&gt;'.deentityify());

//Secure, mutable objects
var serial_maker = function(){
  var prefix = '';
  var seq = 0;

  return{
    set_prefix: function(p){
      prefix = String(p);
    },
    set_seq : function(s){
      seq = s;
    },
    gensym: function(){
      var result = prefix + seq;
      seq += 1;
      return result;
    }
  };
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();














