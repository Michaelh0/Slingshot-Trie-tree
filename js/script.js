//https://www.30secondsofcode.org/articles/s/js-data-structures-tree - where i found the Tree Data Structure
// https://www.30secondsofcode.org/articles/s/js-data-structures-binary-search-tree - where i found the binary search tree
class BinarySearchTreeNode {
  constructor(key, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }

  get hasChildren() {
    return this.children.length === 0;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = new BinarySearchTreeNode("");
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root) {
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  insert(key, value = key) {
    let node = this.root;
    
    for (let count = 1; count <= key.length; count++) {
      if (node.key === key) return false;
      var char = key.substr(0,count);
      var found = false;
      for (var i = 0; i < node.children.length; i++)
      {
        //console.log(node.children[i].key);
        //console.log(char);
        if (node.children[i].key == char){
          
          node = node.children[i];
          found = !found;
        }
      }
      if (!found){
        var newLen = node.children.push(new BinarySearchTreeNode(char,char,node));
        //console.log(newLen);
        node = node.children[((node.children).length)-1];
        //console.log(node);
      }
    }
    
  }

  has(key) {
    for (let node of this.postOrderTraversal()) {
      if (node.key === key) return true;
    }
    return false;
  }

  find(key) {
    for (let node of this.postOrderTraversal()) {
      if (node.key === key) return node;
      console(key);
    }
    console(key);
    return undefined;
  }

  remove(key) {
    let node = this.root;
    for (let count = 1; count <= key.length; count++) {
      var char = key.substr(0,count);
      var found = false;
      for (var i = 0; i < node.children.length; i++)
      {
        if (node.children[i].key == char){
          console.log(node.children[i].key);
          node = node.children[i];
          found = !found;
        }
      }
      console.log(found);
      if (!found && node.children.length > 0){
        return false;
      }
    }
    node = node.parent;
    node.children = [];
    return true;
  }
}

//let treeCreated = false;
let tree = new BinarySearchTree();

document.getElementById("addbtn").addEventListener("click",function(){
  /*if(!treeCreated){
    tree = new BinarySearchTree(document.getElementById('add').value);
    treeCreated = !treeCreated;
  }
  else 
   */ tree.insert(document.getElementById('add').value);
});

document.getElementById("removebtn").addEventListener("click",function(){
  var word = document.getElementById('remove').value;
  var existsToRemove = (tree.remove(word));
  let pureElement = document.getElementById("pureOutput");
  pureElement.innerHTML = "";
  var tag = document.createElement("span");
  var text;
  if(!existsToRemove)
    text = document.createTextNode(word + " does not exist to be removed in the trie");
  else 
    text = document.createTextNode(word + " is now removed from the trie");
  tag.appendChild(text);
  pureElement.appendChild(tag);

});

function displayArr(input)
{
  let array = input;
  let pureElement = document.getElementById("pureOutput");
  pureElement.innerHTML = "";
  for (var i =0; i < array.length; i++)
  {
    var tag = document.createElement("span");
    var text2 = document.createTextNode(array[i] + " ");
    tag.appendChild(text2);
    pureElement.appendChild(tag);
  }

}

document.getElementById("displaybtn").addEventListener("click",function(){
  displayArr([...tree.preOrderTraversal()].map(x => x.value));
});

document.getElementById("autocompletebtn").addEventListener("click",function(){
  //console.log(tree.insert(document.getElementById('autocomplete').value));
  autocomplete(document.getElementById('autocomplete').value);
});

document.getElementById("searchbtn").addEventListener("click",function(){
  
  let array = tree.has(document.getElementById('search').value);
  let pureElement = document.getElementById("pureOutput");
  pureElement.innerHTML = "";
  var tag = document.createElement("span");
  var text;
  if(!array)
    text = document.createTextNode(document.getElementById('search').value + " does not exist in the trie");
  else 
    text = document.createTextNode(document.getElementById('search').value + " exists in the trie");
  tag.appendChild(text);
  pureElement.appendChild(tag);
  
});

function autocomplete(value){
  let array = [...tree.preOrderTraversal()].map(x => x.value);
  let pureElement = document.getElementById("pureOutput");
  pureElement.innerHTML = "";
  for (var i =0; i < array.length; i++){
    let shortenedStr = array[i];
    if (shortenedStr.length >= value.length)
      shortenedStr = shortenedStr.substr(0,value.length);
    if(value == shortenedStr){
      var tag = document.createElement("span");
      var text2 = document.createTextNode(array[i] + " ");
      tag.appendChild(text2);
      pureElement.appendChild(tag);
    }
      
  }
  if (pureElement.innerHTML == ""){
    var tag = document.createElement("span");
      var text2 = document.createTextNode("None were found");
      tag.appendChild(text2);
      pureElement.appendChild(tag);
  }
  
}

