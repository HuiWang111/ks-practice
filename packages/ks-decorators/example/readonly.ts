import { Readonly, proxy } from '../src'

const a = proxy.readonly({ x: 1, y: 2 }, 'x')

console.log(a.x)
console.log(a.y)

a.x = 3 // should warning
a.y = 4

console.log(a.x)
console.log(a.y)

const b = proxy.readonly({ x: 1, y: 2 })

b.x = 5
b.y = 6

console.log('================')
console.log(b.x)
console.log(b.y)

class Test {
    @Readonly
      a: string

    b = '2'
}

const test = new Test()

test.a = '3'
test.b = '4'

console.log('================')
console.log(test.a)
console.log(test.b)
