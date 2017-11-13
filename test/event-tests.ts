import * as UntypedEventEmitter from 'events'
import TypedEventEmitter from '../index'

const conventionalEventEmitter = new UntypedEventEmitter()

conventionalEventEmitter
    .on('foo', (arg: number) => console.log(Math.abs(arg)))
    .on('bar', (arg: string) => console.log(arg.length))
    .on('baz', () => console.log('baz'))

conventionalEventEmitter.emit('foo', 1) // no error
conventionalEventEmitter.emit('foo') // no error
conventionalEventEmitter.emit('bar', 'bar') // no error
conventionalEventEmitter.emit('bar', 1) // no error
conventionalEventEmitter.emit('baz') // no error
conventionalEventEmitter.emit('baz', 'bar') // no error

////

const typedEventEmitterNoArgs = new TypedEventEmitter<'foo' | 'baz'>()

typedEventEmitterNoArgs
    .on('foo', () => console.log('foo'))
    .on('baz', () => console.log('baz'))

typedEventEmitterNoArgs.emit('baz')
typedEventEmitterNoArgs.emit('foo')

////

class TypedEventEmitterOneArg extends TypedEventEmitter<never, {
    foo: number
    bar: string
}> {}

const typedEventEmitterOneArg = new TypedEventEmitterOneArg
typedEventEmitterOneArg
    .on('foo', (arg: number) => console.log(Math.abs(arg)))
    .on('bar', (arg: string) => console.log(arg.length))

typedEventEmitterOneArg.emit('foo', 1)
typedEventEmitterOneArg.emit('bar', 'bar')

////

enum keys {
	baz,
	zoo
}

const typedEventEmitterMix = new TypedEventEmitter<
	keyof typeof keys,
	{
    	foo: number
    	bar: string
	}>()

typedEventEmitterMix
    .on('foo', (arg: number) => console.log(Math.abs(arg)))
    .on('bar', (arg: string) => console.log(arg.length))
    .on('baz', () => console.log('baz'))

typedEventEmitterMix.emit('foo', 1)
typedEventEmitterMix.emit('bar', 'bar')
typedEventEmitterMix.emit('zoo')
