// const hello = (name='immoc')=>{
//     console.log(`hellp ${name}`)

// }
// hello()

// function hello(name1,name2){
//     console.log(name1,name2)
// }
// let arr= ['imooc','aaa']
// hello(...arr)

// const obj={name:'imooc',cousrs:'es6'}
// console.log(Object.keys(obj))
// console.log(Object.values(obj))
// console.log(Object.entries(obj))

// const name = 'imooc'
// const obj = {
//     name,
//     [name]:'hello',
//     hello:function(){

//     },
//     hello1(){

//     }
// }
// console.log(obj)
// const obj = {name:'imooc',course:'React'}
// const obj1 = {type:'IT',name:'fangfang'}
// console.log({...obj})

// const arr = ['hello','imooc']
// let [a,b] = arr
// console.log(a,b)

// [1,2,3].forEach((value,index)=>{
// console.log(value)
// })
//console.log([1,2,3].map(v=>v*2))
//console.log([1,2,3,4].every(v=>v>3))

//console.log([1,2,3,4].some(v=>v>3))
//console.log([1,2,3,4,5].filter(v=>v>3))
// console.log([1,2,3].forEach((value,index)=>{
//     value+2
//     }))
//console.log([1,2,3].indexOf(2));
// arr1=[1,2,3]
// arr2=[2,5,7]
// console.log([...arr1,...arr2])
// console.log([...new Set([...arr1,...arr2])])

// arr = [{name:'sadfas',age:18},{name:'fangfang',age:8}]

// console.log(arr.find(x=>x.name=="fangfang"))

let [head,...tail] = [1,2,3]
console.log(head)