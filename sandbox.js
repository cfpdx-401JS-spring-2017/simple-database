function saySomething(text) {
  console.log(text);
}

function foo(callback) {
  for (var i=0; i<10; i++) {
    console.log('foo');
  }
  callback ('so sick of foo');
}
  foo(saySomething);